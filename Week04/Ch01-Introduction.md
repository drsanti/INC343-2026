# Chapter 1: Introduction to TypeScript

## Objective
Run your first TypeScript program and understand how to execute `.ts` files using the Node.js environment.

## Prerequisites
- Node.js installed (from Week 2)
- A code editor (e.g., VS Code)
- Basic familiarity with the terminal/command line

---

## What is TypeScript?
TypeScript is a superset of JavaScript that adds **static types**. It compiles to plain JavaScript and runs anywhere JavaScript runs. In control and monitoring systems, type safety helps prevent errors when handling sensor data and control logic.

---

## How to Run TypeScript

Two common ways:

1. **`npx ts-node filename.ts`** – Run directly without a separate compile step (recommended for learning)
2. **`npx tsc filename.ts`** then **`node filename.js`** – Compile to JavaScript, then run

**Tip:** `npx` runs the tool without a global install. Ensure you're in the folder containing your `.ts` file.

---

## Example 1: Hello World

**What it does:** Prints a greeting to the console. This is the simplest TypeScript program.

**Code:** Save as `ch01_hello.ts`

```ts
// ch01_hello.ts
console.log("Hello, TypeScript!");
console.log("Welcome to INC343 Control and Monitoring Systems.");
```

**Explanation:**
- `console.log()` outputs text to the terminal
- Anything in double quotes `"..."` is a string literal
- Lines starting with `//` are comments and are ignored when the code runs

**How to run:**
```bash
npx ts-node ch01_hello.ts
```

**Expected output:**
```
Hello, TypeScript!
Welcome to INC343 Control and Monitoring Systems.
```

---

## Example 2: Multiple Output Formats

**What it does:** Shows different ways to display information—useful for debugging and logging sensor data later.

**Code:** Save as `ch01_output.ts`

```ts
// ch01_output.ts
console.log("=== System Status ===");
console.log("Module: Temperature Monitor");
console.log("Status: ONLINE");
console.log("---");
console.log("Values can be", "combined", "with commas.");
```

**Explanation:**
- `console.log()` can take multiple arguments separated by commas; they are printed with a space between them
- You can print labels and values together for clearer logs

**How to run:**
```bash
npx ts-node ch01_output.ts
```

**Expected output:**
```
=== System Status ===
Module: Temperature Monitor
Status: ONLINE
---
Values can be combined with commas.
```

---

## Try It Yourself
1. Change the text in Example 1 and run it again.
2. Add a new `console.log` line that prints a number (e.g. `console.log(42);`).
3. Create a new file `my_first.ts` and print your name and today's date.

---

## Key Takeaways
- TypeScript files use the `.ts` extension
- Use `npx ts-node filename.ts` to run TypeScript directly
- `console.log()` is the primary way to output information for learning and debugging
- Comments use `//` for single lines

---

## Next
→ [Chapter 2: Variables & Data Types](./Ch02-Variables-DataTypes.md)
