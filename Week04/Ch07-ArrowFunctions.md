# Chapter 7: Arrow Functions

## Objective
Use arrow function syntax `() => {}` for concise function expressions and callbacks.

## Prerequisites
- Chapter 6 (Functions)

---

## Concepts
Arrow functions are a shorter way to write functions:
- Syntax: `(params) => expression` or `(params) => { statements }`
- Often used as callbacks (functions passed to other functions)
- No `this` binding (relevant in classes; covered later)

**Comparison:**
```ts
// Traditional
function add(a: number, b: number): number { return a + b; }

// Arrow
const add = (a: number, b: number): number => a + b;
```

---

## Example 1: Arrow Function as a Regular Function

**What it does:** Uses arrow syntax to define a simple conversion and a validation function.

**Code:** Save as `ch07_arrow.ts`

```ts
// ch07_arrow.ts
const clamp = (value: number, min: number, max: number): number => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

const scale = (x: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number =>
  ((x - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;

const rawReading = 5.2;
const clamped = clamp(rawReading, 0, 5);
console.log("Raw:", rawReading, "Clamped:", clamped);

const percent = scale(2.5, 0, 5, 0, 100);
console.log("2.5 in 0-5 scale =", percent, "%");
```

**Explanation:**
- `clamp` ensures a value stays between min and max (common in control systems)
- `scale` maps a value from one range to another (e.g., sensor raw to percentage)
- Multi-line arrow functions use `{ }` and explicit `return`
- Single-expression arrow functions can omit `{ }` and `return`

**How to run:**
```bash
npx ts-node ch07_arrow.ts
```

**Expected output:**
```
Raw: 5.2 Clamped: 5
2.5 in 0-5 scale = 50 %
```

---

## Example 2: Arrow Functions as Callbacks

**What it does:** Uses arrow functions with `filter` and `map` to process an array of sensor readings—very common in data processing.

**Code:** Save as `ch07_callbacks.ts`

```ts
// ch07_callbacks.ts
const readings = [22.1, 105.2, 24.5, -1.0, 25.0, 150.0];

// Filter: keep only valid readings (0–100)
const validReadings = readings.filter((r) => r >= 0 && r <= 100);

// Map: convert each to a status string
const statuses = validReadings.map((r) =>
  r > 80 ? "HIGH" : r < 20 ? "LOW" : "OK"
);

console.log("Original:", readings);
console.log("Valid:", validReadings);
console.log("Statuses:", statuses);
```

**Explanation:**
- `filter(callback)` keeps elements where the callback returns true
- `map(callback)` transforms each element using the callback
- `(r) => ...` is an arrow function passed as the callback
- Parentheses around `r` can be omitted for a single parameter: `r =>`

**How to run:**
```bash
npx ts-node ch07_callbacks.ts
```

**Expected output:**
```
Original: [ 22.1, 105.2, 24.5, -1, 25, 150 ]
Valid: [ 22.1, 24.5, 25 ]
Statuses: [ 'OK', 'OK', 'OK' ]
```

---

## Try It Yourself
1. Rewrite the `clamp` function from Example 1 using a ternary operator.
2. Use `filter` to keep only readings greater than 24.
3. Use `map` to convert Celsius values to Fahrenheit in an array.

---

## Key Takeaways
- Arrow functions use `=>` and often reduce boilerplate
- Single parameter can omit parentheses: `x => x * 2`
- Arrow functions are ideal for callbacks (filter, map, forEach)
- Use `{ }` and `return` when the body has multiple statements

---

## Next
→ [Chapter 8: Arrays](./Ch08-Arrays.md)
