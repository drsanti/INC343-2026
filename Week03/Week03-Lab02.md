# Week 3 Mini-Lab 2: Threshold-Based Control Logic (TypeScript)

## Objective

Implement a simple **rule-based controller** that turns an actuator **ON/OFF** based on a sensor value crossing a threshold. This is one of the most common patterns in industrial automation (thermostat control, level control, safety trips).

---

## Engineering Context

Threshold control is used when a process can be controlled by a logical condition such as:

* If **temperature > 60°C** → turn **fan ON**
* If **tank level < 20%** → turn **pump OFF**
* If **pressure > limit** → trigger **alarm** and force system to safe state

However, real systems often suffer from **chattering** (rapid ON/OFF switching) near the threshold due to noise. A standard fix is **hysteresis** (two thresholds).

This lab includes both:

1. Basic threshold control (for understanding)
2. Improved threshold control with **hysteresis** (engineering best practice)

---

## What you will build

A TypeScript program that:

* Simulates a temperature sensor (like Lab 1)
* Implements a **controller**:

  * Basic threshold control OR hysteresis control
* Implements an **actuator** (Fan)
* Logs:

  * sensor values
  * control decision
  * actuator state changes
* Stops safely after N samples

---

## Runnable Code (copy into `lab2_threshold_control.ts`)

```ts
/**
 * Week 3 Mini-Lab 2: Threshold-Based Control Logic (with Hysteresis)
 * File: lab2_threshold_control.ts
 *
 * Run:
 *   npx ts-node lab2_threshold_control.ts
 * or:
 *   npx tsc lab2_threshold_control.ts && node lab2_threshold_control.js
 */

type Quality = "GOOD" | "BAD";

type SensorReading = {
  timestamp: string;
  name: string;
  value: number;
  unit: string;
  quality: Quality;
};

class SimulatedAnalogSensor {
  private baseValue: number;

  constructor(
    public readonly name: string,
    public readonly unit: string,
    private readonly min: number,
    private readonly max: number,
    initialValue: number,
    private readonly driftPerSample: number = 0.08, // warming trend
    private readonly noiseAmplitude: number = 1.0   // ±0.5 approx
  ) {
    this.baseValue = initialValue;
  }

  read(): SensorReading {
    this.baseValue += this.driftPerSample;

    const noise = (Math.random() - 0.5) * this.noiseAmplitude;
    const measured = this.baseValue + noise;

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

type ActuatorState = "ON" | "OFF";

/**
 * Simple actuator model.
 * In real systems this could represent a relay output, motor starter, or valve command.
 */
class Actuator {
  private state: ActuatorState = "OFF";

  constructor(public readonly name: string) {}

  getState(): ActuatorState {
    return this.state;
  }

  setState(next: ActuatorState): boolean {
    const changed = next !== this.state;
    this.state = next;
    return changed;
  }
}

/**
 * Controller Mode:
 * - BASIC: single threshold (may chatter with noise)
 * - HYSTERESIS: two thresholds to reduce switching
 */
type ControlMode = "BASIC" | "HYSTERESIS";

type ControlDecision = {
  command: ActuatorState;
  reason: string;
};

class ThresholdController {
  constructor(
    private readonly mode: ControlMode,
    private readonly onThreshold: number,   // turn ON above this (or at)
    private readonly offThreshold?: number  // turn OFF below this (hysteresis)
  ) {
    if (mode === "HYSTERESIS") {
      if (offThreshold === undefined) {
        throw new Error("HYSTERESIS mode requires offThreshold.");
      }
      if (offThreshold >= onThreshold) {
        throw new Error("For hysteresis: offThreshold must be < onThreshold.");
      }
    }
  }

  /**
   * Decide actuator state from current reading and previous actuator state.
   * We include previous state because hysteresis requires memory.
   */
  decide(reading: SensorReading, previous: ActuatorState): ControlDecision {
    // Safety consideration: if quality is BAD, go to a safe state (OFF)
    if (reading.quality === "BAD") {
      return { command: "OFF", reason: "Sensor quality BAD → force OFF (safe state)" };
    }

    const x = reading.value;

    if (this.mode === "BASIC") {
      // BASIC: ON if x >= threshold, else OFF
      if (x >= this.onThreshold) return { command: "ON", reason: `x>=${this.onThreshold}` };
      return { command: "OFF", reason: `x<${this.onThreshold}` };
    }

    // HYSTERESIS: ON above onThreshold; OFF below offThreshold; otherwise keep previous
    const offT = this.offThreshold as number;

    if (x >= this.onThreshold) {
      return { command: "ON", reason: `x>=${this.onThreshold} (turn ON)` };
    }
    if (x <= offT) {
      return { command: "OFF", reason: `x<=${offT} (turn OFF)` };
    }
    return { command: previous, reason: `between ${offT} and ${this.onThreshold} (hold state)` };
  }
}

function startControlLoop(params: {
  sensor: SimulatedAnalogSensor;
  actuator: Actuator;
  controller: ThresholdController;
  samplePeriodMs: number;
  totalSamples: number;
}) {
  const { sensor, actuator, controller, samplePeriodMs, totalSamples } = params;

  let count = 0;

  console.log("=== Mini-Lab 2: Threshold-Based Control ===");
  console.log(`Sensor: ${sensor.name} | Actuator: ${actuator.name}`);
  console.log(`Sampling period: ${samplePeriodMs} ms | Total samples: ${totalSamples}`);
  console.log("------------------------------------------");

  const timer = setInterval(() => {
    count++;

    const reading = sensor.read();
    const prevState = actuator.getState();
    const decision = controller.decide(reading, prevState);
    const changed = actuator.setState(decision.command);

    // Log line similar to industrial monitoring logs
    const changeMark = changed ? " **STATE CHANGE**" : "";
    console.log(
      `[${reading.timestamp}] ${reading.name}=${reading.value}${reading.unit} ` +
      `(Q=${reading.quality}) | CMD=${decision.command} (${decision.reason}) | ` +
      `ACT=${actuator.getState()}${changeMark}`
    );

    if (count >= totalSamples) {
      clearInterval(timer);
      console.log("------------------------------------------");
      console.log("Control loop complete. (System stopped safely)");
    }
  }, samplePeriodMs);
}

/** MAIN SETUP **/
const tempSensor = new SimulatedAnalogSensor(
  "TempSensor-01",
  "°C",
  0,
  120,
  45.0,   // start near threshold zone
  0.25,   // drift: heating up
  2.0     // noise amplitude (increase to observe chattering)
);

const fan = new Actuator("CoolingFan-01");

// Choose one:
// 1) BASIC control (likely chatter with noise)
const controllerBasic = new ThresholdController("BASIC", 60);

// 2) HYSTERESIS control (recommended in automation)
// ON at 60°C, OFF at 55°C
const controllerHysteresis = new ThresholdController("HYSTERESIS", 60, 55);

// Run one controller at a time:
startControlLoop({
  sensor: tempSensor,
  actuator: fan,
  controller: controllerHysteresis, // <-- switch to controllerBasic to compare
  samplePeriodMs: 1000,
  totalSamples: 20,
});
```

---

## How to Run

### Method A: ts-node via npx

```bash
npx ts-node lab2_threshold_control.ts
```

### Method B: compile then run

```bash
npx tsc lab2_threshold_control.ts
node lab2_threshold_control.js
```

---

## What to Observe (technical)

1. **Control decision** is based on `TempSensor-01` value.
2. With **BASIC mode**, the actuator may switch frequently near the threshold because of sensor noise (**chattering**).
3. With **HYSTERESIS**, switching becomes stable:

   * Fan turns **ON** at **60°C**
   * Fan turns **OFF** only when temperature falls to **55°C** or lower
4. If sensor `quality` becomes `BAD`, actuator is forced to **OFF** (safe state concept).

---

## Student Tasks (must do)

1. Switch the controller from `controllerHysteresis` to `controllerBasic`.

   * Compare the number of **STATE CHANGE** events.
2. Increase noise amplitude from `2.0` to `5.0`.

   * Which controller behaves better?
3. Modify hysteresis band:

   * ON at 70°C, OFF at 65°C
4. Explain (1–2 sentences):
   **Why is hysteresis commonly used in industrial ON/OFF control?**

---

## Automation Engineering Notes

* Threshold logic is common but can create wear in actuators (relays, contactors) due to chattering.
* Hysteresis reduces actuator switching frequency and improves stability.
* Quality-based safe-state logic is a basic safety layer (not full functional safety, but a critical practice).

---

**Last Updated:** 2026-01-12

---
