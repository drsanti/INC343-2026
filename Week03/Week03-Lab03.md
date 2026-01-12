# Week 3 Mini-Lab 3: Actuator Modeling, Command Limits, and Interlocks (TypeScript)

## Objective

Model an actuator as a software component with:

* **requested command** vs **actual output state**
* **rate limiting / command limits** (to prevent rapid switching)
* **interlock conditions** (safety constraints)
* **fault handling** (safe-state behavior)

This mimics how industrial systems implement **permissives**, **interlocks**, and **minimum on/off times** for motors, valves, heaters, etc.

---

## Engineering Context

Real actuators are not simply ON/OFF toggles. Industrial control must consider:

* **Mechanical/electrical constraints**: contactor wear, motor inrush current
* **Process constraints**: avoid short cycling (e.g., compressors)
* **Safety constraints**: emergency stop, over-temperature, door open, low oil pressure
* **Permissives**: conditions that must be TRUE before turning ON
* **Trip conditions**: conditions that force immediate OFF

This lab simulates these industrial patterns.

---

## What you will build

A control loop that:

1. Reads a **temperature sensor**
2. Uses a controller to request `HEATER=ON/OFF`
3. Passes the command through an actuator model that enforces:

   * **E-Stop interlock** (trip)
   * **Over-temperature trip**
   * **Minimum OFF time** and **minimum ON time**
4. Logs each cycle with reasons

---

## Runnable Code (copy into `lab3_interlocks.ts`)

```ts
/**
 * Week 3 Mini-Lab 3: Actuator Modeling, Command Limits, and Interlocks
 * File: lab3_interlocks.ts
 *
 * Run:
 *   npx ts-node lab3_interlocks.ts
 * or:
 *   npx tsc lab3_interlocks.ts && node lab3_interlocks.js
 */

type Quality = "GOOD" | "BAD";
type ActuatorState = "ON" | "OFF";

type SensorReading = {
  timestamp: string;
  name: string;
  value: number;
  unit: string;
  quality: Quality;
};

class SimulatedAnalogSensor {
  private processValue: number;

  constructor(
    public readonly name: string,
    public readonly unit: string,
    private readonly min: number,
    private readonly max: number,
    initialValue: number,
    private readonly noiseAmplitude: number = 0.8
  ) {
    this.processValue = initialValue;
  }

  /**
   * Process model:
   * - If heater ON, temperature rises.
   * - If heater OFF, temperature falls slowly toward ambient.
   * This is not physics-accurate, but good enough to observe control behavior.
   */
  step(heaterState: ActuatorState) {
    const ambient = 25;
    const heatGain = heaterState === "ON" ? 0.9 : 0.0;
    const cooling = (this.processValue - ambient) * 0.05; // cooling proportional to delta
    this.processValue = this.processValue + heatGain - cooling;
  }

  read(): SensorReading {
    const noise = (Math.random() - 0.5) * this.noiseAmplitude; // ~±0.4
    const measured = this.processValue + noise;

    let quality: Quality = "GOOD";
    let value = measured;

    if (value < this.min) {
      value = this.min;
      quality = "BAD";
    } else if (value > this.max) {
      value = this.max;
      quality = "BAD";
    }

    return {
      timestamp: new Date().toISOString(),
      name: this.name,
      value: Number(value.toFixed(2)),
      unit: this.unit,
      quality,
    };
  }
}

/**
 * A simple thermostat-like controller with hysteresis.
 * Requests HEATER ON when temp <= low, OFF when temp >= high.
 */
class ThermostatController {
  constructor(private readonly low: number, private readonly high: number) {
    if (low >= high) throw new Error("low must be < high");
  }

  decide(temp: SensorReading, previousRequest: ActuatorState): { request: ActuatorState; reason: string } {
    if (temp.quality === "BAD") {
      return { request: "OFF", reason: "Temp quality BAD → request OFF (safe)" };
    }

    if (temp.value <= this.low) return { request: "ON", reason: `temp<=${this.low} → heat` };
    if (temp.value >= this.high) return { request: "OFF", reason: `temp>=${this.high} → stop` };

    return { request: previousRequest, reason: `between ${this.low}-${this.high} → hold request` };
  }
}

type InterlockStatus = {
  estop: boolean;           // emergency stop active (true = tripped)
  overTempTrip: boolean;    // over-temp trip active
  permissiveOk: boolean;    // example permissive (true = allowed)
};

type ActuatorResult = {
  actual: ActuatorState;
  applied: ActuatorState;      // command applied after limits/interlocks
  message: string;             // explanation for why it changed or blocked
};

/**
 * Actuator with:
 * - Interlock handling (trip/permissive)
 * - Minimum ON time and minimum OFF time (anti short-cycle)
 *
 * This models common motor/heater control requirements.
 */
class InterlockedActuator {
  private actual: ActuatorState = "OFF";
  private lastChangeTimeMs: number = Date.now();

  constructor(
    public readonly name: string,
    private readonly minOnTimeMs: number,
    private readonly minOffTimeMs: number
  ) {}

  getState(): ActuatorState {
    return this.actual;
  }

  /**
   * Apply a requested command through safety/permissives and timing limits.
   */
  applyRequest(request: ActuatorState, interlocks: InterlockStatus): ActuatorResult {
    const now = Date.now();

    // 1) Trips force OFF immediately
    if (interlocks.estop) {
      if (this.actual !== "OFF") {
        this.actual = "OFF";
        this.lastChangeTimeMs = now;
        return { actual: this.actual, applied: "OFF", message: "E-STOP active → FORCE OFF" };
      }
      return { actual: this.actual, applied: "OFF", message: "E-STOP active → keep OFF" };
    }

    if (interlocks.overTempTrip) {
      if (this.actual !== "OFF") {
        this.actual = "OFF";
        this.lastChangeTimeMs = now;
        return { actual: this.actual, applied: "OFF", message: "Over-temp TRIP → FORCE OFF" };
      }
      return { actual: this.actual, applied: "OFF", message: "Over-temp TRIP → keep OFF" };
    }

    // 2) Permissives: if not OK, block ON (but allow OFF)
    if (!interlocks.permissiveOk && request === "ON") {
      return { actual: this.actual, applied: this.actual, message: "Permissive NOT OK → block ON request" };
    }

    // 3) Timing limits (minimum ON/OFF time)
    const elapsed = now - this.lastChangeTimeMs;

    if (request !== this.actual) {
      if (this.actual === "ON") {
        // Request OFF while ON: enforce minimum ON time
        if (elapsed < this.minOnTimeMs) {
          return {
            actual: this.actual,
            applied: this.actual,
            message: `Min ON time not met (${elapsed}ms < ${this.minOnTimeMs}ms) → hold ON`
          };
        }
      } else {
        // Request ON while OFF: enforce minimum OFF time
        if (elapsed < this.minOffTimeMs) {
          return {
            actual: this.actual,
            applied: this.actual,
            message: `Min OFF time not met (${elapsed}ms < ${this.minOffTimeMs}ms) → hold OFF`
          };
        }
      }

      // If limits satisfied, change state
      this.actual = request;
      this.lastChangeTimeMs = now;
      return { actual: this.actual, applied: request, message: "Command applied" };
    }

    return { actual: this.actual, applied: request, message: "No change" };
  }
}

/**
 * Simple interlock generator:
 * - Randomly triggers E-STOP for demonstration (rare)
 * - Triggers over-temp if temperature exceeds a limit
 * - Permissive is usually true but can drop randomly
 */
class InterlockLogic {
  private estopActive = false;
  private permissiveOk = true;

  constructor(
    private readonly overTempLimit: number,
    private readonly estopProbability: number = 0.03,
    private readonly permissiveDropProbability: number = 0.05
  ) {}

  evaluate(temp: SensorReading): InterlockStatus {
    // Random E-stop event (demo)
    if (!this.estopActive && Math.random() < this.estopProbability) {
      this.estopActive = true;
    }

    // Random permissive drop (e.g., door open, low pressure)
    if (Math.random() < this.permissiveDropProbability) {
      this.permissiveOk = false;
    } else {
      // Permissive returns OK after some time (simplified)
      if (Math.random() < 0.4) this.permissiveOk = true;
    }

    const overTempTrip = temp.quality === "GOOD" && temp.value >= this.overTempLimit;

    return {
      estop: this.estopActive,
      overTempTrip,
      permissiveOk: this.permissiveOk
    };
  }
}

function runLoop() {
  console.log("=== Mini-Lab 3: Interlocks + Command Limits ===");
  console.log("System: Temperature control with Heater actuator");
  console.log("Features: E-STOP trip, Over-temp trip, Permissive, Min ON/OFF time");
  console.log("------------------------------------------------");

  // Process + sensor
  const tempProcessSensor = new SimulatedAnalogSensor("TempSensor-01", "°C", 0, 200, 40);

  // Controller: ON below 50, OFF above 60
  const controller = new ThermostatController(50, 60);

  // Actuator: enforce minimum ON 3s, minimum OFF 2s
  const heater = new InterlockedActuator("Heater-01", 3000, 2000);

  // Interlocks: trip if temp >= 90°C
  const interlocks = new InterlockLogic(90);

  const samplePeriodMs = 1000;
  const totalSamples = 30;

  let count = 0;
  let lastRequest: ActuatorState = "OFF";

  const timer = setInterval(() => {
    count++;

    // Step process based on last actual actuator state (closed-loop plant effect)
    tempProcessSensor.step(heater.getState());

    // Read sensor
    const temp = tempProcessSensor.read();

    // Controller produces REQUEST (what we want)
    const decision = controller.decide(temp, lastRequest);
    lastRequest = decision.request;

    // Interlock logic evaluates current conditions
    const il = interlocks.evaluate(temp);

    // Actuator applies request through constraints
    const result = heater.applyRequest(decision.request, il);

    // Log cycle
    console.log(
      `[${temp.timestamp}] TEMP=${temp.value}${temp.unit} (Q=${temp.quality}) | ` +
      `REQ=${decision.request} (${decision.reason}) | ` +
      `IL: estop=${il.estop} overTempTrip=${il.overTempTrip} permissiveOk=${il.permissiveOk} | ` +
      `ACT=${result.actual} (${result.message})`
    );

    if (count >= totalSamples) {
      clearInterval(timer);
      console.log("------------------------------------------------");
      console.log("Loop complete. (System stopped safely)");
    }
  }, samplePeriodMs);
}

runLoop();
```

---

## How to Run

### Method A: ts-node

```bash
npx ts-node lab3_interlocks.ts
```

### Method B: compile then run

```bash
npx tsc lab3_interlocks.ts
node lab3_interlocks.js
```

---

## What to Observe (automation-engineering focus)

1. **REQ vs ACT**

   * `REQ` is what the controller wants
   * `ACT` is the actuator’s actual state after interlocks and timing rules
     This mirrors real systems where commands are **filtered by safety layers**.

2. **Permissive behavior**

   * When permissive becomes false, ON requests are blocked.

3. **Trips (E-STOP, over-temp)**

   * Trips force the actuator OFF immediately (typical safety behavior).

4. **Minimum ON/OFF times**

   * Prevents short cycling even if the controller requests changes.

---

## Student Tasks (must do)

1. Change actuator limits:

   * `minOnTimeMs = 6000`, `minOffTimeMs = 6000`
     Observe how control responsiveness changes.

2. Reduce over-temp limit from `90` to `65`.

   * Does the system trip quickly? Why?

3. Increase noise amplitude in the sensor from `0.8` to `3.0`.

   * How does noise affect controller request and actuator behavior?

4. Short written answer (2–3 sentences):
   **Why do industrial systems separate controller request (REQ) from actuator actual output (ACT)?**

---

## Key Takeaways

* Actuator control is not only “ON/OFF”; it includes **constraints** and **safety logic**.
* Interlocks and permissives reduce risk and protect equipment.
* Command limiting is a practical engineering method to increase reliability and reduce mechanical wear.

---

**Last Updated:** 2026-01-12

---