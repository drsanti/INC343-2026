# Chapter 8: Arrays

## Objective
Create and manipulate arrays: access elements, use `length`, `push`, and iterate with `for` and `for-of`.

## Prerequisites
- Chapter 7 (Arrow Functions)

---

## Concepts
Arrays store ordered collections of values:
- Indexing: `arr[0]` is the first element (zero-based)
- `arr.length` – number of elements
- `arr.push(item)` – add to the end
- `for (const item of arr)` – iterate over values
- `arr.filter()`, `arr.map()` – process elements (seen in Ch7)

---

## Example 1: Creating and Accessing Arrays

**What it does:** Stores multiple sensor readings in an array and computes statistics—common in data logging and analysis.

**Code:** Save as `ch08_arrays.ts`

```ts
// ch08_arrays.ts
const readings: number[] = [22.5, 23.1, 24.0, 22.8, 23.5];

console.log("Readings:", readings);
console.log("Count:", readings.length);
console.log("First:", readings[0]);
console.log("Last:", readings[readings.length - 1]);

// Sum and average
let sum = 0;
for (const r of readings) {
  sum += r;
}
const average = sum / readings.length;
console.log("Average:", average.toFixed(2));

// Max and min
const max = Math.max(...readings);
const min = Math.min(...readings);
console.log("Max:", max, "Min:", min);
```

**Explanation:**
- `number[]` is the type for an array of numbers
- `readings[0]` and `readings[length-1]` access first and last elements
- `for (const r of readings)` loops over each value (no index needed)
- `Math.max(...readings)` uses spread `...` to pass array elements as arguments

**How to run:**
```bash
npx ts-node ch08_arrays.ts
```

**Expected output:**
```
Readings: [ 22.5, 23.1, 24, 22.8, 23.5 ]
Count: 5
First: 22.5
Last: 23.5
Average: 23.18
Max: 24 Min: 22.5
```

---

## Example 2: Building Arrays Dynamically with push

**What it does:** Simulates collecting sensor samples in a loop and storing them in an array for later analysis.

**Code:** Save as `ch08_push.ts`

```ts
// ch08_push.ts
const samples: number[] = [];
const baseValue = 25;
const numSamples = 5;

for (let i = 0; i < numSamples; i++) {
  const noise = (Math.random() - 0.5) * 2;
  samples.push(baseValue + noise);
}

console.log("Collected samples:", samples);

// Process after collection
const validSamples = samples.filter((s) => s >= 20 && s <= 30);
console.log("Valid (20-30 range):", validSamples);
console.log("Valid count:", validSamples.length);
```

**Explanation:**
- `samples: number[] = []` creates an empty array
- `push(value)` adds an element to the end
- Arrays can be built gradually and processed afterward
- `filter` returns a new array; it does not modify the original

**How to run:**
```bash
npx ts-node ch08_push.ts
```

**Expected output (varies):**
```
Collected samples: [ 25.2, 24.1, 26.0, 23.8, 25.5 ]
Valid (20-30 range): [ 25.2, 24.1, 26, 23.8, 25.5 ]
Valid count: 5
```

---

## Try It Yourself
1. Add a sixth reading to the array in Example 1 and recompute the average.
2. Use a loop to find the index of the maximum value in the array.
3. Create an array of strings (sensor names) and use `for-of` to print each.

---

## Key Takeaways
- Arrays are zero-indexed; first element is `arr[0]`
- `push` adds to the end; `length` gives the size
- `for (const x of arr)` iterates over values
- `filter` and `map` return new arrays; they don't mutate the original

---

## Next
→ [Chapter 9: Objects](./Ch09-Objects.md)
