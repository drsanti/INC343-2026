# Test 01 – Theory: Backend Development for Control Applications

**Topic:** INC343 Week 06 (Backend Role, NestJS Architecture, RESTful APIs, WebSockets)

**Total: 15 marks** (each question shows mark allocation)

---

## Questions

### 1.
In the context of a control system, why is the Backend referred to as the **"Brain"** of the application? **(1 mark)**

---

### 2.
Besides being the brain, the backend also acts as a **"Bridge"**. Name one low-level hardware protocol or communication method the backend might use to talk to a PLC or Microcontroller. **(1 mark)**

---

### 3.
In **NestJS**, what is the purpose of the **CLI (Command Line Interface)**? Why is it preferred over manually creating every file? **(1 mark)**

---

### 4.
Explain the primary difference between a **Controller** and a **Service** in a NestJS application. Which one should contain the "Business Logic"? **(2 marks)**

---

### 5.
What is **Dependency Injection (DI)**? In one sentence, explain how it makes a NestJS application more modular or easier to test. **(2 marks)**

---

### 6.
In **RESTful API** design, which HTTP verb (method) is the most appropriate for **reading** the current state of a sensor without modifying it? **(1 mark)**

---

### 7.
Suppose you want to **partially update** the name of a device. Should you use the **PUT** or **PATCH** method? Explain why. **(2 marks)**

---

### 8.
Identify the **Resource** and the **Action** in the following API endpoint: `PATCH /devices/12/value`. **(1 mark)**

---

### 9.
What is a **DTO (Data Transfer Object)** and why is it critical when building an API that handles control signals (e.g., setting a motor speed)? **(2 marks)**

---

### 10.
In real-time monitoring, explain the difference between a **"Pull"** architecture (HTTP Polling) and a **"Push"** architecture (WebSockets). **(1 mark)**

---

### 11.
Why are **WebSockets** considered more efficient than HTTP Polling for a high-frequency live dashboard? **(1 mark)**

---

**End of Test 01 – Total: 15 marks**
