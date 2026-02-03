# Chapter 13: Error Handling

## Objective
Handle runtime errors with `try`, `catch`, and `finally` to write robust programs.

## Prerequisites
- Chapter 12 (Modules)

---

## Concepts
Errors can occur at runtime (invalid input, missing data, etc.). TypeScript/JavaScript provides:
- **`try`** – Wrap code that might throw
- **`catch`** – Handle the error; receives an Error object
- **`finally`** – Runs whether or not an error occurred (cleanup, logging)
- **`throw`** – Create and throw your own errors

---

## Example 1: Basic try/catch

**What it does:** Wraps a risky operation (parsing user input) in try/catch so invalid input doesn't crash the program—essential for control systems that receive external data.

**Code:** Save as `ch13_try_catch.ts`

```ts
// ch13_try_catch.ts
function parseTemperature(input: string): number {
  const value = parseFloat(input);
  if (isNaN(value)) {
    throw new Error(`Invalid temperature: "${input}" is not a number`);
  }
  return value;
}

const inputs = ["25.5", "invalid", "30"];

for (const input of inputs) {
  try {
    const temp = parseTemperature(input);
    console.log(`Parsed: ${temp} °C`);
  } catch (err) {
    console.log(`Error: ${(err as Error).message}`);
  }
}
```

**Explanation:**
- `parseFloat` returns `NaN` for non-numeric strings
- `throw new Error(...)` creates and throws an error
- `catch (err)` receives the error; `(err as Error).message` gets the message
- The loop continues even when one input fails—errors are contained

**How to run:**
```bash
npx ts-node ch13_try_catch.ts
```

**Expected output:**
```
Parsed: 25.5 °C
Error: Invalid temperature: "invalid" is not a number
Parsed: 30 °C
```

---

## Example 2: try/catch/finally for Cleanup

**What it does:** Uses `finally` to ensure a "connection closed" or "cleanup" step always runs—important for resources (sockets, files) even when errors occur.

**Code:** Save as `ch13_finally.ts`

```ts
// ch13_finally.ts
function simulateSensorRead(shouldFail: boolean): void {
  console.log("Opening sensor connection...");

  try {
    if (shouldFail) {
      throw new Error("Sensor communication timeout");
    }
    console.log("Read value: 25.3 °C");
  } catch (err) {
    console.log("Caught:", (err as Error).message);
  } finally {
    console.log("Closing sensor connection.");
  }
}

console.log("=== Successful read ===");
simulateSensorRead(false);

console.log("\n=== Failed read ===");
simulateSensorRead(true);
```

**Explanation:**
- `finally` runs after `try` (success) or `catch` (error)
- Use `finally` for cleanup that must always execute
- Without `finally`, you'd need to duplicate cleanup in both success and error paths

**How to run:**
```bash
npx ts-node ch13_finally.ts
```

**Expected output:**
```
=== Successful read ===
Opening sensor connection...
Read value: 25.3 °C
Closing sensor connection.

=== Failed read ===
Opening sensor connection...
Caught: Sensor communication timeout
Closing sensor connection.
```

---

## Try It Yourself
1. Add validation in `parseTemperature` to reject values outside 0–100.
2. Create a function that throws different error types and catch them separately.
3. Use `finally` to reset a counter or log "Attempt complete" after each try.

---

## Key Takeaways
- `try`/`catch` prevent errors from crashing the program
- `catch (err)` receives the error; use `(err as Error).message` for the message
- `finally` runs regardless of success or failure—use for cleanup
- `throw new Error("message")` creates custom errors
- Always handle errors at boundaries (user input, file I/O, network)

---

## Completion

You have completed the TypeScript for Beginners learning track. You are now ready for:
- **Week 3 Labs** – Control system components and algorithms
- **Week 5+** – Next.js frontend and NestJS backend development

Return to [Week 4 README](./README.md) or [Course Outline](../Outline.md).
