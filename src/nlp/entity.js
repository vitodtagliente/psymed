const Token = require("./token"); // Assuming Token.js is in the same directory or adjust path

/**
 * Represents an identified entity within a text, encapsulating its extracted text,
 * semantic label, negation status, associated modifiers, and the original tokens
 * that compose it.
 */
class Entity
{
    /**
     * Creates an instance of Entity.
     * @param {string} text - The precise string from the original sentence that forms the entity.
     * @param {string} label - The semantic category assigned to the entity (e.g., "Problem", "Therapy").
     */
    constructor(text, label)
    {
        /**
         * The exact text string of the entity as it appeared in the original sentence.
         * This is the raw, unnormalized form.
         * @type {string}
         */
        this.text = text;

        /**
         * The semantic category or type of the entity, defined by `Label` enum.
         * Examples: "problem", "therapy", "progress", "patient_info".
         * @type {string}
         */
        this.label = label;

        /**
         * A boolean flag indicating whether the entity's meaning is negated in the context it was found.
         * Defaults to `false`. For example, in "non evidente ansia", "ansia" might be the entity,
         * and `isNegated` would be `true`.
         * @type {boolean}
         */
        this.isNegated = false;

        /**
         * An object to store associated modifiers, categorized by modifier type.
         * Each key represents a type of modifier (e.g., "gravita", "cronicità"),
         * and its value is an array of specific modifier values (e.g., ["grave"], ["cronico"]).
         * @type {Object.<string, string[]>}
         */
        this.modifiers = {}; // Initialize as an empty object

        /**
         * A list of original Token objects that constitute this entity.
         * This preserves the token-level detail including original text and stemmed form.
         * @type {Token[]}
         */
        this.originalTokens = []; // New property: Initialize as an empty array of Token objects
    }

    /**
     * Adds a modifier to the entity.
     * If the modifier type does not exist, it initializes an empty array for that type.
     * It prevents adding duplicate modifier values for the same type.
     * @param {string} type - The type of modifier (e.g., "gravita", "cronicità", "tempo").
     * @param {string} value - The specific modifier value (e.g., "lieve", "cronico", "iniziale").
     */
    addModifier(type, value)
    {
        if (!this.modifiers[type])
        {
            this.modifiers[type] = [];
        }
        // Avoid adding duplicates
        if (!this.modifiers[type].includes(value))
        {
            this.modifiers[type].push(value);
        }
    }

    /**
     * Adds a single Token object to the list of original tokens for this entity.
     * @param {Token} token - The Token object to add.
     */
    addOriginalToken(token)
    {
        if (token instanceof Token)
        {
            this.originalTokens.push(token);
        }
        else
        {
            console.warn("Attempted to add a non-Token object to originalTokens:", token);
        }
    }

    /**
     * Adds multiple Token objects to the list of original tokens for this entity.
     * This is useful when an entity is composed of several words.
     * @param {Token[]} tokens - An array of Token objects to add.
     */
    addOriginalTokens(tokens)
    {
        if (Array.isArray(tokens))
        {
            tokens.forEach(token => this.addOriginalToken(token));
        }
        else
        {
            console.warn("Attempted to add a non-array to originalTokens:", tokens);
        }
    }

    /**
     * Returns a string representation of the Entity object for debugging or logging.
     * @returns {string} A formatted string describing the entity and its properties.
     */
    toString()
    {
        let parts = [];
        parts.push(`Text: "${this.text}"`);
        parts.push(`Label: ${this.label}`);
        parts.push(`Negated: ${this.isNegated}`);

        // Add modifiers if any exist
        const modifierKeys = Object.keys(this.modifiers);
        if (modifierKeys.length > 0)
        {
            let modifierStrings = [];
            for (const type of modifierKeys)
            {
                modifierStrings.push(`${type}: [${this.modifiers[type].join(', ')}]`);
            }
            parts.push(`Modifiers: {${modifierStrings.join('; ')}}`);
        }
        else
        {
            parts.push(`Modifiers: {}`);
        }

        // Add original tokens if any exist
        if (this.originalTokens.length > 0)
        {
            const tokenTexts = this.originalTokens.map(token => token.toString()).join(', ');
            parts.push(`Original Tokens: [${tokenTexts}]`);
        }
        else
        {
            parts.push(`Original Tokens: []`);
        }

        return `Entity { ${parts.join(', ')} }`;
    }
}

module.exports = Entity; // Export the class for use in other modules
