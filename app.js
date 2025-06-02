const path = require('path');
const DataSet = require('./data/dataset');
const FileReader = require('./src/io/file_reader');
const PsyMed = require('./src/psymed');

/**
 * Main function to process a medical document using PsyMed.
 * It reads a document, extracts content, and then processes it.
 */
async function main() {
    // Define the path to the medical document.
    const filePath = path.join(__dirname, '/docs/ubaldini_ubaldo.docx');
    
    // Read the content of the document.
    console.log(`Attempting to read file: ${filePath}`);
    const fileContent = await FileReader.read(filePath);

    // Check if content was successfully extracted.
    if (!fileContent) {
        console.error("Failed to extract text from the file. Exiting.");
        return;
    }

    console.log("File content extracted successfully. Processing with PsyMed...");
    // Process the extracted content using PsyMed and the DataSet.
    const context = PsyMed.process(fileContent, DataSet);
    console.log("Processing complete...");

    PsyMed.visualize(context);
}

// Start the main function and catch any critical errors.
main().catch(error => {
    console.error("A critical error occurred in the application:", error);
});