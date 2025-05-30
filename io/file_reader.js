const fs = require('fs').promises; // Use promise-based fs for async/await
const mammoth = require('mammoth');
const path = require('path');
const pdf = require('pdf-parse');

/**
 * Reads the text content from a DOCX file.
 * It uses the 'mammoth' library to extract raw text, preserving basic formatting.
 *
 * @param {string} filePath - The absolute or relative path to the DOCX file.
 * @returns {Promise<string|null>} A promise that resolves with the extracted text content, or null if an error occurs or no text is found.
 */
async function readDocx(filePath)
{
    try
    {
        // Check if the file exists and is accessible
        await fs.access(filePath);

        // mammoth.extractRawText() is simpler for basic text extraction.
        // Use mammoth.extractText() if you need HTML-formatted content.
        const result = await mammoth.extractRawText({ path: filePath });

        // 'mammoth' returns an object with 'value' (the text) and 'messages' (warnings/errors)
        const text = result.value;
        const messages = result.messages;

        if (messages.length > 0)
        {
            console.warn(`Warnings during DOCX extraction from (${filePath}):`, messages);
        }

        if (!text || text.trim() === '')
        {
            console.warn(`DOCX file (${filePath}) might be empty or contain no extractable text.`);
            return null;
        }

        return text;
    }
    catch (error)
    {
        if (error.code === 'ENOENT')
        {
            console.error(`Error: DOCX file not found at path: ${filePath}`);
        }
        else
        {
            console.error(`Error extracting text from DOCX (${filePath}):`, error);
        }
        return null;
    }
}

/**
 * Reads the text content from a PDF file.
 * It uses the 'pdf-parse' library to extract text from the PDF buffer.
 *
 * @param {string} filePath - The absolute or relative path to the PDF file.
 * @returns {Promise<string|null>} A promise that resolves with the extracted text content, or null if an error occurs.
 */
async function readPdf(filePath)
{
    try
    {
        // Read the PDF file into a buffer
        const dataBuffer = await fs.readFile(filePath);
        // Parse the buffer to extract text
        const data = await pdf(dataBuffer);
        return data.text;
    }
    catch (error)
    {
        console.error(`Error reading the PDF file (${filePath}):`, error);
        return null;
    }
}

/**
 * A utility class for reading content from various file types.
 * Supports PDF, DOCX, and general text files.
 */
class FileReader
{
    /**
     * Reads the content of a file based on its extension.
     *
     * @param {string} filePath - The absolute or relative path to the file.
     * @returns {Promise<string|Buffer|null>} A promise that resolves with the file content.
     * - For .pdf and .docx, it returns a string (extracted text).
     * - For other file types, it returns a Buffer (raw file content).
     * - Returns null if an error occurs during reading.
     */
    static async read(filePath)
    {
        console.log(`Loading file: ${filePath}`);
        const fileExtension = path.extname(filePath).toLowerCase();

        if (fileExtension === '.pdf')
        {
            return await readPdf(filePath);
        }
        else if (fileExtension === '.docx')
        {
            return await readDocx(filePath);
        }
        else
        {
            // For any other file type, read it as a raw buffer.
            // You might want to add specific handling for common text files (e.g., .txt, .json)
            // to return them as strings if appropriate, by adding 'utf8' encoding to readFile.
            try
            {
                return await fs.readFile(filePath);
            }
            catch (error)
            {
                if (error.code === 'ENOENT')
                {
                    console.error(`Error: File not found at path: ${filePath}`);
                }
                else
                {
                    console.error(`Error reading generic file (${filePath}):`, error);
                }
                return null;
            }
        }
    }
}

module.exports = FileReader;