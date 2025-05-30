const stringSimilarity = require('string-similarity');

/**
 * @class Word
 * @description Provides a utility function to calculate the similarity between two words or phrases.
 * The similarity is expressed as an accuracy score (0 to 1), where 1 means identical.
 * This uses a string comparison algorithm (like Sørensen–Dice coefficient, which is robust for this purpose).
 */
class Word
{
    /**
   * Calculates the similarity accuracy between two input strings.
   * A higher score (closer to 1) indicates greater similarity.
   *
   * @param {string} word1 - The first word or phrase to compare.
   * @param {string} word2 - The second word or phrase to compare.
   * @param {number} [minAccuracy=0] - Optional. A minimum similarity score (between 0 and 1) required.
   * If the calculated similarity is less than this value, the function returns 0.
   * @returns {number} A similarity score between 0 and 1.
   * 0 means no similarity (or below `minAccuracy`), 1 means identical.
   * Returns 0 if either input is not a string or is empty after trimming.
   */
    static checkSimilarityByAccuracy(word1, word2, minAccuracy = 0)
    {
        // Basic input validation
        if (typeof word1 !== 'string' || typeof word2 !== 'string')
        {
            console.error("Error: Both inputs must be strings for similarity comparison.");
            return 0;
        }

        const trimmedWord1 = word1.trim();
        const trimmedWord2 = word2.trim();

        // Handle empty strings after trimming
        if (trimmedWord1 === '' || trimmedWord2 === '')
        {
            // If both are empty, they are identical. If one is empty, they are not similar.
            return trimmedWord1 === trimmedWord2 ? 1 : 0;
        }

        // Use the string-similarity library's compareTwoStrings function
        // This function returns a score between 0 and 1.
        const similarityScore = stringSimilarity.compareTwoStrings(trimmedWord1, trimmedWord2);

        // Apply the minimum accuracy threshold
        if (similarityScore < minAccuracy)
        {
            return 0; // Not similar enough based on the provided threshold
        }

        return similarityScore;
    }

    /**
     * A wrapper function to get the similarity as a percentage.
     *
     * @param {string} word1 - The first word or phrase to compare.
     * @param {string} word2 - The second word or phrase to compare.
     * @param {number} [minAccuracyPercentage=0] - Optional. A minimum similarity percentage (between 0 and 100) required.
     * If the calculated similarity is less than this value, the function returns 0.
     * @returns {number} A similarity score as a percentage (0 to 100).
     */
    static checkSimilarityByAccuracyPercentage(word1, word2, minAccuracyPercentage = 0)
    {
        // Convert percentage threshold to a 0-1 score for the underlying function
        const minAccuracyScore = minAccuracyPercentage / 100;
        const score = WordSimilarityChecker.checkSimilarityByAccuracy(word1, word2, minAccuracyScore);
        return parseFloat((score * 100).toFixed(2)); // Convert to percentage and round to 2 decimal places
    }

    /**
     * Checks if two words are similar based on a minimum accuracy threshold.
     *
     * @param {string} word1 - The first word or phrase to compare.
     * @param {string} word2 - The second word or phrase to compare.
     * @param {number} [minAccuracy=0] - Optional. The minimum similarity score (between 0 and 1) required for words to be considered similar.
     * @returns {boolean} True if the words are similar enough (score >= minAccuracy), false otherwise.
     */
    static checkSimilarity(word1, word2, minAccuracy = 0)
    {
        const similarityScore = WordSimilarityChecker.checkSimilarityByAccuracy(word1, word2);
        return similarityScore >= minAccuracy;
    }
}

module.exports = Word;