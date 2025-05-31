/**
 * Represents the extracted information and semantic understanding derived from processing a document.
 * It serves as a container for identified entities like problems and therapies, and their relationships.
 */
class Context
{
    /**
     * Creates an instance of Context.
     * Initializes empty arrays for storing identified problems, therapies, and relations.
     */
    constructor()
    {
        /**
         * An array to store identified health problems within the processed document.
         * Each element in this array is expected to be an instance of the `Entity` class,
         * specifically labeled as "PROBLEMA_SALUTE".
         * @type {Entity[]}
         */
        this.problems = [];

        /**
         * An array to store identified therapies or treatments within the processed document.
         * Each element in this array is expected to be an instance of the `Entity` class,
         * specifically labeled as "TERAPIA".
         * @type {Entity[]}
         */
        this.therapies = [];

        /**
         * An array to store identified semantic relationships between entities.
         * Each element is an instance of the `Relation` class.
         * @type {Relation[]}
         */
        this.relations = []; // New property for relations
    }
}

module.exports = Context;
