# Chapter 2: Variables and Data Types

## Objective
Declare variables with `let` and `const`, use types `number`, `string`, and `boolean`, and understand type inference.

## Prerequisites
- Chapter 1 (Introduction)
- Ability to run TypeScript files with `npx ts-node`

---

## Concepts
Variables store values so you can reuse and manipulate them. TypeScript uses:
- **`let`** – Values you may change
- **`const`** – Values that stay fixed (recommended when possible)

Common types in control applications:
- **`number`** – Sensor values (temperature, pressure, speed)
- **`string`** – Names, messages, units
- **`boolean`** – True/false (ON/OFF, fault/no fault)

---

## Example 1: Basic Variable Declaration

**What it does:** Stores sensor name, value, and unit in variables and prints formatted output—a common pattern in monitoring systems.

**Code:** Save as `ch02_variables.ts`

```ts
// ch02_variables.ts
const sensorName: string = "TempSensor-01";
const sensorValue: number = 25.5;
const unit: string = "°C";

console.log("Sensor:", sensorName);
console.log("Reading:", sensorValue, unit);
console.log("Formatted:", `${sensorName} = ${sensorValue} ${unit}`);
```

**Explanation:**
- `const` means the value will not be reassigned
- `: string` and `: number` are explicit type annotations
- Template literals (backticks) let you embed variables with `${variable}`

**How to run:**
```bash
npx ts-node ch02_variables.ts
```

**Expected output:**
```
Sensor: TempSensor-01
Reading: 25.5 °C
Formatted: TempSensor-01 = 25.5 °C
```

---

## Example 2: Type Inference and `let` vs `const`

**What it does:** Demonstrates type inference (TypeScript infers types) and when to use `let` for values that change.

**Code:** Save as `ch02_inference.ts`

```ts
// ch02_inference.ts
const isOnline = true;           // TypeScript infers: boolean
let sampleCount = 0;             // TypeScript infers: number
sampleCount = sampleCount + 1;   // OK: let allows reassignment

console.log("System online:", isOnline);
console.log("Samples taken:", sampleCount);

const maxSamples = 10;
const status = maxSamples > 5 ? "High capacity" : "Low capacity";
console.log("Status:", status);
```

**Explanation:**
- Without `: type`, TypeScript infers the type from the value
- `let` allows reassignment; `const` does not
- `? :` is a ternary operator: `condition ? valueIfTrue : valueIfFalse`

**How to run:**
```bash
npx ts-node ch02_inference.ts
```

**Expected output:**
```
System online: true
Samples taken: 1
Status: High capacity
```

---

## Try It Yourself
1. Add a variable for sensor minimum and maximum range; print them.
2. Try changing a `const` value (e.g. `sensorValue = 30`) and see the error.
3. Store a boolean `alarmActive = false` and print it.

---

## Key Takeaways
- Use `const` by default; use `let` when the value changes
- `number`, `string`, `boolean` are the basic types
- Type inference reduces the need for explicit annotations
- Template literals `` `${var}` `` simplify string formatting

---

## Next
→ [Chapter 3: Operators](./Ch03-Operators.md)
