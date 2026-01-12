# **Week 1 Reading Material: Introduction to Computer-Based Control and Monitoring Systems**

---

## 1. Overview of Computer-Based Control and Monitoring Systems

A **computer-based control and monitoring system** is an integrated system that uses **computing devices** to **observe (monitor)** and **influence (control)** the behavior of physical processes. These systems are widely used in **industrial automation**, **manufacturing**, **energy systems**, **building automation**, and **Internet of Things (IoT)** applications.

Unlike traditional analog control systems, computer-based systems rely on **digital computation**, **software logic**, and **data communication** to process information and make control decisions. The use of computers enables greater flexibility, scalability, and integration with higher-level information systems.

A typical computer-based control and monitoring system performs the following functions:

* Acquires data from physical processes using sensors
* Processes data using software algorithms
* Generates control actions based on system logic
* Sends commands to actuators
* Records, analyzes, and visualizes system data

---

## 2. Control Systems vs. Monitoring Systems

Although closely related, **control systems** and **monitoring systems** serve different primary purposes.

### 2.1 Control Systems

A **control system** is designed to **regulate or manipulate** a physical process to achieve a desired behavior. Control systems use **control algorithms** to determine the appropriate actions needed to maintain system performance.

Key characteristics of control systems:

* Actively influence system behavior
* Operate in **closed-loop** or **open-loop** configurations
* Often require real-time or near-real-time response
* Emphasize stability, accuracy, and reliability

Examples:

* Temperature control in industrial furnaces
* Speed control of electric motors
* Pressure control in fluid systems

### 2.2 Monitoring Systems

A **monitoring system** focuses on **observing and reporting** the state of a system without directly influencing its operation.

Key characteristics of monitoring systems:

* Collect and display sensor data
* Emphasize data accuracy and availability
* Often support decision-making rather than direct control
* May operate at slower update rates

Examples:

* Energy consumption monitoring
* Equipment condition monitoring
* Environmental monitoring systems

In modern automation systems, **control and monitoring functions are often combined** within a single software platform.

---

## 3. Automation Systems and Their Architecture

An **automation system** integrates hardware and software components to perform tasks with minimal human intervention. Computer-based control systems are a core element of automation engineering.

### 3.1 Automation Pyramid

Automation systems are commonly described using a **layered architecture**, often referred to as the **automation pyramid**:

1. **Field Level**

   * Sensors and actuators
   * Direct interaction with physical processes

2. **Control Level**

   * Programmable Logic Controllers (PLCs)
   * Embedded controllers
   * Real-time control execution

3. **Supervisory Level**

   * SCADA (Supervisory Control and Data Acquisition) systems
   * Monitoring, visualization, and supervisory control

4. **Enterprise Level**

   * Data analytics, reporting, and integration with business systems

This course primarily focuses on the **control and supervisory levels**, using modern computer-based technologies.

---

## 4. Hardware Components in Control and Monitoring Systems

### 4.1 Sensors

Sensors convert physical quantities into electrical signals that can be processed by computers.

Common sensor types include:

* Temperature sensors (thermocouples, RTDs)
* Pressure sensors
* Proximity and position sensors
* Flow sensors

### 4.2 Actuators

Actuators convert control signals into physical actions.

Examples:

* Electric motors
* Solenoid valves
* Hydraulic and pneumatic actuators

### 4.3 Controllers

Controllers process sensor data and generate control commands.

Examples:

* PLCs
* Industrial PCs
* Microcontrollers (e.g., ARM-based systems)
* Embedded computers (e.g., single-board computers)

### 4.4 Communication Hardware

Communication devices enable data exchange between system components:

* Ethernet switches
* Serial communication interfaces
* Wireless communication modules

---

## 5. Software Components in Control and Monitoring Systems

### 5.1 Control Software

Control software implements the logic that determines system behavior. This may include:

* Sequential logic
* Feedback control algorithms
* Safety and interlock logic

In this course, control logic will be implemented using **TypeScript-based software**, rather than traditional ladder logic.

### 5.2 Monitoring and Visualization Software

Monitoring software presents system information to human operators.

Typical features include:

* Real-time dashboards
* Alarm systems
* Historical data logging
* Trend visualization

### 5.3 Data Management Software

Data management components handle:

* Data storage
* Data filtering and preprocessing
* Data analysis and reporting

---

## 6. Role of Computers in Modern Control Systems

Modern control systems increasingly rely on **general-purpose computers** and **web technologies** rather than proprietary industrial hardware alone.

Advantages include:

* Platform independence
* Easier integration with IoT devices
* Remote monitoring via web browsers
* Scalability using cloud or container-based deployments

Technologies such as **Node.js**, **web-based dashboards**, and **containerization** allow control systems to be developed, deployed, and maintained more efficiently.

---

## 7. Course Perspective and Learning Expectations

In this course, students will learn to:

* Understand the structure of computer-based control and monitoring systems
* Develop software to monitor and control devices
* Use standard communication protocols and web technologies
* Integrate hardware, software, and data into a complete automation system

Students are expected to:

* Review technical terminology regularly
* Understand system-level architecture, not just programming syntax
* Relate software design decisions to real-world automation constraints

---

## 8. Key Terms for Review

Before the next session, students should be familiar with the following terms:

* Control system
* Monitoring system
* Automation
* Sensor
* Actuator
* Feedback loop
* Controller
* SCADA
* Real-time system
* Industrial communication protocol

---

# Next Week

## Week 2: Development Environment Setup and Toolchain

### What We Will Cover

Next week, we will set up your complete development environment for building control and monitoring systems. This is a **hands-on session** where you will install and configure all the required software tools.

**Topics to be covered:**
* Overview of the development workflow for control and monitoring applications
* Installation and configuration of required software tools:
  * **Node.js** runtime environment
  * **Visual Studio Code (VS Code)** for development
  * **TypeScript** configuration and compilation
  * **Docker Desktop** for containerized applications
* Testing and verification of the development environment
* Introduction to project structure, versioning concepts, and basic development tools

### What to Prepare

**Before attending the class, please prepare the following:**

1. **Bring your laptop** to class (onsite students) or ensure you have access to your development machine (online students)

2. **Administrator/Admin access** on your computer (required for software installations)

3. **Check system requirements:**
   * **Node.js**: Windows 10/11, macOS 10.15+, or Linux
   * **Docker Desktop**: Windows 10/11 (with WSL 2), macOS 10.15+, or Linux
   * **VS Code**: Works on Windows, macOS, and Linux

4. **Ensure sufficient disk space** (at least 5-10 GB free) for:
   * Node.js and npm packages
   * Docker Desktop
   * VS Code and extensions
   * Development tools

5. **Internet connection** (for downloading software during class)

6. **Optional but recommended:**
   * Create a GitHub account (for version control concepts we'll introduce)
   * Familiarize yourself with basic terminal/command line usage

**Note:** We will guide you through the installation process step-by-step during the class. However, if you prefer to install software beforehand, you can download the latest stable versions of:
* Node.js (LTS version): https://nodejs.org/
* Visual Studio Code: https://code.visualstudio.com/
* Docker Desktop: https://www.docker.com/products/docker-desktop/

**Important:** Please do not install TypeScript globally yet—we will configure it properly as part of the project setup during class.

---

## **Self-Assessment**

After reading this material, please complete the **[Week 1 Self-Test Quiz](./Week01-Test.md)** to assess your understanding of the concepts covered in this week's reading material.

The test includes questions on:
* Computer-based control and monitoring systems
* Control systems vs. monitoring systems
* System components (sensors, actuators, controllers)
* Control system types and architectures
* Automation pyramid and system levels

---

**Last Updated:** 2026-01-12

---