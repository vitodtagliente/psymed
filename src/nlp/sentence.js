const Text = require("../utils/text");
const Token = require("./token");
const Pattern = require("./pattern");
const Entity = require("./entity");

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

    // ... (isNegatedByPrefix and isNegatedBySuffix methods as before) ...

    isNegatedByPrefix(startIndex, negationPrefixes, terminationPhrases, pseudoNegations)
    {
        for (let i = startIndex - 1; i >= 0; i--)
        {
            const currentTokenName = this.tokens[i].name;
            if (terminationPhrases.includes(currentTokenName))
            {
                return false;
            }
            if (negationPrefixes.includes(currentTokenName))
            {
                if (!pseudoNegations.includes(currentTokenName))
                {
                    return true;
                }
            }
        }
        return false;
    }

    isNegatedBySuffix(endIndex, negationSuffixes, terminationPhrases, pseudoNegations)
    {
        for (let i = endIndex + 1; i < this.tokens.length; i++)
        {
            const currentTokenName = this.tokens[i].name;
            if (terminationPhrases.includes(currentTokenName))
            {
                return false;
            }
            if (negationSuffixes.includes(currentTokenName))
            {
                if (!pseudoNegations.includes(currentTokenName))
                {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Finds and associates modifiers to a given entity within a specified token window.
     * @param {Entity} entity - The entity object to attach modifiers to.
     * @param {number} entityStartIndex - The starting index of the entity in this.tokens.
     * @param {number} entityEndIndex - The ending index of the entity in this.tokens.
     * @param {Object.<string, Object.<string, string[]>>} modifierDefinitions - The structured modifier definitions (e.g., from dataset.modifiers).
     * @param {number} [windowSize=5] - The number of tokens to look before and after the entity for modifiers.
     */
    _findAndAddModifiers(entity, entityStartIndex, entityEndIndex, modifierDefinitions, windowSize = 5)
    {
        // Determine the search window
        const searchStart = Math.max(0, entityStartIndex - windowSize);
        const searchEnd = Math.min(this.tokens.length - 1, entityEndIndex + windowSize);

        // Iterate through the tokens in the search window
        for (let i = searchStart; i <= searchEnd; i++)
        {
            // Skip the tokens that are part of the entity itself to avoid self-referencing
            if (i >= entityStartIndex && i <= entityEndIndex)
            {
                continue;
            }

            const currentTokenName = this.tokens[i].name; // Stemmed token name

            // Check each modifier type (e.g., "gravita", "cronicità")
            for (const modifierType in modifierDefinitions)
            {
                const modifierValues = modifierDefinitions[modifierType]; // e.g., { "lieve": ["lieve", ...], "moderata": ["moderato", ...] }

                // Check each semantic category within the modifier type (e.g., "lieve", "moderata", "grave")
                for (const semanticCategory in modifierValues)
                {
                    const modifierTerms = modifierValues[semanticCategory]; // e.g., ["lieve", "moderato", "scarso", "minimo"]

                    // If the current token's stemmed name is in this list of modifier terms
                    if (modifierTerms.includes(currentTokenName))
                    {
                        // Add the semantic category to the entity's modifiers
                        entity.addModifier(modifierType, semanticCategory);
                    }
                }
            }
        }
    }


    /**
     * Finds entities within the sentence based on a list of patterns and assigns them a label.
     * This method searches for exact sequential matches of the provided patterns.
     * It also checks for negation based on provided negation rules and finds associated modifiers.
     *
     * @param {Pattern[]} patterns - An array of Pattern objects to search for.
     * @param {string} label - The label to assign to the found entities (e.g., "PERSON", "LOCATION").
     * @param {object} options - An object containing additional rules and definitions.
     * @param {object} [options.negationRules={}] - Rules for negation detection.
     * @param {string[]} [options.negationRules.negationPrefixes=[]] - Words that negate preceding entities.
     * @param {string[]} [options.negationRules.negationSuffixes=[]] - Words that negate succeeding entities.
     * @param {string[]} [options.negationRules.terminationPhrases=[]] - Words that stop a negation span.
     * @param {string[]} [options.negationRules.pseudoNegations=[]] - Words that look like negations but aren't always.
     * @param {Object.<string, Object.<string, string[]>>} [options.modifierDefinitions={}] - Structured modifier definitions.
     * @param {number} [options.modifierWindowSize=5] - The number of tokens to look before and after an entity for modifiers.
     * @returns {Entity[]} An array of Entity objects found in the sentence.
     */
    findEntities(patterns, label, options = {})
    {
        const foundEntities = [];

        const {
            negationRules = {},
            modifierDefinitions = {},
            modifierWindowSize = 5
        } = options;

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

                    const entityStartIndex = i;
                    const entityEndIndex = i + pattern.tokens.length - 1;

                    // Check for negation
                    entity.isNegated = this.isNegatedByPrefix(entityStartIndex, negationPrefixes, terminationPhrases, pseudoNegations) ||
                        this.isNegatedBySuffix(entityEndIndex, negationSuffixes, terminationPhrases, pseudoNegations);

                    // Find and add modifiers
                    this._findAndAddModifiers(entity, entityStartIndex, entityEndIndex, modifierDefinitions, modifierWindowSize);

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