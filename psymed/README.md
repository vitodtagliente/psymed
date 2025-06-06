# Psymed Console Application

The Psymed Console Application is a powerful Node.js-based tool designed to perform Natural Language Processing (NLP) analysis on clinical text files. It extracts relevant entities, computes psychiatric scores (BPRS and GAF), and generates structured JSON output files. These generated files are specifically designed to be consumed and visualized by the Psymed Visualizer application.

## Features

* **NLP Analysis:** Processes text files to identify and extract clinical entities and relevant information.
* **BPRS Score Calculation:** Computes the Brief Psychiatric Rating Scale (BPRS) score based on extracted clinical data.
* **GAF Score Calculation:** Determines the Global Assessment of Functioning (GAF) score, providing an overall measure of psychological, social, and occupational functioning.
* **JSON Output Generation:** Produces clean, structured JSON files containing all extracted entities and computed scores, ready for further analysis or visualization.
* **Configurable Data:** Utilizes external JSON configuration files (e.g., `data-ita.json`) to define clinical dictionaries, natural language rules, and scoring parameters.

## Configuration

The core behavior of the Psymed Console Application is defined in its `index.js` file and by external data files.

* **Output Path (`output_path`):** This constant specifies where the generated JSON context files will be saved after processing. As configured in `index.js`, the output files are directed to the `bin` directory:

    ```javascript
    const output_path = path.join(__dirname, '/../bin');
    ```

* **Processing Data (`Data`):** The application uses an external JSON file to define the dictionaries of clinical words, natural language words, and configurations for BPRS and GAF computing. This data is loaded as shown in `index.js`:

    ```javascript
    const Data = require('../data/data-ita');
    ```

    This means the application relies on the `data-ita.json` file, typically located in `[project_root]/data/`, for its processing logic. This file can be managed and updated using the Psymed Editor App.

## Getting Started

Follow these instructions to set up and run the Psymed Console Application on your local machine.

### Prerequisites

You need to have Node.js and npm (Node Package Manager) installed on your machine. You can download them from the official Node.js website.

* [Node.js (includes npm)](https://nodejs.org/en/download/)

### Installation

1.  **Clone or Download:** Obtain the project files (e.g., by cloning the Git repository or downloading the archive).
2.  **Navigate to Project Directory:** Open your terminal or command prompt and navigate to the root directory of the Psymed Console Application.
3.  **Install Dependencies:** Run the following command to install all required Node.js packages:

    ```bash
    npm install
    ```

### Updating the Application

To ensure you have the latest features and bug fixes, you can update the application's dependencies:

```bash
npm update

```

## Updating the Application

To ensure you have the latest features and bug fixes, you can update the application's dependencies:

```bash
npm update
```

If there are significant changes or new major versions of dependencies, you might consider clearing your node_modules and reinstalling:

```bash
rm -rf node_modules
npm install
```

## Starting the Application
Once the dependencies are installed, you can start the the development server:

```bash
npm start
This will typically open the application in your default web browser at http://localhost:4000.
```