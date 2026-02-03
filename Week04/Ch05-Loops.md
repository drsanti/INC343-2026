# Chapter 5: Loops

## Objective
Repeat code with `for` and `while` loops, and use `break` and `continue` to control iteration.

## Prerequisites
- Chapter 4 (Conditionals)

---

## Concepts
Loops run a block of code multiple times:
- **`for`** – Fixed number of iterations; good when you know the count
- **`while`** – Repeats while a condition is true
- **`break`** – Exit the loop immediately
- **`continue`** – Skip to the next iteration

---

## Example 1: For Loop – Simulated Sensor Readings

**What it does:** Simulates 5 sensor readings in a loop, as monitoring systems sample at regular intervals.

**Code:** Save as `ch05_for_loop.ts`

```ts
// ch05_for_loop.ts
const sensorName = "TempSensor-01";
const baseTemp = 25;

console.log("=== Simulated Sensor Sampling ===");
for (let i = 0; i < 5; i++) {
  const noise = (Math.random() - 0.5) * 2;  // ±1°C noise
  const reading = baseTemp + noise;
  console.log(`Sample ${i + 1}: ${reading.toFixed(2)} °C`);
}
console.log("Sampling complete.");
```

**Explanation:**
- `for (init; condition; update)` – `i` starts at 0, loop runs while `i < 5`, `i++` adds 1 each time
- `Math.random()` returns 0–1; we shift and scale for small noise
- `i + 1` in the output shows sample numbers 1–5 instead of 0–4

**How to run:**
```bash
npx ts-node ch05_for_loop.ts
```

**Expected output (values vary due to random noise):**
```
=== Simulated Sensor Sampling ===
Sample 1: 25.34 °C
Sample 2: 24.12 °C
Sample 3: 26.01 °C
...
Sampling complete.
```

---

## Example 2: While Loop with Break

**What it does:** Continues sampling until a reading exceeds a threshold, then stops—simulating a safety trip.

**Code:** Save as `ch05_while_break.ts`

```ts
// ch05_while_break.ts
const threshold = 80;
let reading = 70;
let count = 0;
const maxSamples = 20;

console.log("Monitoring until temperature exceeds", threshold, "°C");
while (count < maxSamples) {
  reading = reading + (Math.random() - 0.3) * 5;  // Drift upward with noise
  count++;
  console.log(`Sample ${count}: ${reading.toFixed(1)} °C`);

  if (reading > threshold) {
    console.log("TRIP: Threshold exceeded! Stopping.");
    break;
  }
}
```

**Explanation:**
- `while` runs as long as `count < maxSamples`
- `break` exits the loop immediately when temperature exceeds the limit
- Without `break`, the loop could run forever if the threshold is never met

**How to run:**
```bash
npx ts-node ch05_while_break.ts
```

**Expected output (varies):**
```
Monitoring until temperature exceeds 80 °C
Sample 1: 71.2 °C
Sample 2: 73.5 °C
...
TRIP: Threshold exceeded! Stopping.
```

---

## Try It Yourself
1. Change the loop in Example 1 to run 10 times.
2. Use `continue` to skip printing when `reading < 20` in Example 2.
3. Write a loop that counts down from 5 to 1 and prints each number.

---

## Key Takeaways
- `for` is ideal when you know the number of iterations
- `while` is useful when the end condition depends on runtime values
- `break` exits the loop; `continue` skips to the next iteration
- Avoid infinite loops by ensuring the condition eventually becomes false

---

## Next
→ [Chapter 6: Functions](./Ch06-Functions.md)
