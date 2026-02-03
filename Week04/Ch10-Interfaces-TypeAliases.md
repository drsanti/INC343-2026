# Chapter 10: Interfaces and Type Aliases

## Objective
Define object shapes with interfaces and type aliases for type safety and better tooling.

## Prerequisites
- Chapter 9 (Objects)

---

## Concepts
TypeScript lets you describe the *shape* of data:
- **Interface:** Defines the structure of an object; can be extended
- **Type alias:** Alternative way to name types; can represent unions, primitives
- Both enable autocomplete, error checking, and documentation

```ts
interface Name { prop: type; }
type Name = { prop: type; };
```

---

## Example 1: Interface for Sensor Reading

**What it does:** Defines an interface `SensorReading` so all readings have a consistent shape—ensures type safety when processing monitoring data.

**Code:** Save as `ch10_interface.ts`

```ts
// ch10_interface.ts
interface SensorReading {
  name: string;
  value: number;
  unit: string;
  quality?: "GOOD" | "BAD";  // optional
}

const reading1: SensorReading = {
  name: "TempSensor-01",
  value: 25.5,
  unit: "°C",
  quality: "GOOD",
};

const reading2: SensorReading = {
  name: "PressureSensor-01",
  value: 101.3,
  unit: "kPa",
  // quality is optional, so we can omit it
};

function formatReading(r: SensorReading): string {
  return `${r.name}: ${r.value} ${r.unit}` + (r.quality ? ` (${r.quality})` : "");
}

console.log(formatReading(reading1));
console.log(formatReading(reading2));
```

**Explanation:**
- `interface SensorReading` defines required properties: `name`, `value`, `unit`
- `quality?` is optional (the `?` means it can be omitted)
- `"GOOD" | "BAD"` is a union type—only those strings are allowed
- Functions can use the interface as parameter type for consistency

**How to run:**
```bash
npx ts-node ch10_interface.ts
```

**Expected output:**
```
TempSensor-01: 25.5 °C (GOOD)
PressureSensor-01: 101.3 kPa
```

---

## Example 2: Type Alias and Union Types

**What it does:** Uses type aliases for reusable types and unions—useful for status enums and multiple allowed shapes.

**Code:** Save as `ch10_type_alias.ts`

```ts
// ch10_type_alias.ts
type DeviceStatus = "ONLINE" | "OFFLINE" | "FAULT";
type Unit = "°C" | "°F" | "kPa" | "psi";

interface Device {
  id: string;
  status: DeviceStatus;
  reading?: number;
  unit?: Unit;
}

const devices: Device[] = [
  { id: "D1", status: "ONLINE", reading: 45, unit: "°C" },
  { id: "D2", status: "OFFLINE" },
  { id: "D3", status: "FAULT", reading: 150 },
];

for (const d of devices) {
  let msg = `${d.id}: ${d.status}`;
  if (d.reading !== undefined && d.unit) {
    msg += ` (${d.reading} ${d.unit})`;
  }
  console.log(msg);
}
```

**Explanation:**
- `type DeviceStatus = "A" | "B"` restricts values to those literals
- `Device[]` is an array of objects conforming to the `Device` interface
- `d.reading !== undefined` checks that optional property exists before use
- Type aliases can name unions and complex types for reuse

**How to run:**
```bash
npx ts-node ch10_type_alias.ts
```

**Expected output:**
```
D1: ONLINE (45 °C)
D2: OFFLINE
D3: FAULT (150 undefined)
```

*(Note: D3 has reading but no unit; you could add a default unit in real code.)*

---

## Try It Yourself
1. Add a required `timestamp: string` to `SensorReading` and fix any errors.
2. Create a type `AlarmLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"` and use it in an interface.
3. Use an interface with `extends` to create `ExtendedReading extends SensorReading` with an extra property.

---

## Key Takeaways
- Interfaces describe object shapes; use `?` for optional properties
- Type aliases name any type, including unions
- Union types restrict values to specific options
- Type annotations catch errors at compile time, not runtime

---

## Next
→ [Chapter 11: Classes](./Ch11-Classes.md)
