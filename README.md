# Psymed

---

## Project Description

Psymed is a powerful Node.js application designed to streamline the analysis of medical documents. It intelligently **reads medical texts**, identifies and **extracts key entities** like medical problems, and then uses this information to **generate a BPRS (Brief Psychiatric Rating Scale)**. This automation helps in quickly synthesizing crucial patient data, aiding medical professionals in their assessment and documentation processes.

---

This application suite is composed of **three interconnected projects** designed to process, visualize, and edit structured JSON documents.  

## Projects Overview

### 1. **psymed**  
This module handles **document processing**.  
- It watches the `dataset` directory for input files (e.g., raw documents).
- It generates processed JSON output files into the `bin` directory.

### 2. **visualizer**  
A **web application** for uploading and **graphically visualizing** the JSON output produced by `psymed`.

### 3. **editor**  
An intuitive **dictionary editor** that allows users to create and modify dictionaries used by the `psymed` processor.

---

## Commands

### 🛠 Install Dependencies  
To install all dependencies for the three apps, run:

```bash
node install.js
```

---

### 🚀 Development Mode  
To start all three apps in development mode:

```bash
node start-dev.js
```

- In this mode, changes to the `dataset` folder are **automatically detected**.
- Files are **reprocessed automatically** when modified.

---

### 📦 Production Mode  
To start all apps in normal (production) mode:

```bash
node start.js
```

- In this mode, changes to the `dataset` folder are **not automatically processed**.
- You must **manually restart** the app to process any new or updated files.

---

## Folder Structure

```
/dataset       # Input files for processing (used by psymed)
/data          # Input data configuration (used by psymed)
/bin           # Output folder for generated JSON documents
/psymed        # Document processor
/visualizer    # Web app for JSON visualization
/editor        # Web app for editing dictionaries
```

---

## License

[MIT](LICENSE)