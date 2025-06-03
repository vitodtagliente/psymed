/**
 * Represents a semantic relationship found between entities in a text.
 */
class Relation
{
    /**
     * Creates an instance of Relation.
     * @param {string} name - The name of the relation (e.g., "TREATED_WITH", "CAUSED_BY").
     * @param {Entity[]} entities - An array of Entity objects involved in this relation, in the order they were matched by the pattern.
     * @param {string} textSpan - The exact text segment from the original sentence that matched the relation pattern.
     */
    constructor(name, entities, textSpan)
    {
        /**
         * The predefined name of the relationship.
         * @type {string}
         */
        this.name = name;

        /**
         * An array of Entity objects that are part of this relationship.
         * The order corresponds to the order of entities in the relation definition.
         * @type {Entity[]}
         */
        this.entities = entities;

        /**
         * The specific text span from the original sentence that triggered this relation match.
         * @type {string}
         */
        this.textSpan = textSpan;
    }

    /**
     * Returns a string representation of the Relation object.
     * @returns {string} A formatted string describing the relation.
     */
    toString()
    {
        const entityTexts = this.entities.map(e => `"${e.text}" (${e.label})`).join(', ');
        return `Relation { Name: ${this.name}, Entities: [${entityTexts}], Text Span: "${this.textSpan}" }`;
    }
}

module.exports = Relation;
