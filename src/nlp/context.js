/**
 * Represents the extracted information and semantic understanding derived from processing a document.
 * It serves as a container for identified entities like problems and therapies, their relationships,
 * and calculated scores such as the Brief Psychiatric Rating Scale (BPRS).
 */
class Context
{
    /**
     * Creates an instance of Context.
     * Initializes empty arrays for storing identified problems, therapies, and relations,
     * and initializes properties for BPRS scores.
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
        this.relations = [];

        /**
         * An object mapping BFRS category keys to their calculated numerical scores.
         * @type {Object.<string, number>}
         * @example { "preoccupazione_somatica": 4, "ansia": 6, ... }
         */
        this.bfrsScores = {}; // New property for individual BFRS category scores

        /**
         * The total calculated sum of all BFRS category scores.
         * @type {number}
         */
        this.totalBFRSSum = 0; // New property for the total BFRS sum
    }
}

module.exports = Context;