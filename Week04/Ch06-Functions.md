# Chapter 6: Functions

## Objective
Define functions with parameters and return values to encapsulate reusable logic.

## Prerequisites
- Chapter 5 (Loops)

---

## Concepts
Functions are blocks of code that:
- Take **parameters** (inputs)
- Optionally **return** a value
- Can be **called** from anywhere in your code

```ts
function name(param: type): returnType {
  // body
  return value;
}
```

---

## Example 1: Function with Parameters and Return

**What it does:** Converts Celsius to Fahrenheit—a common conversion in temperature monitoring.

**Code:** Save as `ch06_functions.ts`

```ts
// ch06_functions.ts
function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

const tempC = 25;
const tempF = celsiusToFahrenheit(tempC);

console.log(`${tempC} °C = ${tempF} °F`);

// Reuse with different values
console.log("0 °C =", celsiusToFahrenheit(0), "°F");
console.log("100 °C =", celsiusToFahrenheit(100), "°F");
```

**Explanation:**
- `celsiusToFahrenheit` takes one parameter of type `number`
- The `: number` after the parentheses is the return type
- `return` sends the computed value back to the caller
- Functions can be called multiple times with different arguments

**How to run:**
```bash
npx ts-node ch06_functions.ts
```

**Expected output:**
```
25 °C = 77 °F
0 °C = 32 °F
100 °C = 212 °F
```

---

## Example 2: Multiple Parameters and Conditional Logic

**What it does:** Checks if a value is within a safe range—useful for validating sensor readings before use.

**Code:** Save as `ch06_range_check.ts`

```ts
// ch06_range_check.ts
function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

const temperature = 75;
const minSafe = 0;
const maxSafe = 100;

if (isInRange(temperature, minSafe, maxSafe)) {
  console.log("Temperature is within safe operating range.");
} else {
  console.log("WARNING: Temperature out of range!");
}

// Reuse for different sensors
console.log("Pressure 50 in 0-80?", isInRange(50, 0, 80));   // true
console.log("Pressure 90 in 0-80?", isInRange(90, 0, 80));   // false
```

**Explanation:**
- Multiple parameters are separated by commas
- Each parameter has a type annotation
- The function returns a boolean for use in conditionals
- Same function can validate different values and ranges

**How to run:**
```bash
npx ts-node ch06_range_check.ts
```

**Expected output:**
```
Temperature is within safe operating range.
Pressure 50 in 0-80? true
Pressure 90 in 0-80? false
```

---

## Try It Yourself
1. Add a function `fahrenheitToCelsius(f: number): number`.
2. Create `formatReading(name: string, value: number, unit: string)` that returns a formatted string.
3. Write a function with no return (void) that just prints a status message.

---

## Key Takeaways
- Functions group reusable logic
- Parameters receive values; return sends a value back
- Type annotations on parameters and return improve safety
- Functions reduce duplication and improve readability

---

## Next
→ [Chapter 7: Arrow Functions](./Ch07-ArrowFunctions.md)
