const fs = require('fs').promises; // Required for directory creation/management
const path = require('path');

const DataSet = require('../data/dataset');
const DirectoryReader = require('./src/io/directory_reader');
const FileReader = require('./src/io/file_reader');
const JsonWriter = require('./src/io/json_writer');
const PsyMed = require('./src/psymed');

/**
 * @constant {string} input_path - Defines the path to the input document or directory to be processed.
 * This path can be configured to point to a specific file (e.g., a DOCX) or a directory
 * containing multiple documents.
 * @example
 * // For a single file:
 * // const input_path = path.join(__dirname, '/dataset/person_x.docx');
 * // For a directory:
 * // const input_path = path.join(__dirname, '/dataset');
 */
const input_path = path.join(__dirname, '/../dataset'); // Currently configured to process a directory named 'dataset'

/**
 * @constant {string} output_path - Defines the path to the directory where processed JSON
 * context files will be saved.
 */
const output_path = path.join(__dirname, '/../output');

/**
 * Processes a single document file: extracts its text content, runs it through the PsyMed NLP pipeline,
 * saves the resulting context as a JSON file, and optionally visualizes the results.
 *
 * @async
 * @param {string} file - The full path to the document file to be processed.
 * @param {boolean} [visualize=false] - A flag indicating whether to visualize (log to console)
 * the extracted problems, therapies, relations, and BPRS scores after processing.
 * @returns {Promise<void>} A Promise that resolves when the file processing (reading, NLP, writing) is complete.
 * Does not reject, but logs errors internally if file reading or writing fails.
 */
async function process(file, visualize = false)
{
    console.log(`\n--- Processing file: ${file} ---`);

    // Read the content of the document.
    const fileContent = await FileReader.read(file);

    // Check if content was successfully extracted.
    if (!fileContent)
    {
        console.error(`Failed to extract text from the file: ${file}. Skipping this file.`);
        return; // Exit if content extraction failed for the current file.
    }

    console.log("Text content extracted successfully. Running PsyMed NLP...");
    // Process the extracted content using PsyMed and the loaded DataSet.
    const context = PsyMed.process(fileContent, DataSet);
    console.log("NLP processing complete.");

    // Extract filename and construct output JSON path.
    const baseNameWithExtension = path.basename(file);
    const fileNameWithoutExtension = path.parse(baseNameWithExtension).name;
    const outputContextPath = path.join(output_path, `${fileNameWithoutExtension}.json`);

    // Write the processed context object to a JSON file.
    console.log(`Saving processed context to JSON: ${outputContextPath}`);
    const writeSuccess = await JsonWriter.write(context, outputContextPath);

    if (!writeSuccess)
    {
        console.error(`Failed to write context to JSON file: ${outputContextPath}`);
        // Continue to visualization even if JSON write fails, but log the error.
    } else
    {
        console.log(`Context saved for ${file}`);
    }

    // If visualization is requested, call PsyMed's visualize method.
    if (visualize)
    {
        console.log("\n--- Visualization of Results ---");
        PsyMed.visualize(context);
        console.log("--- End Visualization ---");
    }
}

/**
 * Main function to orchestrate the document processing workflow.
 * It first ensures the output directory exists. Then, it checks if the `input_path`
 * is a directory or a single file.
 * - If it's a directory, it reads all specified document types within it and processes each.
 * - If it's a single file, it processes that file directly with visualization enabled.
 *
 * @async
 * @returns {Promise<void>} A Promise that resolves when all processing tasks are complete.
 */
async function main()
{
    console.log("Starting PsyMed Document Processor.");
    console.log(`Input Path: ${input_path}`);
    console.log(`Output Path: ${output_path}`);

    try
    {
        // Ensure the output directory exists before any files are written.
        // `recursive: true` ensures parent directories are also created if they don't exist.
        await fs.mkdir(output_path, { recursive: true });
        console.log(`Ensured output directory exists: ${output_path}`);
    } catch (error)
    {
        console.error(`Failed to create output directory "${output_path}":`, error);
        console.error("Exiting due to critical directory creation error.");
        process.exit(1); // Exit the application if we can't create the output directory.
    }


    // Check if the input_path points to a directory.
    if (await DirectoryReader.isDirectory(input_path))
    {
        console.log(`\nInput path "${input_path}" is a directory. Scanning for supported files...`);
        // Define the file extensions to look for within the directory.
        const extensionsToFind = ['.pdf', 'txt', '.docx'];
        // List all matching files recursively within the directory.
        const files = await DirectoryReader.list(input_path, extensionsToFind);

        if (files.length === 0)
        {
            console.log(`No files with extensions ${extensionsToFind.join(', ')} found in "${input_path}".`);
            console.log("Batch processing skipped.");
            return;
        }

        console.log(`Found ${files.length} matching files. Starting batch processing.`);
        // Process each found file sequentially.
        for (const file of files)
        {
            // Process each file without visualization in batch mode,
            // as visualizing each file individually might be too verbose.
            await process(file, false); // Explicitly setting visualize to false for batch mode.
        }
        console.log("\nBatch processing of directory complete.");
    }
    else
    {
        console.log(`\nInput path "${input_path}" is a single file. Starting processing...`);
        // Process the single file with visualization enabled.
        await process(input_path, true);
        console.log("\nSingle file processing complete.");
    }
}

// Start the main function execution.
// Any unhandled errors during the execution of `main()` will be caught here
// and logged to the console as critical application errors.
main().catch(error =>
{
    console.error("\n--- A critical error occurred in the application ---");
    console.error("Error details:", error);
    process.exit(1); // Exit with a non-zero code to indicate an error.
});
