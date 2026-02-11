# Chapter 4: Conditionals (if/else)

## Objective
Make decisions in code using `if`, `else if`, and `else` to branch based on conditions.

## Prerequisites
- Chapter 3 (Operators)

---

## Concepts
Conditionals let your program choose different actions based on values:
- **`if (condition)`** – Execute block only when condition is true
- **`else if (condition)`** – Alternative condition if the first fails
- **`else`** – Fallback when no condition matches

Use curly braces `{}` for blocks with multiple statements.

---

## Example 1: Single and Multi-Branch Conditions

**What it does:** Implements a simple threshold check—if temperature exceeds a limit, print an alert. Common in monitoring systems.

**Code:** Save as `ch04_conditionals.ts`

```ts
// ch04_conditionals.ts
const temperature = 62;
const threshold = 60;

if (temperature > threshold) {
  console.log("ALERT: Temperature exceeds threshold!");
  console.log(`Current: ${temperature}°C, Limit: ${threshold}°C`);
} else {
  console.log("Temperature within normal range.");
}
```

**Explanation:**
- `temperature > threshold` is the condition (evaluates to true or false)
- The block inside `{}` runs only when the condition is true
- `else` runs when the condition is false

**How to run:**
```bash
npx ts-node ch04_conditionals.ts
```

**Expected output:**
```
ALERT: Temperature exceeds threshold!
Current: 62°C, Limit: 60°C
```

---

## Example 2: Multiple Branches with `else if`

**What it does:** Classifies a sensor reading into severity levels—useful for status displays and alarm prioritization.

**Code:** Save as `ch04_multibranch.ts`

```ts
// ch04_multibranch.ts
const pressure = 85;  // psi

if (pressure > 100) {
  console.log("CRITICAL: Pressure too high - shutdown recommended");
} else if (pressure > 90) {
  console.log("WARNING: Pressure elevated");
} else if (pressure < 20) {
  console.log("WARNING: Pressure too low");
} else {
  console.log("OK: Pressure within operating range");
}
```

**Explanation:**
- Conditions are checked from top to bottom
- The first true condition runs; the rest are skipped
- `else` catches all cases that didn't match above

**How to run:**
```bash
npx ts-node ch04_multibranch.ts
```

**Expected output:**
```
WARNING: Pressure elevated
```

---

## Try It Yourself
1. Change `temperature` to 55 and run Example 1 again.
2. Add a new branch in Example 2 for "pressure > 95" as CRITICAL.
3. Create a variable `quality` = "GOOD" or "BAD" and use `if` to print different messages.

---

## Key Takeaways
- `if`/`else if`/`else` control flow based on conditions
- Only one branch executes; conditions are evaluated in order
- Use blocks `{}` for multiple statements in a branch
- Conditions typically use comparison and logical operators

---

## Next
→ [Chapter 5: Loops](./Ch05-Loops.md)
