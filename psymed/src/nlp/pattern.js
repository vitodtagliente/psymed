const Text = require("../utils/text");
const Token = require("./token");

/**
 * Represents a pattern of text, broken down into an array of tokens.
 */
class Pattern
{
    /**
     * Creates an instance of Pattern.
     * @param {string} text - The original text that forms the pattern.
     */
    constructor(text)
    {
        /**
         * An array of Token objects representing the individual words in the pattern.
         * Each token stores both its original form and its stemmed version.
         * @type {Token[]}
         */
        this.tokens = [];

        /**
         * The original text string of the pattern.
         * @type {string}
         */
        this.text = text;

        // Tokenize the input text and create Token objects for each.
        const _tokens = Text.tokenize(text);
        for (const _token of _tokens)
        {
            this.tokens.push(new Token(_token));
        }
    }

    /**
     * Creates an array of Pattern instances from an array of text strings.
     * This is a static helper method to easily convert multiple raw text patterns into Pattern objects.
     * @param {string[]} text_patterns - An array of text strings, where each string represents a pattern.
     * @returns {Pattern[]} An array of Pattern objects.
     */
    static map(text_patterns)
    {
        return text_patterns.map(text => new Pattern(text));
    }
}

module.exports = Pattern;