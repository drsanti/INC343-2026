# Chapter 11: Classes

## Objective
Define classes with constructors, properties, and methods to combine data and behavior.

## Prerequisites
- Chapter 10 (Interfaces & Type Aliases)

---

## Concepts
Classes are blueprints for objects:
- **`constructor`** – Runs when creating an instance with `new`
- **Properties** – Data stored on each instance
- **Methods** – Functions that operate on the instance
- **`this`** – Refers to the current instance

```ts
class Name {
  constructor(param: type) { ... }
  methodName(): returnType { ... }
}
```

---

## Example 1: Simple Sensor Class

**What it does:** Defines a `Sensor` class with a name, unit, and a `read()` method that returns a simulated reading—models real sensor components in software.

**Code:** Save as `ch11_classes.ts`

```ts
// ch11_classes.ts
class Sensor {
  constructor(
    public readonly name: string,
    public readonly unit: string,
    private baseValue: number = 25
  ) {}

  read(): { value: number; unit: string } {
    const noise = (Math.random() - 0.5) * 2;
    const value = this.baseValue + noise;
    return { value, unit: this.unit };
  }
}

const tempSensor = new Sensor("TempSensor-01", "°C", 25);
const reading = tempSensor.read();

console.log("Sensor:", tempSensor.name);
console.log("Reading:", reading.value, reading.unit);

// Second sensor
const pressureSensor = new Sensor("PressureSensor-01", "kPa", 101);
const pReading = pressureSensor.read();
console.log("Pressure:", pReading.value, pReading.unit);
```

**Explanation:**
- `constructor(...)` initializes the instance; `public readonly` creates read-only properties
- `private baseValue` is only accessible inside the class
- `read()` is a method; `this.unit` and `this.baseValue` refer to instance data
- `new Sensor(...)` creates an instance; each instance has its own state

**How to run:**
```bash
npx ts-node ch11_classes.ts
```

**Expected output (values vary):**
```
Sensor: TempSensor-01
Reading: 25.34 °C
Pressure: 101.2 kPa
```

---

## Example 2: Class with State and Multiple Methods

**What it does:** Models a simple thermostat controller that tracks state and makes decisions—combines data (setpoint, current temp) with behavior (should heat?).

**Code:** Save as `ch11_thermostat.ts`

```ts
// ch11_thermostat.ts
class ThermostatController {
  private heatingOn = false;

  constructor(private setpoint: number) {}

  update(currentTemp: number): void {
    if (currentTemp < this.setpoint - 1) {
      this.heatingOn = true;
      console.log(`Heat ON (temp ${currentTemp} < setpoint ${this.setpoint})`);
    } else if (currentTemp > this.setpoint + 1) {
      this.heatingOn = false;
      console.log(`Heat OFF (temp ${currentTemp} > setpoint ${this.setpoint})`);
    }
  }

  isHeating(): boolean {
    return this.heatingOn;
  }
}

const thermostat = new ThermostatController(25);
thermostat.update(22);  // Heat ON
thermostat.update(26);  // Heat OFF
console.log("Heating?", thermostat.isHeating());
```

**Explanation:**
- `private setpoint` is set via constructor parameter shorthand
- `update()` modifies internal state based on current temperature
- Hysteresis: ±1°C band avoids rapid on/off switching
- `isHeating()` exposes state without allowing direct mutation

**How to run:**
```bash
npx ts-node ch11_thermostat.ts
```

**Expected output:**
```
Heat ON (temp 22 < setpoint 25)
Heat OFF (temp 26 > setpoint 25)
Heating? false
```

---

## Try It Yourself
1. Add a `min` and `max` to the `Sensor` class and clamp the reading in `read()`.
2. Add a `getSetpoint()` method to `ThermostatController`.
3. Create an `Actuator` class with `turnOn()` and `turnOff()` methods.

---

## Key Takeaways
- Classes combine data (properties) and behavior (methods)
- `constructor` runs when you use `new ClassName()`
- `this` refers to the current instance
- `public`/`private` control visibility; `readonly` prevents reassignment

---

## Next
→ [Chapter 12: Modules](./Ch12-Modules.md)
