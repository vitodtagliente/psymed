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
   * Escapes special characters in a string to be used safely within a regular expression.
   * @param {string} string - The string to escape.
   * @returns {string} The escaped string.
   */
    static escapeRegExp(string)
    {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    /**
     * Normalizes a given text string by converting it to lowercase,
     * converting accented characters to their unaccented equivalents,
     * and replacing non-alphanumeric characters (excluding apostrophes and hyphens) with spaces.
     * Multiple spaces are then consolidated into single spaces, and leading/trailing spaces are trimmed.
     *
     * This function ensures that text is in a consistent format for further processing,
     * addressing issues like variations in accentuation.
     *
     * @param {string} text - The input text string to normalize.
     * @returns {string} The normalized text string.
     */
    static normalize(text)
    {
        // Convert the entire text to lowercase to ensure case-insensitivity.
        let normalizedText = text.toLowerCase();

        // Step 1: Normalize accented characters to their base unaccented counterparts.
        // `normalize("NFD")` decomposes characters into their base form and diacritical marks.
        // `replace(/[\u0300-\u036f]/g, "")` then removes these diacritical marks.
        // This will convert 'à' to 'a', 'è' to 'e', 'ì' to 'i', 'ò' to 'o', 'ù' to 'u',
        // and also 'á', 'é', 'í', 'ó', 'ú' to their unaccented forms.
        normalizedText = normalizedText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Step 2: Remove/replace characters that are not:
        // - Lowercase letters from 'a' to 'z' (now including unaccented versions of original accented letters)
        // - Numbers from '0' to '9'
        // - Apostrophe (') - essential for Italian elision (e.g., "l'uomo")
        // - Hyphen (-) - useful for compound words or specific medical terms (e.g., "post-traumatico")
        // All other characters are replaced with a single space.
        // The 'ç' character is not explicitly handled here as it's less common in standard Italian text
        // and would typically be removed by this general regex if not explicitly included.
        normalizedText = normalizedText.replace(/[^a-z0-9' -]/g, ' ');

        // Step 3: Replace multiple spaces with a single space and trim leading/trailing spaces.
        normalizedText = normalizedText.replace(/\s+/g, ' ').trim();

        return normalizedText;
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
        return tokenizer.tokenize(Text.normalize(text));
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
        }).map(sentence => Text.normalize(sentence));
    }
}

module.exports = Text;