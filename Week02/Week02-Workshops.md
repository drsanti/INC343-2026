# **Week 2 Hands-On Workshops: Development Environment Setup**

## Workshop Objectives

By the end of these workshops, students will be able to:

* Install and verify a modern software toolchain for control and monitoring systems
* Understand the role of each tool in automation software development
* Validate their development environment using basic technical tests

---

## **Workshop 1: Installing and Running Visual Studio Code**

### Task: Download, Install, and Verify VS Code

1. **Download Visual Studio Code:**
   * Visit [https://code.visualstudio.com/](https://code.visualstudio.com/)
   * Download the version for your operating system (Windows, macOS, or Linux)

2. **Install Visual Studio Code:**
   * Run the installer and follow the installation wizard
   * Accept the default settings (you can also add VS Code to PATH during installation)

3. **Run Visual Studio Code:**
   * Launch Visual Studio Code from your desktop or start menu
   * VS Code should open with a welcome screen

4. **Check VS Code Version:**
   * **Method 1 - Using Menu:**
     * **Windows/Linux:** Click on `Help` → `About`
     * **macOS:** Click on `Code` → `About Visual Studio Code`
     * The version information will be displayed in a dialog
   
   * **Method 2 - Using Command Palette:**
     * Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS) to open Command Palette
     * Type "About" and select `Help: About`
     * The version information will be displayed
   
   * **Method 3 - Using Command Line (if code command is available):**
     * Open your terminal/command prompt
     * Type:
       ```bash
       code --version
       ```
     * This will display the VS Code version number

---

## **Workshop 2: Installing and Verifying Node.js**

### Task: Download and Install Node.js

1. **Download Node.js:**
   * Visit [https://nodejs.org/](https://nodejs.org/)
   * Download the **LTS (Long-Term Support)** version for your operating system (Windows, macOS, or Linux)

2. **Install Node.js:**
   * Run the installer and follow the installation wizard
   * Accept the default settings (this will also install npm - Node Package Manager)

3. **Verify Installation:**
   * Open your **command line** (Terminal on macOS/Linux, Command Prompt or PowerShell on Windows)
   * Check the Node.js version by typing:
     ```bash
     node --version
     ```
   * Check the npm version by typing:
     ```bash
     npm --version
     ```
   * Both commands should display version numbers if the installation was successful

4. **Test Node.js with a Simple Program in VSCode:**
   * Open **Visual Studio Code** (from Workshop 1)
   * Create a new folder for your project (e.g., `node-test`)
   * In VSCode, click `File` → `New File` or press `Ctrl+N` (Windows/Linux) / `Cmd+N` (macOS)
   * Save the file as `test.js` (press `Ctrl+S` or `Cmd+S` and name it `test.js`)
   * Type the following code in the file:
     ```javascript
     console.log('Hello from Node.js!');
     console.log('Node.js is working correctly!');
     ```
   * Save the file again
   * **Run the program in VSCode:**
     * Open the integrated terminal in VSCode: `Terminal` → `New Terminal` or press `` Ctrl+` `` (backtick) or `Ctrl+J` 
     * In the terminal, type:
       ```bash
       node test.js
       ```
     * Press Enter to run the program
   * You should see the messages printed in the VSCode terminal
   * If the output appears correctly, Node.js is installed and working properly with VSCode

---


## **Workshop 3: Installing and Verifying Docker Desktop**

### Task: Download, Install, and Verify Docker Desktop

1. **Download Docker Desktop:**
   * Visit [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
   * Download Docker Desktop for your operating system (Windows, macOS, or Linux)
   * **Note for Windows:** Docker Desktop requires WSL 2 (Windows Subsystem for Linux 2)

2. **Install Docker Desktop:**
   * Run the installer and follow the installation wizard
   * Accept the default settings
   * **Important:** After installation, you may need to restart your computer

3. **Start Docker Desktop:**
   * Launch Docker Desktop from your desktop or start menu
   * Wait for Docker Desktop to start (you'll see a Docker icon in your system tray/taskbar)
   * Make sure Docker Desktop is running before proceeding

4. **Verify Installation Using Command Line:**
   * Open your **command line** (Terminal on macOS/Linux, Command Prompt or PowerShell on Windows)
   * Check the Docker version by typing:
     ```bash
     docker --version
     ```
   * Check the Docker Compose version by typing:
     ```bash
     docker compose version
     ```
   * Both commands should display version numbers if Docker Desktop is installed and running correctly

---

## **Workshop Summary and Reflection**

At the end of the session, students should be able to:

* Explain the role of Node.js, VS Code, and Docker in automation systems
* Verify their development environment independently
* Recognize common setup and configuration issues

---

## **Self-Learning and Homework**

### **Objective**
Practice and explore the development tools you've installed to become more comfortable with them before moving to programming concepts.

---

### **Task 1: Explore Visual Studio Code** (Recommended: 30-60 minutes)

1. **Install Useful Extensions:**
   * Open VSCode and go to the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
   * Search and install the following extensions:
     * **Prettier** - Code formatter
     * **ES7+ React/Redux/React-Native snippets** - Helpful code snippets
     * **GitLens** - Git supercharged (if you use Git)
   
2. **Familiarize Yourself with VSCode Features:**
   * Practice using the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
   * Try opening files, creating folders, and navigating the file explorer
   * Learn keyboard shortcuts: [VSCode Keyboard Shortcuts Guide](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
   * Explore VSCode settings: `File` → `Preferences` → `Settings`

3. **Practice with Integrated Terminal:**
   * Open multiple terminal tabs in VSCode
   * Practice navigating directories using command line (`cd`, `dir`/`ls`, `mkdir`)

---

### **Task 2: Practice with Node.js** (Recommended: 45-90 minutes)

1. **Create More Simple Programs:**
   * Create a new folder called `node-practice` in VSCode
   * Write and run at least 3 different JavaScript programs that:
     * Print different messages
     * Perform simple calculations (addition, multiplication)
     * Use variables to store and display values
   
2. **Explore npm (Node Package Manager):**
   * Check npm version: `npm --version`
   * Explore npm commands:
     * `npm help` - See available commands
     * `npm init --help` - Learn about initializing projects
   * **Optional:** Try initializing a new project with `npm init` (press Enter to accept defaults)

3. **Read Node.js Documentation:**
   * Visit [Node.js Official Documentation](https://nodejs.org/docs/)
   * Read the "Getting Started" section
   * Familiarize yourself with basic Node.js concepts

---

### **Task 3: Explore Docker Desktop** (Recommended: 30-60 minutes)

1. **Explore Docker Desktop Interface:**
   * Open Docker Desktop and explore its dashboard
   * Check the "Containers" tab
   * Check the "Images" tab
   * Look at Docker Desktop settings

2. **Read Docker Documentation:**
   * Visit [Docker Documentation](https://docs.docker.com/)
   * Read the "Get started" guide
   * Understand basic Docker concepts (containers, images)

3. **Optional: Run Your First Container:**
   * In your terminal, try running:
     ```bash
     docker run hello-world
     ```
   * This will download and run a simple test container
   * Observe the output to understand how containers work

---

### **Task 4: Prepare for Next Week** (Recommended: 30 minutes)

1. **Research TypeScript:**
   * Visit [TypeScript Official Website](https://www.typescriptlang.org/)
   * Read "What is TypeScript?" section
   * Understand why TypeScript is used (especially in relation to JavaScript)

2. **Read About Development Workflows:**
   * Research how modern development workflows use these tools together
   * Understand the relationship between Node.js, npm, and project dependencies

---

### **Submission Guidelines**

**No submission required**, but you should:

* Complete the tasks that you find most challenging
* Take notes on any issues you encounter and how you resolved them
* Be ready to discuss your experiences in the next class
* **Important:** Make sure all three tools (VSCode, Node.js, Docker Desktop) are working correctly on your system

---

### **Troubleshooting**

If you encounter issues:

1. **Check Official Documentation:**
   * Each tool has comprehensive documentation on their official websites
   * Search for your specific error message in their documentation or support forums

2. **Common Issues:**
   * **Node.js not found:** Make sure Node.js is in your system PATH
   * **Docker Desktop won't start:** Check system requirements, especially WSL 2 on Windows
   * **VSCode terminal not working:** Check that your default shell is configured correctly

3. **Ask for Help:**
   * Note down error messages and system information
   * Be prepared to ask questions in the next class session

---

**Estimated Total Time:** 2-4 hours

**Next Week Preview:** We will start learning TypeScript programming fundamentals and control system basics!

---

**Last Updated:** 2026-01-12

---