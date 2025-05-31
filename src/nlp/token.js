const Text = require("../utils/text");

/**
 * Represents a tokenized word, storing both its original form and its stemmed version.
 */
class Token
{
    /**
     * Creates an instance of Token.
     * @param {string} text - The original text of the token.
     */
    constructor(text)
    {
        /**
         * The stemmed version of the token's text.
         * @type {string}
         */
        this.name = Text.stemItalian(text);

        /**
         * The original text of the token.
         * @type {string}
         */
        this.text = text;
    }
}

module.exports = Token;