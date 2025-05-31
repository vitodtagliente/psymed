const Text = require("../utils/text");
const Token = require("./token");
const Pattern = require("./pattern");
const Entity = require("./entity"); // Make sure Entity is imported

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
     * Checks if a specific index in the sentence's tokens is affected by a negation prefix.
     * @param {number} startIndex - The starting index of the entity in this.tokens.
     * @param {string[]} negationPrefixes - Array of words that act as negation prefixes.
     * @param {string[]} terminationPhrases - Array of words that terminate a negation span.
     * @param {string[]} pseudoNegations - Array of words that might look like negations but aren't always.
     * @returns {boolean} True if a negation prefix affects the entity, false otherwise.
     */
    isNegatedByPrefix(startIndex, negationPrefixes, terminationPhrases, pseudoNegations)
    {
        // Check backwards from the start of the entity
        for (let i = startIndex - 1; i >= 0; i--)
        {
            const currentTokenName = this.tokens[i].name; // Use stemmed name for comparison

            // If we hit a termination phrase, the negation effect stops before the entity
            if (terminationPhrases.includes(currentTokenName))
            {
                return false;
            }
            // If we find a negation prefix
            if (negationPrefixes.includes(currentTokenName))
            {
                // Double-check for pseudo-negations
                if (!pseudoNegations.includes(currentTokenName))
                {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Checks if a specific index in the sentence's tokens is affected by a negation suffix.
     * @param {number} endIndex - The ending index of the entity in this.tokens.
     * @param {string[]} negationSuffixes - Array of words that act as negation suffixes.
     * @param {string[]} terminationPhrases - Array of words that terminate a negation span.
     * @param {string[]} pseudoNegations - Array of words that might look like negations but aren't always.
     * @returns {boolean} True if a negation suffix affects the entity, false otherwise.
     */
    isNegatedBySuffix(endIndex, negationSuffixes, terminationPhrases, pseudoNegations)
    {
        // Check forwards from the end of the entity
        for (let i = endIndex + 1; i < this.tokens.length; i++)
        {
            const currentTokenName = this.tokens[i].name; // Use stemmed name for comparison

            // If we hit a termination phrase, the negation effect stops after the entity
            if (terminationPhrases.includes(currentTokenName))
            {
                return false;
            }
            // If we find a negation suffix
            if (negationSuffixes.includes(currentTokenName))
            {
                // Double-check for pseudo-negations
                if (!pseudoNegations.includes(currentTokenName))
                {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Finds entities within the sentence based on a list of patterns and assigns them a label.
     * This method searches for exact sequential matches of the provided patterns.
     * It also checks for negation based on provided negation rules.
     *
     * @param {Pattern[]} patterns - An array of Pattern objects to search for.
     * @param {string} label - The label to assign to the found entities (e.g., "PERSON", "LOCATION").
     * @param {object} negationRules - An object containing arrays for negation detection.
     * @param {string[]} negationRules.negationPrefixes - Words that negate preceding entities (e.g., "no", "non").
     * @param {string[]} negationRules.negationSuffixes - Words that negate succeeding entities (e.g., "without").
     * @param {string[]} negationRules.terminationPhrases - Words that stop a negation span (e.g., "but", "however").
     * @param {string[]} negationRules.pseudoNegations - Words that look like negations but aren't always (e.g., "little", "few").
     * @returns {Entity[]} An array of Entity objects found in the sentence.
     */
    findEntities(patterns, label, negationRules = {})
    {
        const foundEntities = [];

        // Destructure negation rules for easier access, providing defaults
        const {
            negationPrefixes = [],
            negationSuffixes = [],
            terminationPhrases = [],
            pseudoNegations = []
        } = negationRules;

        const sentenceStemmedNames = this.tokens.map(token => token.name);

        for (const pattern of patterns)
        {
            if (pattern.tokens.length === 0 || this.tokens.length < pattern.tokens.length)
            {
                continue;
            }

            const patternStemmedNames = pattern.tokens.map(token => token.name);

            for (let i = 0; i <= sentenceStemmedNames.length - patternStemmedNames.length; i++)
            {
                let matchFound = true;
                let matchedOriginalTokens = [];

                for (let j = 0; j < patternStemmedNames.length; j++)
                {
                    if (sentenceStemmedNames[i + j] !== patternStemmedNames[j])
                    {
                        matchFound = false;
                        break;
                    }
                    matchedOriginalTokens.push(this.tokens[i + j].text);
                }

                if (matchFound)
                {
                    const entityText = matchedOriginalTokens.join(" ");
                    const entity = new Entity(entityText, label);

                    // Determine the start and end index of the matched entity within the sentence's tokens
                    const entityStartIndex = i;
                    const entityEndIndex = i + pattern.tokens.length - 1;

                    // Check for negation
                    entity.isNegated = this.isNegatedByPrefix(entityStartIndex, negationPrefixes, terminationPhrases, pseudoNegations) ||
                        this.isNegatedBySuffix(entityEndIndex, negationSuffixes, terminationPhrases, pseudoNegations);

                    foundEntities.push(entity);
                }
            }
        }
        return foundEntities;
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
        if (pattern.tokens.length === 0)
        {
            return true;
        }
        if (this.tokens.length < pattern.tokens.length)
        {
            return false;
        }
        const sentenceStemmedNames = this.tokens.map(token => token.name);
        const patternStemmedNames = pattern.tokens.map(token => token.name);

        for (let i = 0; i <= sentenceStemmedNames.length - patternStemmedNames.length; i++)
        {
            let matchFound = true;
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
                return true;
            }
        }
        return false;
    }
}

module.exports = Sentence;