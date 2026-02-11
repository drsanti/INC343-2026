# Chapter 3: Operators

## Objective
Use arithmetic, comparison, and logical operators to build expressions for conditionals and loops.

## Prerequisites
- Chapter 2 (Variables & Data Types)

---

## Concepts
Operators perform operations on values:
- **Arithmetic:** `+`, `-`, `*`, `/`, `%` (remainder)
- **Comparison:** `===`, `!==`, `<`, `>`, `<=`, `>=`
- **Logical:** `&&` (and), `||` (or), `!` (not)

**Note:** Use `===` for equality (checks value and type), not `==`.

---

## Example 1: Arithmetic and Comparison

**What it does:** Calculates average temperature and checks if it exceeds a threshold—common in control logic.

**Code:** Save as `ch03_operators.ts`

```ts
// ch03_operators.ts
const reading1 = 22.5;
const reading2 = 24.0;
const reading3 = 23.1;

const average = (reading1 + reading2 + reading3) / 3;
const threshold = 25;
const overThreshold = average > threshold;

console.log("Average temperature:", average.toFixed(2), "°C");
console.log("Threshold:", threshold, "°C");
console.log("Over threshold?", overThreshold);
```

**Explanation:**
- `(a + b + c) / 3` computes the average
- `average > threshold` produces a boolean
- `.toFixed(2)` rounds a number to 2 decimal places and returns a string

**How to run:**
```bash
npx ts-node ch03_operators.ts
```

**Expected output:**
```
Average temperature: 23.20 °C
Threshold: 25 °C
Over threshold? false
```

---

## Example 2: Logical Operators

**What it does:** Combines conditions for safe operation checks—e.g., allow control only when multiple permissives are met.

**Code:** Save as `ch03_logical.ts`

```ts
// ch03_logical.ts
const temperature = 75;   // °C
const pressureOk = true;
const doorClosed = true;

// AND: all must be true
const safeToRun = temperature < 80 && pressureOk && doorClosed;

// OR: at least one must be true
const needsAttention = temperature > 90 || !pressureOk;

console.log("Safe to run?", safeToRun);
console.log("Needs attention?", needsAttention);
```

**Explanation:**
- `&&` requires all conditions to be true
- `||` requires at least one condition to be true
- `!` negates a boolean (`!pressureOk` means "pressure NOT OK")

**How to run:**
```bash
npx ts-node ch03_logical.ts
```

**Expected output:**
```
Safe to run? true
Needs attention? false
```

---

## Try It Yourself
1. Change `temperature` to 85 and observe the output.
2. Use `%` to check if a sample index is even: `index % 2 === 0`.
3. Write an expression: "alarm if temp > 100 OR pressure < 50".

---

## Key Takeaways
- Arithmetic operators work on numbers
- Use `===` for strict equality
- `&&` = and, `||` = or, `!` = not
- Logical operators short-circuit (stop evaluating once result is known)

---

## Next
→ [Chapter 4: Conditionals (if/else)](./Ch04-Conditionals.md)
