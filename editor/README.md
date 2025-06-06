# Psymed Editor App

This application is a powerful editor designed to manage and configure the linguistic and scoring data used by the Psymed NLP analysis system. It allows users to modify clinical word dictionaries, natural language dictionaries, and the specific configurations for BPRS (Brief Psychiatric Rating Scale) and GAF (Global Assessment of Functioning) computations.

## Features

* **Edit Core Data:** Directly modify dictionaries of clinical terms and natural language words used by the NLP engine.
* **Configure Scoring:** Adjust the parameters and rules for calculating BPRS and GAF scores, ensuring accuracy and relevance to your specific needs.
* **Flexible Data Handling:** Start from an existing configuration file or create a brand new one from scratch.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (Node Package Manager) installed on your machine. You can download them from the official Node.js website.

* [Node.js (includes npm)](https://nodejs.org/en/download/)

### Installation

To install the necessary dependencies, navigate to the project directory in your terminal and run:

```bash
npm install
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