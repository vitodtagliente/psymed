const fs = require('fs').promises;
const path = require('path');

/**
 * @class JsonWriter
 * @description
 * A utility class providing static methods to write JavaScript objects into JSON files.
 * It handles the conversion of objects to JSON strings and the asynchronous file writing process.
 */
class JsonWriter
{
    /**
     * Asynchronously writes a given JavaScript object to a specified file path as a pretty-printed JSON string.
     *
     * @static
     * @async
     * @param {object} data - The JavaScript object that needs to be serialized and written to the file.
     * @param {string} filePath - The full path to the target JSON file, including its name and `.json` extension.
     * @returns {Promise<boolean>} A Promise that resolves to `true` if the data was successfully written to the file,
     * or `false` if an error occurred during the process (e.g., file system error, invalid path).
     * @example
     * // Example usage:
     * const myObject = { key: 'value', number: 123 };
     * const outputPath = './data/output.json';
     *
     * // Ensure the directory exists before writing
     * await fs.mkdir(path.dirname(outputPath), { recursive: true });
     *
     * if (await JsonWriter.write(myObject, outputPath)) {
     * console.log('JSON data saved successfully.');
     * } else {
     * console.error('Failed to save JSON data.');
     * }
     */
    static async write(data, filePath)
    {
        try
        {
            // 1. Convert the JavaScript object to a JSON string.
            // The third argument (2) to JSON.stringify is for pretty-printing (indentation).
            // This makes the output JSON file human-readable with a 2-space indentation.
            // Omit it or use 0 for a compact (minified) JSON output.
            const jsonString = JSON.stringify(data, null, 2);

            // 2. Write the JSON string to the specified file.
            // 'utf8' is the standard character encoding for text files, ensuring proper character representation.
            await fs.writeFile(filePath, jsonString, 'utf8');

            console.log(`Successfully wrote data to ${filePath}`);
            return true; // Indicate success
        }
        catch (error)
        {
            // Log any errors that occur during stringification or file writing.
            console.error(`Error writing JSON to file ${filePath}:`, error);
            return false; // Indicate failure
        }
    }
}

module.exports = JsonWriter;
