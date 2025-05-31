const Text = require("../utils/text"); // Assuming Text.js is in the correct path

/**
 * Represents a tokenized word, storing both its original form and its stemmed version.
 * This class is used to maintain the raw text alongside its processed (stemmed) form
 * for NLP tasks.
 */
class Token
{
    /**
     * Creates an instance of Token.
     * The `name` property (stemmed version) is generated using `Text.stemItalian`.
     *
     * @param {string} text - The original text of the token (e.g., "condizioni", "miglioramento").
     */
    constructor(text)
    {
        /**
         * The original text of the token as it appeared in the input string.
         * @type {string}
         */
        this.text = text;

        /**
         * The stemmed version of the token's text. This is typically a normalized
         * form used for matching keywords, reducing words to their root form.
         * @type {string}
         */
        this.name = Text.stemItalian(text);
    }

    /**
     * Returns a string representation of the Token object for debugging or logging.
     * It displays both the original text and its stemmed form.
     * @returns {string} A formatted string describing the token.
     */
    toString()
    {
        return `Token { text: "${this.text}", name: "${this.name}" }`;
    }
}

module.exports = Token;
