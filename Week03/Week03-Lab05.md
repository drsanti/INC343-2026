# Week 3 Mini-Lab 5: Fault Detection, Safe-State Control, and Event Logging (TypeScript)

## Objective

Build a monitoring + control loop that:

* Detects common sensor faults (out-of-range, stuck value, sudden jump)
* Applies a **safe-state strategy** (force actuator OFF)
* Generates **alarms** with timestamps and severity
* Logs events similar to SCADA/alarm historian records

---

## Engineering Context

Industrial automation systems must handle failures safely. Typical faults include:

* **Out-of-range** signals (broken wire, failed sensor, incorrect scaling)
* **Stuck sensor** (no change over time despite process changes)
* **Sudden spikes** (EMI noise, ADC glitch, comms corruption)
* **Bad quality** from a fieldbus/driver

A common safety strategy is **fail-safe**:

* If measurement is invalid or uncertain → drive outputs to a safe state (e.g., OFF)
* Raise an alarm and require operator acknowledgment (outside scope; we log alarms)

This lab simulates those patterns.

---

## What you will build

A TypeScript program that:

1. Simulates a temperature process and sensor
2. Runs a simple thermostat controller to request heater ON/OFF
3. Adds a **fault injector** (creates realistic sensor faults)
4. Runs a **fault detector**:

   * Range check
   * Stuck-value check
   * Jump/spike check
5. If fault is active:

   * Force actuator OFF
   * Create an alarm event
6. Logs cycle-by-cycle status + alarm events

---

## Runnable Code (copy into `lab5_fault_detection.ts`)

```ts
/**
 * Week 3 Mini-Lab 5: Fault Detection + Safe-State + Logging
 * File: lab5_fault_detection.ts
 *
 * Run:
 *   npx ts-node lab5_fault_detection.ts
 * or:
 *   npx tsc lab5_fault_detection.ts && node lab5_fault_detection.js
 */

type Quality = "GOOD" | "BAD";
type ActuatorState = "ON" | "OFF";
type Severity = "INFO" | "WARN" | "ALARM" | "TRIP";

type SensorReading = {
  timestamp: string;
  name: string;
  value: number;
  unit: string;
  quality: Quality; // derived by sensor/driver
};

type AlarmEvent = {
  timestamp: string;
  tag: string;        // e.g., "TempSensor-01"
  severity: Severity; // INFO/WARN/ALARM/TRIP
  code: string;       // e.g., "RANGE_HIGH", "STUCK", "JUMP"
  message: string;    // human readable
};

function clamp(x: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, x));
}

/**
 * Simple thermal process.
 * - Heater ON increases temperature
 * - Natural cooling pulls back toward ambient
 */
class ThermalProcess {
  public T: number;

  constructor(
    initialTemp: number,
    private readonly ambient: number,
    private readonly tau: number,  // inertia
    private readonly heatGain: number // heating strength
  ) {
    this.T = initialTemp;
  }

  step(heater: ActuatorState, Ts: number) {
    const u = heater === "ON" ? 1 : 0;
    const dTdt = (-(this.T - this.ambient) / this.tau) + (this.heatGain * u);
    this.T = this.T + Ts * dTdt;
  }
}

/**
 * Sensor with noise + optional injected faults.
 */
class SensorWithFaults {
  private stuckActive = false;
  private stuckValue: number = 0;
  private spikeNext = false;
  private forceOutOfRange: "NONE" | "HIGH" | "LOW" = "NONE";

  constructor(
    public readonly name: string,
    public readonly unit: string,
    private readonly min: number,
    private readonly max: number,
    private readonly noiseAmplitude: number
  ) {}

  // Fault injection controls (for demo)
  injectStuck(enable: boolean) {
    this.stuckActive = enable;
  }

  injectSpikeOnce() {
    this.spikeNext = true;
  }

  injectOutOfRange(mode: "NONE" | "HIGH" | "LOW") {
    this.forceOutOfRange = mode;
  }

  read(trueValue: number): SensorReading {
    const timestamp = new Date().toISOString();

    // Base measurement with noise
    const noise = (Math.random() - 0.5) * this.noiseAmplitude;
    let measured = trueValue + noise;

    // Apply injected faults
    if (this.stuckActive) {
      // Hold the first value when stuck activates
      if (this.stuckValue === 0) this.stuckValue = measured;
      measured = this.stuckValue;
    } else {
      // reset stuckValue when not stuck
      this.stuckValue = 0;
    }

    if (this.spikeNext) {
      measured = measured + 30; // sudden spike
      this.spikeNext = false;
    }

    if (this.forceOutOfRange === "HIGH") measured = this.max + 50;
    if (this.forceOutOfRange === "LOW") measured = this.min - 50;

    // Quality check: clamp and mark BAD if out of physical range
    let quality: Quality = "GOOD";
    if (measured < this.min || measured > this.max) quality = "BAD";

    // For monitoring systems, we often keep the measured value (not clamped)
    // so the detector can see it; but we’ll also clamp for display if desired.
    return {
      timestamp,
      name: this.name,
      value: Number(measured.toFixed(2)),
      unit: this.unit,
      quality,
    };
  }
}

/**
 * Thermostat controller (hysteresis).
 * Requests heater ON below low, OFF above high, else hold previous.
 */
class ThermostatController {
  constructor(private readonly low: number, private readonly high: number) {
    if (low >= high) throw new Error("low must be < high");
  }

  decide(temp: number, prev: ActuatorState): { request: ActuatorState; reason: string } {
    if (temp <= this.low) return { request: "ON", reason: `temp<=${this.low}` };
    if (temp >= this.high) return { request: "OFF", reason: `temp>=${this.high}` };
    return { request: prev, reason: `between ${this.low}-${this.high}` };
  }
}

/**
 * Fault detector:
 * - Range check (based on engineering limits)
 * - Stuck check (no change over N samples)
 * - Jump check (delta exceeds limit)
 */
class FaultDetector {
  private lastValue: number | null = null;
  private unchangedCount = 0;

  constructor(
    private readonly engLow: number,
    private readonly engHigh: number,
    private readonly jumpLimit: number,
    private readonly stuckEpsilon: number,
    private readonly stuckSamples: number
  ) {}

  evaluate(reading: SensorReading): { ok: boolean; alarms: AlarmEvent[] } {
    const alarms: AlarmEvent[] = [];
    const tag = reading.name;

    // 1) Driver quality bad
    if (reading.quality === "BAD") {
      alarms.push({
        timestamp: reading.timestamp,
        tag,
        severity: "TRIP",
        code: "QUALITY_BAD",
        message: "Sensor quality BAD (out-of-physical-range or driver fault).",
      });
      // still continue checks for diagnostics
    }

    // 2) Engineering range check (scaling/validation)
    if (reading.value < this.engLow) {
      alarms.push({
        timestamp: reading.timestamp,
        tag,
        severity: "TRIP",
        code: "RANGE_LOW",
        message: `Reading below engineering limit (${reading.value} < ${this.engLow}).`,
      });
    } else if (reading.value > this.engHigh) {
      alarms.push({
        timestamp: reading.timestamp,
        tag,
        severity: "TRIP",
        code: "RANGE_HIGH",
        message: `Reading above engineering limit (${reading.value} > ${this.engHigh}).`,
      });
    }

    // 3) Jump/spike detection
    if (this.lastValue !== null) {
      const delta = Math.abs(reading.value - this.lastValue);
      if (delta > this.jumpLimit) {
        alarms.push({
          timestamp: reading.timestamp,
          tag,
          severity: "ALARM",
          code: "JUMP",
          message: `Sudden change detected (Δ=${delta.toFixed(2)} > ${this.jumpLimit}).`,
        });
      }

      // 4) Stuck detection
      if (delta <= this.stuckEpsilon) {
        this.unchangedCount++;
      } else {
        this.unchangedCount = 0;
      }

      if (this.unchangedCount >= this.stuckSamples) {
        alarms.push({
          timestamp: reading.timestamp,
          tag,
          severity: "ALARM",
          code: "STUCK",
          message: `Reading unchanged for ${this.unchangedCount} samples (possible stuck sensor).`,
        });
      }
    }

    this.lastValue = reading.value;

    // Decide OK/NOT OK:
    // Treat any TRIP as not OK; WARN/ALARM could be policy-dependent.
    const tripExists = alarms.some(a => a.severity === "TRIP");
    const ok = !tripExists;

    return { ok, alarms };
  }
}

/**
 * Event logger: prints alarms and can store them (for later export).
 */
class EventLogger {
  public events: AlarmEvent[] = [];

  logAlarms(alarms: AlarmEvent[]) {
    for (const a of alarms) {
      this.events.push(a);
      console.log(
        `>>> [${a.timestamp}] [${a.severity}] ${a.tag} ${a.code} - ${a.message}`
      );
    }
  }
}

function runLab() {
  console.log("=== Mini-Lab 5: Fault Detection + Safe-State + Logging ===");
  console.log("System: Thermal process + Thermostat + Fault Detector");
  console.log("Safe-state policy: any TRIP => force HEATER OFF");
  console.log("--------------------------------------------------------");

  const Ts = 1.0; // seconds
  const steps = 35;

  // Plant
  const plant = new ThermalProcess(40, 25, 25, 2.5);

  // Sensor with fault injection
  const sensor = new SensorWithFaults("TempSensor-01", "°C", 0, 200, 0.8);

  // Controller (request)
  const controller = new ThermostatController(50, 60);
  let request: ActuatorState = "OFF";

  // Actuator actual (what is really applied)
  let heaterActual: ActuatorState = "OFF";

  // Fault detector configuration (engineering limits)
  const detector = new FaultDetector(
    0,     // engineering low
    120,   // engineering high (example)
    12,    // jump limit (°C per sample)
    0.05,  // stuck epsilon (changes smaller than this treated as "no change")
    5      // stuck samples threshold
  );

  const logger = new EventLogger();

  for (let k = 1; k <= steps; k++) {
    // Step process using ACTUAL actuator output
    plant.step(heaterActual, Ts);

    // Inject faults at specific times (for demonstration)
    // You can comment out these lines to run fault-free.
    if (k === 10) sensor.injectSpikeOnce();            // one-time spike
    if (k === 18) sensor.injectStuck(true);            // stuck starts
    if (k === 24) sensor.injectStuck(false);           // stuck clears
    if (k === 28) sensor.injectOutOfRange("HIGH");     // out-of-range high
    if (k === 31) sensor.injectOutOfRange("NONE");     // clear out-of-range

    // Read sensor
    const reading = sensor.read(plant.T);

    // Fault detection
    const evalResult = detector.evaluate(reading);
    logger.logAlarms(evalResult.alarms);

    // Controller request is based on measured value (even if faulty!)
    const decision = controller.decide(reading.value, request);
    request = decision.request;

    // Safe-state policy:
    // If NOT OK (TRIP), force OFF regardless of request.
    if (!evalResult.ok) {
      heaterActual = "OFF";
    } else {
      heaterActual = request;
    }

    // Optional: clamp for display only (keep raw for detection)
    const displayPV = clamp(reading.value, -999, 999);

    console.log(
      `[${reading.timestamp}] PV=${displayPV}${reading.unit} Q=${reading.quality} | ` +
      `REQ=${request} (${decision.reason}) | ` +
      `OK=${evalResult.ok} | ACT=${heaterActual}`
    );
  }

  console.log("--------------------------------------------------------");
  console.log(`Total alarm events logged: ${logger.events.length}`);
  console.log("Lab complete. (System stopped safely)");
}

runLab();
```

---

## How to Run

### Method A: ts-node

```bash
npx ts-node lab5_fault_detection.ts
```

### Method B: compile then run

```bash
npx tsc lab5_fault_detection.ts
node lab5_fault_detection.js
```

---

## What to Observe (automation-engineering focus)

1. **Spike event (around step 10)**

   * Detector raises `JUMP` alarm.

2. **Stuck sensor (steps 18–24)**

   * Value stops changing → `STUCK` alarm after threshold samples.

3. **Out-of-range (steps 28–31)**

   * `QUALITY_BAD` and `RANGE_HIGH` produce `TRIP` severity.
   * Safe-state policy forces `ACT=OFF` even if controller requests ON.

4. **REQ vs ACT**

   * Controller can request ON, but safety layer blocks it during trips.

---

## Student Tasks (must do)

1. Change stuck detection sensitivity:

   * Set `stuckSamples` from `5` to `3`
   * Does it alarm earlier?

2. Change jump limit from `12` to `5`

   * Does the system generate false alarms due to noise?

3. Change safe-state policy:

   * Modify logic so that **ALARM** also forces OFF (not only TRIP)
   * Compare behavior and discuss pros/cons.

4. Short written answer (3–4 sentences):

   * **Why is it dangerous to allow control actions when sensor quality is BAD?**
   * **What is the difference between an ALARM and a TRIP in industrial practice?**

---

## Key Takeaways

* Monitoring systems must detect faults, not just display data.
* Safe-state logic is essential for equipment and personnel protection.
* Alarm/event logging is required for troubleshooting and compliance.

---

**Last Updated:** 2026-01-12

---