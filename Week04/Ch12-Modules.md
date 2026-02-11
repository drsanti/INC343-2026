# Chapter 12: Modules

## Objective
Organize code across files using `export` and `import` for maintainable projects.

## Prerequisites
- Chapter 11 (Classes)
- Multiple `.ts` files in the same folder

---

## Concepts
Modules let you split code into files:
- **`export`** – Make a variable, function, or class available to other files
- **`import`** – Use exported items from another file
- **Default export:** One main export per file; `import X from "./file"`
- **Named exports:** Multiple exports; `import { a, b } from "./file"`

---

## Example 1: Named Exports and Imports

**What it does:** Puts a utility function and a type in a separate file, then imports them—typical structure for shared helpers.

**File 1:** Save as `ch12_utils.ts`

```ts
// ch12_utils.ts
export function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export type SensorReading = {
  name: string;
  value: number;
  unit: string;
};
```

**File 2:** Save as `ch12_main.ts`

```ts
// ch12_main.ts
import { clamp, SensorReading } from "./ch12_utils";

const reading: SensorReading = {
  name: "Temp-01",
  value: 105,
  unit: "°C",
};

const safeValue = clamp(reading.value, 0, 100);
console.log("Original:", reading.value, "Clamped:", safeValue);
```

**Explanation:**
- `export` makes `clamp` and `SensorReading` available to other files
- `import { a, b } from "./file"` imports by name; path is relative
- No `.ts` extension needed in the import path (TypeScript/Node resolve it)

**How to run:**
```bash
npx ts-node ch12_main.ts
```

**Expected output:**
```
Original: 105 Clamped: 100
```

---

## Example 2: Default Export (Class)

**What it does:** Exports a `Sensor` class as the default export and imports it with a custom name—common for single main export per file.

**File 1:** Save as `ch12_sensor.ts`

```ts
// ch12_sensor.ts
export default class Sensor {
  constructor(
    public name: string,
    public unit: string,
    private baseValue: number = 25
  ) {}

  read(): number {
    const noise = (Math.random() - 0.5) * 2;
    return this.baseValue + noise;
  }
}
```

**File 2:** Save as `ch12_use_sensor.ts`

```ts
// ch12_use_sensor.ts
import Sensor from "./ch12_sensor";

const sensor = new Sensor("Temp-01", "°C");
console.log(sensor.name, ":", sensor.read().toFixed(2), "°C");
```

**Explanation:**
- `export default class Sensor` – default export; any name can be used when importing
- `import Sensor from "./ch12_sensor"` – name is chosen by the importer
- Default exports are convenient when a file has one main purpose

**How to run:**
```bash
npx ts-node ch12_use_sensor.ts
```

**Expected output (varies):**
```
Temp-01 : 25.34 °C
```

---

## Try It Yourself
1. Add another function to `ch12_utils.ts` (e.g. `scale`) and import it in `ch12_main.ts`.
2. Create a file `ch12_types.ts` with only type exports; import in another file.
3. Use `import * as utils from "./ch12_utils"` and call `utils.clamp(...)`.

---

## Key Takeaways
- Use `export` to expose items; use `import` to use them
- Named exports: `import { a, b } from "./file"`
- Default export: `import X from "./file"` (one per file)
- Relative paths `./` and `../` point to files in your project

---

## Next
→ [Chapter 13: Error Handling](./Ch13-ErrorHandling.md)
