const Entity = require('./entity');

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
         * An object mapping BPRS category keys to their calculated numerical scores.
         * @type {Object.<string, number>}
         * @example { "preoccupazione_somatica": 4, "ansia": 6, ... }
         */
        this.bprsScores = {}; // New property for individual BPRS category scores

        /**
         * The total calculated sum of all BPRS category scores.
         * @type {number}
         */
        this.totalBPRSSum = 0; // New property for the total BPRS sum
    }

    /**
     * Reduces duplicate or similar entities within a given array, keeping the longest entity
     * and merging modifiers from shorter, contained entities.
     * @param {Entity[]} entities The array of entities to process.
     * @returns {Entity[]} A new array with duplicates or similar entities reduced.
     */
    reduxEntities(entities)
    {
        if (!entities || entities.length === 0)
        {
            return [];
        }

        // Sort entities by text length in descending order to prioritize longer entities
        const sortedEntities = [...entities].sort((a, b) => b.text.length - a.text.length);

        const uniqueEntities = [];
        const processedIndices = new Set();

        for (let i = 0; i < sortedEntities.length; i++)
        {
            if (processedIndices.has(i))
            {
                continue;
            }

            const currentEntity = sortedEntities[i];
            // Create a new Entity instance to avoid modifying the original sortedEntities
            // and ensure all properties are properly initialized.
            let mergedEntity = new Entity(currentEntity.text, currentEntity.label);
            mergedEntity.isNegated = currentEntity.isNegated;
            mergedEntity.addModifiers(currentEntity.modifiers); // Use the new addModifiers method
            mergedEntity.addOriginalTokens(currentEntity.originalTokens);


            for (let j = 0; j < sortedEntities.length; j++)
            {
                if (i === j || processedIndices.has(j))
                {
                    continue;
                }

                const compareEntity = sortedEntities[j];

                // Check if one entity's text is contained within another
                const isContained = mergedEntity.text.includes(compareEntity.text) || compareEntity.text.includes(mergedEntity.text);

                if (isContained && mergedEntity.label === compareEntity.label)
                {
                    // If the current entity is longer or equal and contains the compare entity,
                    // or if the compare entity is contained and shorter, merge its modifiers.
                    if (mergedEntity.text.length >= compareEntity.text.length)
                    {
                        mergedEntity.addModifiers(compareEntity.modifiers); // Use the new addModifiers method
                        mergedEntity.addOriginalTokens(compareEntity.originalTokens); // Also merge tokens
                        processedIndices.add(j); // Mark the shorter entity as processed
                    }
                    else
                    {
                        // If the compareEntity is longer and contains mergedEntity, then compareEntity becomes the base
                        const tempMergedEntity = new Entity(compareEntity.text, compareEntity.label);
                        tempMergedEntity.isNegated = compareEntity.isNegated;
                        tempMergedEntity.addModifiers(compareEntity.modifiers);
                        tempMergedEntity.addOriginalTokens(compareEntity.originalTokens);

                        tempMergedEntity.addModifiers(mergedEntity.modifiers); // Merge old mergedEntity's modifiers into the new base
                        tempMergedEntity.addOriginalTokens(mergedEntity.originalTokens); // Merge old mergedEntity's tokens

                        mergedEntity = tempMergedEntity; // Update mergedEntity to the longer one
                        processedIndices.add(i); // Mark the current (shorter) entity as processed
                        // No need to break here, as we continue iterating through the inner loop
                        // to ensure all shorter entities are merged into the new longer base.
                    }
                }
            }
            if (!processedIndices.has(i))
            { // Check again if 'i' was marked as processed during inner loop
                uniqueEntities.push(mergedEntity);
                processedIndices.add(i);
            }
        }
        return uniqueEntities;
    }

    /**
     * Applies the redux logic to the problems and therapies arrays within the context.
     */
    redux()
    {
        this.problems = this.reduxEntities(this.problems);
        this.therapies = this.reduxEntities(this.therapies);
    }
}

module.exports = Context;