const Text = require("../utils/text");

/**
 * Represents an identified entity within a text, characterized by its exact text content and a semantic label.
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
        this.text = text;
        this.label = label;
        this.isNegated = false;
    }
}

module.exports = Entity;