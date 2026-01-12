# Week 3 Mini-Lab 1: Simulated Sensor Data Acquisition (TypeScript)

## Objective

Simulate a real sensor in software by generating periodic measurements (sampling) and printing them with timestamps—similar to how monitoring systems acquire data from field devices.

## Engineering Context (Why this matters)

In industrial automation, sensors (temperature, pressure, flow, etc.) provide measurements at a **sampling interval** (e.g., every 100 ms, 1 s, 5 s). A monitoring system must:

* read values at a consistent rate,
* handle noise/variation,
* keep units and ranges consistent,
* timestamp data for trending and analysis.

This lab simulates that behavior using a **software sensor**.

---

## What you will build

A TypeScript program that:

1. Defines a sensor model (name, unit, min/max range)
2. Generates readings every **1 second**
3. Adds realistic behavior: **noise + slow drift**
4. Prints readings with **ISO timestamp**
5. Stops automatically after a fixed number of samples (so it doesn’t run forever)

---

## Requirements

* Node.js installed
* TypeScript installed (`npm i -g typescript`) *(or use `npx` as shown below)*

---

## Runnable Code (copy into `lab1_sensor.ts`)

```ts
/**
 * Week 3 Mini-Lab 1: Simulated Sensor Data Acquisition
 * File: lab1_sensor.ts
 *
 * Run:
 *   npx ts-node lab1_sensor.ts
 * or:
 *   npx tsc lab1_sensor.ts && node lab1_sensor.js
 */

type SensorReading = {
  timestamp: string;   // ISO time
  name: string;        // e.g., "TempSensor-01"
  value: number;       // measured value
  unit: string;        // e.g., "°C"
  quality: "GOOD" | "BAD";
};

/**
 * A simple sensor simulation:
 * - baseValue is the "true" value
 * - drift changes slowly over time (e.g., environment warms up)
 * - noise adds measurement variation
 */
class SimulatedAnalogSensor {
  private baseValue: number;
  private driftPerSample: number;

  constructor(
    public readonly name: string,
    public readonly unit: string,
    private readonly min: number,
    private readonly max: number,
    initialValue: number,
    driftPerSample: number = 0.02 // change per sample (e.g., 0.02 °C per second)
  ) {
    this.baseValue = initialValue;
    this.driftPerSample = driftPerSample;
  }

  /**
   * Generate one sensor reading.
   * This simulates how a real sensor can have noise and drift.
   */
  read(): SensorReading {
    // Simulate slow drift (like ambient temperature changing)
    this.baseValue += this.driftPerSample;

    // Simulate measurement noise (random error)
    const noise = (Math.random() - 0.5) * 0.6; // ±0.3 approx

    // Raw measured value
    const measured = this.baseValue + noise;

    // Simple "quality" rule:
    // If it goes outside the physical range, mark BAD and clamp to limits.
    let quality: SensorReading["quality"] = "GOOD";
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
 * Sampling loop:
 * - reads sensor at fixed interval
 * - prints formatted output
 * - stops after N samples (useful for lab/demo)
 */
function startSampling(
  sensor: SimulatedAnalogSensor,
  samplePeriodMs: number,
  totalSamples: number
) {
  let count = 0;

  console.log("=== Mini-Lab 1: Simulated Sensor Sampling ===");
  console.log(`Sensor: ${sensor.name} (${sensor.unit})`);
  console.log(`Sampling period: ${samplePeriodMs} ms`);
  console.log(`Total samples: ${totalSamples}`);
  console.log("-------------------------------------------");

  const timer = setInterval(() => {
    const r = sensor.read();
    count++;

    // Example output format similar to monitoring logs
    console.log(
      `[${r.timestamp}] ${r.name} = ${r.value} ${r.unit} (QUALITY=${r.quality})`
    );

    if (count >= totalSamples) {
      clearInterval(timer);
      console.log("-------------------------------------------");
      console.log("Sampling complete. (System stopped safely)");
    }
  }, samplePeriodMs);
}

/** MAIN **/
const tempSensor = new SimulatedAnalogSensor(
  "TempSensor-01",
  "°C",
  0,      // min range
  100,    // max range
  25.0,   // initial value
  0.05    // drift per sample
);

// 1 second sampling, 15 samples total
startSampling(tempSensor, 1000, 15);
```

---

## How to Run (choose one method)

### Method A (recommended): Run with ts-node via npx

```bash
npx ts-node lab1_sensor.ts
```

### Method B: Compile then run with Node.js

```bash
npx tsc lab1_sensor.ts
node lab1_sensor.js
```

---

## What to Observe (technical points)

1. **Sampling period**: readings are produced every 1000 ms.
2. **Noise**: values vary slightly around the trend (real sensors are not perfectly stable).
3. **Drift**: the value slowly increases over time, representing environmental change.
4. **Quality flag**: if a reading goes outside the sensor’s physical range, it becomes `BAD` and is clamped.

---

## Mini Analysis (connect to real systems)

In real automation systems:

* sampling is performed by PLC scan cycles, DAQ devices, or edge gateways,
* readings are timestamped and stored (historian/time-series DB),
* quality/status bits indicate sensor health (open circuit, out-of-range, invalid),
* noisy data may require filtering (covered later).

---

## Quick Tasks (students must do)

1. Change `samplePeriodMs` from `1000` to `200` and observe the output rate.
2. Increase noise by changing `0.6` to `2.0`. What happens?
3. Set drift to `-0.1` (cooling trend).
4. Change the sensor range to `min=20`, `max=30`. How often does `BAD` appear?

---

**Last Updated:** 2026-01-12

---
