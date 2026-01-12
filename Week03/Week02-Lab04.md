# Week 3 Mini-Lab 4: Closed-Loop Control Simulation (P-Control, Sampling, Stability)

## Objective

Simulate a closed-loop temperature control system and observe how:

* proportional gain (**Kp**) affects stability and response,
* sampling period (**Ts**) affects performance,
* noise and actuator limits influence control behavior.

---

## Engineering Context

In real automation systems:

* Control algorithms run periodically (PLC scan cycle / task cycle).
* Too aggressive gain can cause **overshoot** and **oscillation**.
* Too slow sampling can cause poor tracking or instability.
* Actuator limits (0–100%) and sensor noise are always present.

This lab builds intuition before more advanced control methods.

---

## What you will build

A TypeScript simulation that:

1. Models a simple thermal process (first-order system)
2. Implements a **P controller**: `u = Kp * (SP - PV)`
3. Applies actuator saturation: `u ∈ [0, 100]%`
4. Logs PV, SP, error, output, and notes overshoot
5. Runs for a fixed number of samples and stops safely

---

## Runnable Code (copy into `lab4_closed_loop_pcontrol.ts`)

```ts
/**
 * Week 3 Mini-Lab 4: Closed-Loop Control (P-Control + Sampling)
 * File: lab4_closed_loop_pcontrol.ts
 *
 * Run:
 *   npx ts-node lab4_closed_loop_pcontrol.ts
 * or:
 *   npx tsc lab4_closed_loop_pcontrol.ts && node lab4_closed_loop_pcontrol.js
 */

type Quality = "GOOD" | "BAD";

type Reading = {
  timestamp: string;
  pv: number;       // process variable (measured temperature)
  sp: number;       // setpoint
  u: number;        // controller output (0..100%)
  err: number;      // sp - pv
  quality: Quality;
};

/**
 * Simple first-order thermal process model (discrete-time):
 *   dT/dt = (-(T - Tamb)/tau) + (K*u)
 *
 * Discretized (Euler):
 *   T_next = T + Ts * (-(T - Tamb)/tau + K*u)
 *
 * Notes:
 * - T in °C, u in 0..1 (fraction of heater power)
 * - tau controls inertia (larger tau = slower process)
 * - K controls how strongly heater power increases temperature
 */
class ThermalProcess {
  public T: number;

  constructor(
    initialTemp: number,
    private readonly Tamb: number,
    private readonly tau: number, // seconds
    private readonly K: number    // °C per second at u=1 (approx)
  ) {
    this.T = initialTemp;
  }

  step(uPercent: number, Ts: number) {
    const u = clamp(uPercent / 100, 0, 1); // convert to fraction
    const dTdt = (-(this.T - this.Tamb) / this.tau) + (this.K * u);
    this.T = this.T + Ts * dTdt;
  }
}

/**
 * P Controller:
 *   u = Kp * (SP - PV)
 * Typically also includes bias, limits, and anti-windup for PI/PID (later).
 */
class PController {
  constructor(public Kp: number) {}

  compute(sp: number, pv: number): number {
    return this.Kp * (sp - pv);
  }
}

/**
 * Sensor model: adds noise and can flag BAD quality if out-of-range.
 */
class NoisySensor {
  constructor(
    private readonly min: number,
    private readonly max: number,
    private readonly noiseAmplitude: number // peak-to-peak approx
  ) {}

  read(trueValue: number): { value: number; quality: Quality } {
    const noise = (Math.random() - 0.5) * this.noiseAmplitude;
    let measured = trueValue + noise;
    let quality: Quality = "GOOD";

    if (measured < this.min) {
      measured = this.min;
      quality = "BAD";
    } else if (measured > this.max) {
      measured = this.max;
      quality = "BAD";
    }

    return { value: Number(measured.toFixed(2)), quality };
  }
}

function clamp(x: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, x));
}

function runSimulation(config: {
  sp: number;
  Kp: number;
  Ts: number;       // sampling period in seconds
  steps: number;
}) {
  const { sp, Kp, Ts, steps } = config;

  console.log("=== Mini-Lab 4: Closed-Loop P Control Simulation ===");
  console.log(`Setpoint (SP): ${sp} °C`);
  console.log(`Kp: ${Kp} | Sampling Ts: ${Ts}s | Steps: ${steps}`);
  console.log("Process model: first-order thermal system + heater saturation");
  console.log("-----------------------------------------------------------");

  // Plant parameters (tweak for experiments)
  const plant = new ThermalProcess(
    25,  // initial temperature
    25,  // ambient
    20,  // tau (s) - inertia (larger => slower)
    3.0  // K - heating strength
  );

  const controller = new PController(Kp);
  const sensor = new NoisySensor(0, 200, 0.6); // noise amplitude ~±0.3

  let overshootCount = 0;

  for (let k = 0; k < steps; k++) {
    const timestamp = new Date().toISOString();

    // Sensor reading
    const s = sensor.read(plant.T);
    const pv = s.value;

    // Control computation (raw)
    const err = sp - pv;
    let u = controller.compute(sp, pv);

    // Safety / actuator limits: heater 0..100%
    u = clamp(u, 0, 100);

    // Step the plant with control output and sampling time
    plant.step(u, Ts);

    // Track overshoot (PV above SP by more than a small tolerance)
    if (pv > sp + 0.5) overshootCount++;

    const note =
      s.quality === "BAD" ? "SENSOR_BAD" :
      pv > sp + 0.5 ? "OVERSHOOT" :
      Math.abs(err) < 0.5 ? "IN_BAND" : "";

    const r: Reading = {
      timestamp,
      pv,
      sp,
      u: Number(u.toFixed(2)),
      err: Number(err.toFixed(2)),
      quality: s.quality,
    };

    console.log(
      `[${r.timestamp}] PV=${r.pv}°C SP=${r.sp}°C ERR=${r.err} ` +
      `U=${r.u}% Q=${r.quality}` +
      (note ? ` | ${note}` : "")
    );
  }

  console.log("-----------------------------------------------------------");
  console.log(`Simulation complete. Overshoot samples: ${overshootCount}/${steps}`);
  console.log("Try changing Kp and Ts to observe stability and oscillation.");
}

/** MAIN: choose parameters for experiments **/
runSimulation({
  sp: 60,     // setpoint
  Kp: 5.0,    // try 1.0, 3.0, 5.0, 10.0
  Ts: 1.0,    // try 0.2, 0.5, 1.0, 2.0
  steps: 40,
});
```

---

## How to Run

### Method A: ts-node

```bash
npx ts-node lab4_closed_loop_pcontrol.ts
```

### Method B: compile then run

```bash
npx tsc lab4_closed_loop_pcontrol.ts
node lab4_closed_loop_pcontrol.js
```

---

## What to Observe (automation-engineering focus)

* **With low Kp**, the system approaches SP slowly and may have steady-state error.
* **With higher Kp**, response is faster but may overshoot or oscillate.
* **With larger Ts (slower sampling)**, the loop reacts late and may become unstable.
* Actuator saturation (`0..100%`) is realistic—controllers often hit limits.

---

## Student Tasks (must do)

1. **Gain sweep:** Run with `Kp = 1, 3, 5, 10` (keep `Ts = 1.0`)

   * Which value gives the best response? Which causes overshoot/oscillation?

2. **Sampling sweep:** Run with `Ts = 0.2, 0.5, 1.0, 2.0` (keep `Kp = 5.0`)

   * How does sampling time affect stability and settling?

3. **Noise effect:** Increase sensor noise amplitude from `0.6` to `3.0`

   * Does the output `U` fluctuate? Why?

4. Short explanation (2–3 sentences):
   **Why can a high Kp make a closed-loop system oscillate, especially with slow sampling?**

---

## Key Takeaways

* Closed-loop control depends on both **controller gain** and **sampling time**.
* **Aggressive tuning** can create instability.
* **Digital control** always involves discrete sampling, which is an engineering constraint.
* Simulation is a safe way to study behavior before working with real equipment.

---

**Last Updated:** 2026-01-12

---