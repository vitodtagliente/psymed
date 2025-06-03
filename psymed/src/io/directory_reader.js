const fs = require('fs').promises; // Use the promise-based version of fs for async/await
const path = require('path');

class DirectoryReader
{
    /**
     * Checks if a given path points to a directory.
     *
     * @async
     * @param {string} filePath - The path to check (can be a file or a directory).
     * @returns {Promise<boolean>} A promise that resolves to `true` if the path is a directory,
     * `false` if it's a file or other type of entry, or `false` if the path does not exist.
     */
    static async isDirectory(filePath)
    {
        try
        {
            // Get file system statistics for the given path.
            const stats = await fs.stat(filePath);

            // The `isDirectory()` method of the `fs.Stats` object returns true if it's a directory.
            return stats.isDirectory();
        } 
        catch (error)
        {
            // Handle common errors:
            // 'ENOENT' (Error NO ENTry) means the file or directory does not exist.
            if (error.code === 'ENOENT')
            {
                console.log(`Path does not exist: "${filePath}"`);
                return false; // Path does not exist, so it's not a directory.
            }
            // Log other unexpected errors.
            console.error(`Error checking path "${filePath}": ${error.message}`);
            return false; // Return false for other errors as well, or re-throw if preferred.
        }
    }

    /**
     * Recursively retrieves a list of files from a given directory and its subdirectories,
     * filtering them by specified file extensions.
     *
     * @async
     * @param {string} directoryPath - The absolute or relative path to the directory to scan.
     * @param {string[]} allowedExtensions - An array of file extensions (e.g., ['.pdf', '.txt', '.docx'])
     * to include in the results. Case-insensitive.
     * @returns {Promise<string[]>} A promise that resolves to an array of full paths to the
     * matching files.
     */
    static async list(directoryPath, allowedExtensions)
    {
        // Normalize allowed extensions to lowercase and ensure they start with a dot.
        const normalizedExtensions = allowedExtensions.map(ext =>
            ext.startsWith('.') ? ext.toLowerCase() : `.${ext.toLowerCase()}`
        );

        let foundFiles = [];

        try
        {
            // Read the contents of the directory. withFileTypes: true gives Dirent objects
            // which allow checking if an entry is a file or directory without an extra stat call.
            const entries = await fs.readdir(directoryPath, { withFileTypes: true });

            for (const entry of entries)
            {
                const fullPath = path.join(directoryPath, entry.name);

                if (entry.isDirectory())
                {
                    // If it's a directory, recursively call this function and add its results.
                    const subDirFiles = await listFilteredFiles(fullPath, allowedExtensions);
                    foundFiles = foundFiles.concat(subDirFiles);
                }
                else if (entry.isFile())
                {
                    // If it's a file, check its extension.
                    const fileExtension = path.extname(entry.name).toLowerCase();
                    if (normalizedExtensions.includes(fileExtension))
                    {
                        foundFiles.push(fullPath);
                    }
                }
                // Ignore other types of entries (e.g., symbolic links) for this specific request.
            }
        }
        catch (error)
        {
            console.error(`Error processing directory "${directoryPath}": ${error.message}`);
            // Depending on requirements, you might want to re-throw the error or return an empty array.
            // For this example, we'll just log and continue.
        }

        return foundFiles;
    }
}

module.exports = DirectoryReader;