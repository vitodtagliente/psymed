/**
 * Represents an identified entity within a text.
 */
class Entity
{
    /**
     * Creates an instance of Entity.
     * @param {string} text - The precise string from the original sentence that forms the entity.
     * @param {string} label - The semantic category assigned to the entity (e.g., "PERSON", "LOCATION", "PRODUCT").
     */
    constructor(text, label)
    {
        /**
         * The exact text string of the entity as it appeared in the original sentence.
         * @type {string}
         */
        this.text = text;

        /**
         * The semantic category or type of the entity.
         * Examples: "PERSON", "LOCATION", "ORGANIZATION", "DATE", "PRODUCT".
         * @type {string}
         */
        this.label = label;

        /**
         * A boolean flag indicating whether the entity's meaning is negated in the context it was found.
         * Defaults to `false`. For example, in "not a good idea", "good idea" might be the entity, and `isNegated` would be `true`.
         * @type {boolean}
         */
        this.isNegated = false;

        /**
         * An object to store associated modifiers, categorized by modifier type.
         * Example: { "gravita": ["grave"], "cronicità": ["acuto"] }
         * @type {Object.<string, string[]>}
         */
        this.modifiers = {}; // Initialize as an empty object
    }

    /**
     * Adds a modifier to the entity.
     * @param {string} type - The type of modifier (e.g., "gravita", "cronicità").
     * @param {string} value - The specific modifier value (e.g., "lieve", "cronico").
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
     * Returns a string representation of the Entity object.
     * @returns {string} A formatted string describing the entity.
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
        } else
        {
            parts.push(`Modifiers: {}`);
        }

        return `Entity { ${parts.join(', ')} }`;
    }
}

module.exports = Entity; // Don't forget to export the class if it's in its own file