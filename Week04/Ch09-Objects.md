# Chapter 9: Objects

## Objective
Create and use objects to group related data (properties) and access them with dot notation.

## Prerequisites
- Chapter 8 (Arrays)

---

## Concepts
Objects store key-value pairs (properties):
- **Syntax:** `{ key: value, key2: value2 }`
- **Access:** `obj.key` or `obj["key"]`
- **Nested:** Objects can contain other objects or arrays
- **Shorthand:** `{ name }` is short for `{ name: name }`

---

## Example 1: Basic Object – Sensor Reading

**What it does:** Represents a single sensor reading as an object with name, value, unit, and timestamp—a natural structure for monitoring data.

**Code:** Save as `ch09_objects.ts`

```ts
// ch09_objects.ts
const reading = {
  name: "TempSensor-01",
  value: 25.5,
  unit: "°C",
  timestamp: new Date().toISOString(),
};

console.log("Sensor:", reading.name);
console.log("Value:", reading.value, reading.unit);
console.log("Full object:", reading);

// Access with bracket notation
console.log("Unit (bracket):", reading["unit"]);
```

**Explanation:**
- Object literal `{ }` defines properties with `key: value`
- Dot notation `reading.name` is preferred when the key is known
- Bracket notation `reading["unit"]` is useful for dynamic keys
- `new Date().toISOString()` gives current time in ISO format

**How to run:**
```bash
npx ts-node ch09_objects.ts
```

**Expected output:**
```
Sensor: TempSensor-01
Value: 25.5 °C
Full object: { name: 'TempSensor-01', value: 25.5, unit: '°C', timestamp: '2026-02-03T...' }
Unit (bracket): °C
```

---

## Example 2: Nested Objects and Property Updates

**What it does:** Models a device with nested configuration and status—common in control system representations.

**Code:** Save as `ch09_nested.ts`

```ts
// ch09_nested.ts
const device = {
  id: "DEV-001",
  type: "Temperature Controller",
  config: {
    minTemp: 20,
    maxTemp: 80,
    unit: "°C",
  },
  status: {
    online: true,
    lastReading: 45.2,
  },
};

console.log("Device:", device.id, "-", device.type);
console.log("Range:", device.config.minTemp, "-", device.config.maxTemp, device.config.unit);
console.log("Online?", device.status.online);

// Update a property
device.status.lastReading = 46.1;
console.log("Updated reading:", device.status.lastReading);
```

**Explanation:**
- `config` and `status` are nested objects
- Access nested properties with chained dots: `device.config.minTemp`
- Objects are mutable; you can change properties after creation
- Nested structures help organize related data

**How to run:**
```bash
npx ts-node ch09_nested.ts
```

**Expected output:**
```
Device: DEV-001 - Temperature Controller
Range: 20 - 80 °C
Online? true
Updated reading: 46.1
```

---

## Try It Yourself
1. Add a `quality: "GOOD"` property to the reading object in Example 1.
2. Create an object with an array of recent readings: `readings: [22, 23, 24]`.
3. Use object shorthand: `const name = "Sensor1"; const obj = { name };` and print `obj.name`.

---

## Key Takeaways
- Objects group related data as key-value pairs
- Use dot notation for known keys; bracket notation for dynamic keys
- Objects can be nested for complex structures
- Objects are passed by reference (changes affect the original)

---

## Next
→ [Chapter 10: Interfaces & Type Aliases](./Ch10-Interfaces-TypeAliases.md)
