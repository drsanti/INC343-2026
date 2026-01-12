# **Week 3 Self-Test Quiz**

**Topic: Programming Foundations and Control System Concepts**

---

## **Questions**

1. What is the main role of **programming** in modern computer-based control systems?

2. Which TypeScript data type is most appropriate for representing a **sensor measurement** such as temperature?
   A. `string`
   B. `boolean`
   C. `number`
   D. `any`

3. What is the difference between a **sensor** and an **actuator** in a control system?

4. True or False:
   In a **closed-loop control system**, control decisions are made based on feedback from the process.

5. What is a **feedback loop** and why is it important in automation systems?

6. Consider a temperature controller that turns a heater ON at 60°C and OFF at 60°C.
   What problem is likely to occur?
   A. System instability due to noise
   B. Actuator chattering
   C. Slow system response
   D. Sensor calibration error

7. True or False:
   **Hysteresis** is used in control systems to reduce frequent switching caused by noise around a threshold.

8. What is the purpose of **interlocks** in actuator control systems?

9. In automation software, why is it important to separate **controller request (REQ)** from **actuator actual state (ACT)**?

10. Give **one example** of a situation where a control system should force an actuator into a **safe state**.

---

## **Answers**

1. Programming allows automation engineers to implement flexible control logic, monitoring functions, data processing, communication protocols, and system integration. It enables complex decision-making, scalability, and integration with modern web and IoT technologies.

2. **C. `number`**

3. A **sensor** measures physical quantities (such as temperature, pressure, or level) and converts them into data for the control system, while an **actuator** receives control commands and performs physical actions (such as turning a motor, valve, or heater ON or OFF).

4. **True**

5. A feedback loop is a process where the system output (measured by sensors) is fed back into the controller to adjust control actions. It is important because it improves accuracy, stability, and robustness against disturbances.

6. **B. Actuator chattering**

7. **True**

8. Interlocks prevent unsafe or undesired actuator operation by enforcing safety conditions and constraints, such as emergency stops, over-temperature protection, or permissive conditions that must be satisfied before operation.

9. Separating REQ from ACT allows safety logic, interlocks, timing limits, and fault conditions to override controller commands. ACT may differ from REQ due to trips, permissives, minimum ON/OFF times, or fault conditions.

10. Examples include:

* Turning a heater OFF when sensor quality is BAD
* Shutting down a motor during an emergency stop
* Closing a valve when overpressure is detected

---

**Last Updated:** 2026-01-12

---
