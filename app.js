const path = require('path');
const DataSet = require('./data/dataset');
const FileReader = require('./src/io/file_reader');
const PsyMed = require('./src/psymed');
const DirectoryReader = require('./src/io/directory_reader');
const JsonWriter = require('./src/io/json_writer');

/**
 * @constant {string} input_path - Defines the path to the input document or directory to be processed.
 * This path can be configured to point to a specific file (e.g., a DOCX) or a directory
 * containing multiple documents.
 */
const input_path = path.join(__dirname, '/dataset'); // Currently configured to process a directory named 'dataset'
const output_path = path.join(__dirname, '/output');

/**
 * Processes a single document file, extracts its content, and runs it through the PsyMed pipeline.
 * Optionally visualizes the processing results.
 *
 * @async
 * @param {string} file - The full path to the document file to be processed.
 * @param {boolean} [visualize=false] - A flag indicating whether to visualize (log to console)
 * the extracted problems, therapies, relations, and BPRS scores after processing.
 * @returns {Promise<void>} A Promise that resolves when the file processing is complete, or
 * rejects if an error occurs during file reading or processing.
 */
async function process(file, visualize = false)
{
    // Read the content of the document.
    console.log(`Attempting to read file: ${file}`);
    const fileContent = await FileReader.read(file);

    // Check if content was successfully extracted.
    if (!fileContent)
    {
        console.error(`Failed to extract text from the file: ${file}. Exiting processing for this file.`);
        return; // Exit if content extraction failed for the current file.
    }

    console.log("File content extracted successfully. Processing with PsyMed...");
    // Process the extracted content using PsyMed and the loaded DataSet.
    const context = PsyMed.process(fileContent, DataSet);
    console.log("Processing complete...");

    const baseNameWithExtension = path.basename(file);
    const fileNameWithoutExtension = path.parse(baseNameWithExtension).name;
    const outputContextPath = path.join(output_path, `${fileNameWithoutExtension}.json`);
    await JsonWriter.write(context, outputContextPath);

    // If visualization is requested, call PsyMed's visualize method.
    if (visualize)
    {
        PsyMed.visualize(context);
    }
}

/**
 * Main function to orchestrate the document processing.
 * It checks if the `input_path` is a directory or a single file.
 * If it's a directory, it reads all specified document types within it and processes each.
 * If it's a single file, it processes that file directly.
 *
 * @async
 * @returns {Promise<void>} A Promise that resolves when all processing tasks are complete.
 */
async function main()
{
    // Check if the input_path points to a directory.
    if (await DirectoryReader.isDirectory(input_path))
    {
        console.log(`Input path "${input_path}" is a directory. Scanning for files...`);
        // Define the file extensions to look for within the directory.
        const extensionsToFind = ['.pdf', 'txt', '.docx'];
        // List all matching files recursively within the directory.
        const files = await DirectoryReader.list(input_path, extensionsToFind);

        if (files.length === 0)
        {
            console.log(`No files with extensions ${extensionsToFind.join(', ')} found in "${input_path}".`);
            return;
        }

        console.log(`Found ${files.length} matching files. Starting batch processing.`);
        // Process each found file.
        for (const file of files)
        {
            // Process each file without visualization in batch mode,
            // as visualizing each file individually might be too verbose.
            await process(file);
        }
        console.log("Batch processing of directory complete.");
    }
    else
    {
        // Process the single file with visualization enabled.
        await process(input_path, true);
        console.log("Single file processing complete.");
    }
}

// Start the main function execution.
// Any unhandled errors during the execution of `main()` will be caught here
// and logged to the console as critical application errors.
main().catch(error =>
{
    console.error("A critical error occurred in the application:", error);
});
