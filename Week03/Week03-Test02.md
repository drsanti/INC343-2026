# **Week 3 Self-Test Quiz (Code Understanding)**

**Topic: Understanding Control Logic and Automation Code**

---

## **Questions**

1. Consider the following TypeScript code:

```ts
setInterval(() => {
  console.log("Sensor reading acquired");
}, 1000);
```

What does the value `1000` represent, and how does this relate to sampling in control systems?

---

2. Given the code below:

```ts
if (sensorValue >= threshold) {
  actuator = "ON";
} else {
  actuator = "OFF";
}
```

What type of controller is implemented here, and what potential problem can occur when sensor noise is present?

---

3. Examine the following code fragment:

```ts
const error = setpoint - processValue;
const output = Kp * error;
```

What control principle is being implemented, and what happens if `Kp` is set too high?

---

4. Consider this actuator logic:

```ts
if (sensor.quality === "BAD") {
  heater = "OFF";
}
```

Why is this check important in automation engineering?

---

5. Given the following code:

```ts
if (Math.abs(currentValue - lastValue) < 0.01) {
  unchangedCount++;
}
```

What type of fault is this code attempting to detect, and why can this fault be dangerous?

---

6. Analyze the following snippet:

```ts
u = Math.max(0, Math.min(100, u));
```

What engineering concept does this represent, and why is it necessary in real systems?

---

7. Look at the code below:

```ts
if (elapsedTime < minOffTime) {
  return;
}
```

What actuator protection mechanism does this implement, and what problem does it prevent?

---

8. Consider the controller logic:

```ts
if (temp >= high) {
  request = "OFF";
} else if (temp <= low) {
  request = "ON";
}
```

What control improvement does this logic include compared to a single-threshold controller?

---

9. Given the following loop:

```ts
plant.step(actuatorState, Ts);
const reading = sensor.read(plantValue);
```

Why is it important that the plant is updated using the **actual actuator state** rather than the controller request?

---

10. Review the following logging code:

```ts
console.log(`[${timestamp}] PV=${pv} ACT=${actuator}`);
```

Why is timestamped logging important in monitoring and control systems?

---

## **Answers**

1. The value `1000` represents the sampling period in milliseconds. It means the code executes once every 1 second, similar to how sensors are sampled periodically in control systems.

2. This is a **threshold (ON/OFF) controller**. With sensor noise, the actuator may rapidly switch ON and OFF near the threshold, a problem known as **chattering**.

3. This implements **proportional (P) control**. If `Kp` is too high, the system may overshoot the setpoint or become unstable and oscillate.

4. This check ensures **fail-safe behavior**. When sensor quality is unreliable, forcing the actuator OFF prevents unsafe or uncontrolled operation.

5. The code attempts to detect a **stuck sensor fault**. A stuck sensor is dangerous because the controller may act on outdated or incorrect data.

6. This represents **actuator saturation (output limiting)**. It is necessary because real actuators have physical limits and cannot exceed their rated operating range.

7. This implements a **minimum OFF time (anti-short-cycling)** mechanism. It prevents rapid switching that could damage actuators or reduce equipment lifespan.

8. This logic implements **hysteresis**, which reduces frequent switching and improves stability in the presence of noise.

9. The actual actuator state reflects what the system is truly doing after safety logic, interlocks, and timing constraints. Using the request alone would ignore these protections and misrepresent system behavior.

10. Timestamped logging allows engineers to trace system behavior over time, diagnose faults, correlate events, and analyze performance trends in monitoring and control systems.

---

**Last Updated:** 2026-01-12

---