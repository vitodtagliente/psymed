const sentenceBoundaryDetector = require('sbd');
// Import WordTokenizer to split text into words
// Import StemmerId for Italian stemming
const { WordTokenizer, StemmerId } = require('natural');

/**
 * @class Text
 * @description Provides static utility methods for text processing, including sentence tokenization,
 * text normalization, and Italian stemming.
 */
class Text
{
    /**
     * Normalizes the text by removing non-essential characters and converting to lowercase.
     * It preserves Italian accented letters and apostrophes, which are crucial for the language.
     * @param {string} text - The text to be normalized.
     * @returns {string} The normalized text.
     */
    static normalize(text)
    {
        // This regex removes anything that is not:
        // - Lowercase letters from 'a' to 'z'
        // - Numbers from '0' to '9'
        // - Italian accented letters (àèéìòùáéíóúç)
        // - Apostrophe (')
        // - Hyphen (-) (useful for compound words or specific medical terms)
        // All other characters are replaced with a space.
        return text.toLowerCase().replace(/[^a-z0-9àèéìòùáéíóúç' -]/g, ' ');
    }

    /**
     * Applies stemming to words within a given string (which can be a single word or a phrase).
     * Utilizes Natural's Italian stemmer.
     * @param {string} text - The word or phrase to be stemmed.
     * @returns {string} The string with stemmed words, rejoined by spaces.
     */
    static stemItalian(text)
    {
        // Splits the string into words, applies the stemmer to each word,
        // and then rejoins the stemmed words into a single string.
        const stemmedWords = Text.tokenize(text).map(word => StemmerId.stem(word));
        return stemmedWords.join(' ');
    }

    /**
     * Tokenizes the input text into individual tokens.
     * @param {string} text - The text to be tokenized.
     * @returns {string[]} An array of tokens.
     */
    static tokenize(text)
    {
        const tokenizer = new WordTokenizer();
        return tokenizer.tokenize(text);
    }

    /**
     * Tokenizes the input text into individual sentences.
     * Leverages the 'sbd' library for robust sentence boundary detection.
     * @param {string} text - The text to be tokenized.
     * @returns {string[]} An array of sentences.
     */
    static tokenizeSentences(text)
    {
        // sbd (sentence boundary detector) is excellent for sentence tokenization.
        return sentenceBoundaryDetector.sentences(text, {
            newline_boundaries: true, // Treat newlines as sentence boundaries
            sanitize: true, // Remove non-printable control characters
            allowed_tags: [] // We don't expect HTML tags in this context
        });
    }
}

module.exports = Text;