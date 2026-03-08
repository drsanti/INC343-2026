# Test 02 – Coding: Backend Implementation

**Topic:** INC343 Week 06 – Coding tasks (TypeScript, NestJS Controllers, and Gateways). You may use AI tools to help write code.

**Total: 5 marks** (each question shows mark allocation).

---

## Question 1: Data Modeling (TypeScript)

Define a TypeScript **interface** named `Actuator` for a device that controls a motor. It must have the following properties:
- `id`: a unique string
- `model`: a string (e.g., "Nema-17")
- `speed`: a number representing rotations per minute (RPM)
- `isRunning`: a boolean flag

**Create a sample variable** of type `Actuator` and initialize it with some data.

**(1 mark)**

**Submit:** A TypeScript file (e.g., `t2_model.ts`) containing the interface and the variable.

---

## Question 2: Controller Implementation (NestJS)

Write a NestJS **Controller** method named `getActuatorStatus` that:
1. Responds to a **GET** request at the path `:id`.
2. Accesses the `id` from the URL parameters.
3. Calls a method `this.actuatorService.findOne(id)` to retrieve the data.
4. Returns the result.

*(Assume the Service and Constructor are already defined; just write the method with appropriate decorators).*

**(2 marks)**

**Submit:** A code snippet or a file (e.g., `t2_controller.ts`) with the method implementation.

---

## Question 3: WebSocket Broadcasting

Inside a NestJS **WebSocket Gateway**, write a manual method named `sendEmergencyStop` that:
1. Takes a `deviceId` (string) as an argument.
2. Uses a `@WebSocketServer()` instance (named `server`) to **emit** a signal.
3. The signal name must be `"emergency-alert"`.
4. The payload should be an object: `{ deviceId: deviceId, action: 'HALT', timestamp: new Date() }`.

**(2 marks)**

**Submit:** A code snippet or a file (e.g., `t2_gateway.ts`) containing the method logic.

---

**End of Test 02 – Total: 5 marks**
