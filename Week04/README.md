# Week 4: TypeScript Programming for Beginners

> Self-study TypeScript chapters and Quiz 1 preparation. **Quiz 1 is held in Week 5**—see [Week 5 Quiz 1 materials](../Week05/Quiz-01/) for details and scoring policy.

---

## From Week 3 to Week 4

In **[Week 3](../Week03/)**, you learned how **TypeScript** supports control and monitoring systems. You used it to:

* **Simulate sensor data acquisition** – Classes and types to model sensors with names, units, and readings
* **Implement threshold-based control** – Conditionals and logic to turn actuators ON/OFF based on sensor values
* **Model actuators with interlocks** – Objects and state to enforce safety constraints (e.g., min on/off times, trip conditions)
* **Build feedback loops** – Loops and control logic for closed-loop temperature regulation
* **Detect faults and log events** – Arrays, interfaces, and error handling for safe-state control and alarm logging

TypeScript gave you **type safety** for sensor readings, **modular logic** with functions and classes, and **clear structure** for complex control scenarios. Week 4 helps you strengthen these foundations: the chapters below break down each concept step-by-step, with runnable examples. Use them to fill gaps, reinforce what you built in the labs, or work through from scratch if you are new to TypeScript.

---

## Overview

**Week 4** serves two purposes:

1. **TypeScript self-study** – Hands-on chapters for beginners (Ch01–Ch13)
2. **Quiz 1 preparation** – Quiz 1 is held in **Week 5**; use this week to prepare (see [Week 5 Quiz 1](../Week05/Quiz-01/) for quiz details and scoring policy)

---

## TypeScript for Beginners – Chapter Index

These chapters provide a hands-on introduction to TypeScript, aligned with INC343 control and monitoring applications.

Each chapter contains:
- **Objective** and **Prerequisites**
- **At least two examples** with full code, explanation, and how to run
- **Try it yourself** exercises
- **Key takeaways** and link to the next chapter

**Prerequisites:** Node.js installed (from Week 2). **Run command:** `npx ts-node filename.ts` (from the folder containing the `.ts` file).

### Phase 1: First Steps
- [Ch01: Introduction](./Ch01-Introduction.md) – First program, `console.log`, run with ts-node
- [Ch02: Variables & Data Types](./Ch02-Variables-DataTypes.md) – `let`, `const`, `number`, `string`, `boolean`

### Phase 2: Control Flow
- [Ch03: Operators](./Ch03-Operators.md) – Arithmetic, comparison, logical
- [Ch04: Conditionals (if/else)](./Ch04-Conditionals.md) – Decision branching
- [Ch05: Loops](./Ch05-Loops.md) – `for`, `while`, `break`, `continue`

### Phase 3: Reusable Logic
- [Ch06: Functions](./Ch06-Functions.md) – Parameters, return, scope
- [Ch07: Arrow Functions](./Ch07-ArrowFunctions.md) – Shorthand syntax, callbacks
- [Ch08: Arrays](./Ch08-Arrays.md) – Create, access, iterate, `push`, `filter`, `map`

### Phase 4: Objects & Types
- [Ch09: Objects](./Ch09-Objects.md) – Properties, dot notation, nested objects
- [Ch10: Interfaces & Type Aliases](./Ch10-Interfaces-TypeAliases.md) – Object shapes, type safety
- [Ch11: Classes](./Ch11-Classes.md) – Constructor, methods, `this`, `new`

### Phase 5: Practical Skills
- [Ch12: Modules](./Ch12-Modules.md) – `import`, `export`, named and default
- [Ch13: Error Handling](./Ch13-ErrorHandling.md) – `try`, `catch`, `finally`, `throw`

**Suggested order:** Follow chapters 1–13 in sequence. Each builds on the previous.

---

## Quiz 1 – Foundations of Control and Programming

**Quiz 1 is held in Week 5.** See [Week 5 Quiz 1 materials](../Week05/Quiz-01/) for full details, preparation checklist, and the **programming examination scoring policy**.

Quiz 1 covers:
- **Paper-based:** Control system concepts and programming fundamentals
- **Programming:** TypeScript-based problem solving and basic control logic

**Preparation (complete before Week 5):**
- Review Week 1–3 materials
- Complete Week 3 laboratory exercises
- Work through TypeScript chapters Ch01–Ch13 (or at least Ch01–Ch11)
- Complete Week 3 self-assessment tests

---

## Quick Links

- [Course Outline](../Outline.md)
- [Week 3 Materials](../Week03/)
- [Week 5 Materials](../Week05/) – Frontend development and **Quiz 1** (details and scoring policy in [Quiz-01](../Week05/Quiz-01/))
