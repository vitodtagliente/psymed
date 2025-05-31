const Text = require("../utils/text");
const Token = require("./token");
const Entity = require("./entity"); // Assuming Entity class is in a separate file like ./entity.js
const Pattern = require("./pattern"); // Assuming Pattern class is in a separate file like ./pattern.js

/**
 * Represents a sentence, breaking it down into an array of tokens and providing methods for sentence-level operations.
 */
class Sentence
{
    /**
     * Creates an instance of Sentence.
     * @param {string} text - The original text of the sentence.
     */
    constructor(text)
    {
        /**
         * An array of Token objects representing the individual words in the sentence.
         * Each token stores both its original form and its stemmed version.
         * @type {Token[]}
         */
        this.tokens = [];

        /**
         * The original text string of the sentence.
         * @type {string}
         */
        this.text = text;

        // Tokenize the input text and create Token objects for each word.
        const _tokens = Text.tokenize(text);
        for (const _token of _tokens)
        {
            this.tokens.push(new Token(_token));
        }
    }

    /**
     * Identifies entities within the sentence based on a list of patterns.
     * For each pattern that exactly matches a sequence of tokens in the sentence,
     * an Entity object is created with the specified label.
     *
     * @param {Pattern[]} patterns - An array of Pattern objects to search for.
     * @param {string} label - The label to assign to the entities found (e.g., "PRODUCT", "PERSON").
     * @returns {Entity[]} An array of Entity objects found in the sentence.
     */
    findEntities(patterns, label)
    {
        const entities = [];
        const sentenceStemmedNames = this.tokens.map(token => token.name);

        for (const pattern of patterns)
        {
            // If the pattern is empty, it can't define a concrete entity in the sentence.
            if (pattern.tokens.length === 0)
            {
                continue;
            }

            // If the sentence is shorter than the pattern, an exact sequential match is impossible.
            if (this.tokens.length < pattern.tokens.length)
            {
                continue;
            }

            const patternStemmedNames = pattern.tokens.map(token => token.name);

            // Iterate through the sentence's stemmed tokens to find a potential starting point
            for (let i = 0; i <= sentenceStemmedNames.length - patternStemmedNames.length; i++)
            {
                let matchFound = true;
                // Compare the current segment of the sentence with the pattern.
                for (let j = 0; j < patternStemmedNames.length; j++)
                {
                    if (sentenceStemmedNames[i + j] !== patternStemmedNames[j])
                    {
                        matchFound = false;
                        break;
                    }
                }

                if (matchFound)
                {
                    // If a match is found, extract the original text of the entity from the sentence.
                    // We need the original text, not the stemmed version.
                    const entityTokens = this.tokens.slice(i, i + pattern.tokens.length);
                    const entityText = entityTokens.map(token => token.text).join(" "); // Reconstruct original text

                    // Create and add the new Entity
                    entities.push(new Entity(entityText, label));
                }
            }
        }
        return entities;
    }

    /**
     * Identifies individual sentences within a larger block of text.
     * @param {string} text - The input text to be segmented into sentences.
     * @returns {Sentence[]} An array of Sentence objects, each representing a distinct sentence.
     */
    static identify(text)
    {
        let sentences = [];
        const _sentences = Text.tokenizeSentences(text);
        for (let _sentence of _sentences)
        {
            sentences.push(new Sentence(_sentence));
        }
        return sentences;
    }

    /**
     * Checks if this sentence contains the exact sequential match of a given pattern's stemmed tokens.
     * This means the pattern's tokens must appear in the sentence in the same order.
     *
     * @param {Pattern} pattern - The pattern to match against this sentence.
     * @returns {boolean} True if the exact sequential pattern is found, false otherwise.
     */
    match(pattern)
    {
        // If the pattern is empty, it's considered to match any sentence.
        if (pattern.tokens.length === 0)
        {
            return true;
        }

        // If the sentence is shorter than the pattern, an exact sequential match is impossible.
        if (this.tokens.length < pattern.tokens.length)
        {
            return false;
        }

        // Extract the stemmed names of tokens for simpler comparison.
        // This avoids repeatedly accessing `.name` inside the loops.
        const sentenceStemmedNames = this.tokens.map(token => token.name);
        const patternStemmedNames = pattern.tokens.map(token => token.name);

        // Iterate through the sentence's stemmed tokens to find a potential starting point
        // for the pattern. The loop runs until there are enough remaining tokens in the sentence
        // to accommodate the entire pattern.
        for (let i = 0; i <= sentenceStemmedNames.length - patternStemmedNames.length; i++)
        {
            let matchFound = true; // Assume a match is found until proven otherwise

            // Compare the current segment of the sentence with the entire pattern.
            for (let j = 0; j < patternStemmedNames.length; j++)
            {
                // If a stemmed token in the sentence segment does not match
                // the corresponding stemmed token in the pattern, then this is not a match.
                if (sentenceStemmedNames[i + j] !== patternStemmedNames[j])
                {
                    matchFound = false; // Set flag to false
                    break; // Exit the inner loop, this segment doesn't match
                }
            }

            // If the inner loop completed without setting matchFound to false,
            // it means the entire pattern sequence was found.
            if (matchFound)
            {
                return true; // An exact sequential match was found.
            }
        }

        // If no exact sequential match was found after checking all possible starting points.
        return false;
    }
}

module.exports = Sentence;