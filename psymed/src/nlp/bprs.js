const Text = require("../utils/text");

/**
 * Class for processing BPRS (Brief Psychiatric Rating Scale) scores based on extracted entities.
 */
class BPRS
{
    /**
     * Processes extracted entities and calculates BPRS scores based on a provided configuration.
     * @param {Array<Object>} entities - An array of extracted entities, each potentially having text and negation information.
     * @param {Object} bprsOptions - The BPRS configuration containing categories and their mapping rules.
     * @returns {Object} An object containing individual category scores and the total BPRS score.
     */
    static process(entities, bprsOptions)
    {
        const bprsScores = {};
        let totalBPRSScore = 0;

        // Initialize all categories with a default score of 1 (Not present)
        bprsOptions.categories.forEach((category) =>
        {
            bprsScores[category.id] = {
                name: category.name,
                score: 1, // Default score: 1 (Not present)
            };
        });

        // Map entities to categories, considering negations
        // Map: categoryId -> { positive: [], negative: [] }
        const entitiesPerCategory = new Map();

        entities.forEach((entity) =>
        {
            // Stem the entity text for robust matching
            const stemmedEntityText = Text.stemItalian(entity.text);

            bprsOptions.categories.forEach((category) =>
            {
                category.mappings.forEach((mapping) =>
                {
                    // Stem keywords from the mapping for matching
                    const stemmedEntityTextKeywords = mapping.entityTextKeywords.map(
                        (keyword) => Text.stemItalian(keyword),
                    );

                    let isMatch = false;
                    // Check if the stemmed entity text includes any of the stemmed keywords
                    for (const keyword of stemmedEntityTextKeywords)
                    {
                        if (stemmedEntityText.includes(keyword))
                        {
                            isMatch = true;
                            break;
                        }
                    }

                    if (isMatch)
                    {
                        // Initialize the category entry if it doesn't exist
                        if (!entitiesPerCategory.has(category.id))
                        {
                            entitiesPerCategory.set(category.id, {
                                positive: [],
                                negative: [],
                            });
                        }

                        // Add the entity to either positive or negative list based on negation
                        if (entity.isNegated)
                        {
                            entitiesPerCategory
                                .get(category.id)
                                .negative.push({ entity, mapping });
                        }
                        else
                        {
                            entitiesPerCategory
                                .get(category.id)
                                .positive.push({ entity, mapping });
                        }
                    }
                });
            });
        });

        // Calculate the final scores for each category
        bprsOptions.categories.forEach((category) =>
        {
            const itemData = entitiesPerCategory.get(category.id);
            let finalScore = 1; // Default to 1 (Not present)

            if (itemData)
            {
                // If there are positive entities, calculate the maximum score from them
                if (itemData.positive.length > 0)
                {
                    let maxPositiveScore = 1;
                    itemData.positive.forEach((itemEntry) =>
                    {
                        const { entity, mapping } = itemEntry;
                        let scoreForThisMapping = mapping.baseScore;

                        // Apply modifier rules to adjust the score
                        for (const modifierType in mapping.modifierRules)
                        {
                            if (entity.modifiers[modifierType])
                            {
                                for (const modifierValue of entity.modifiers[modifierType])
                                {
                                    const stemmedModifierValue = Text.stemItalian(modifierValue);
                                    const rule = mapping.modifierRules[modifierType][stemmedModifierValue];
                                    if (rule && rule.adjustment !== undefined)
                                    {
                                        scoreForThisMapping += rule.adjustment;
                                        break; // Apply only the first matching modifier for this type
                                    }
                                }
                            }
                        }

                        // Ensure the score is within the valid BPRS range (1 to 7)
                        scoreForThisMapping = Math.min(7, Math.max(1, scoreForThisMapping));

                        // Keep track of the maximum score among positive entities for this category
                        if (scoreForThisMapping > maxPositiveScore)
                        {
                            maxPositiveScore = scoreForThisMapping;
                        }
                    });
                    finalScore = maxPositiveScore;
                }

                // If there are negative entities but no positive entities, the score remains 1 (Not present)
                if (itemData.negative.length > 0 && itemData.positive.length === 0)
                {
                    finalScore = 1;
                }
            }
            // Assign the calculated final score to the category
            bprsScores[category.id].score = finalScore;
        });

        // Calculate the total BPRS score by summing up all category scores
        for (const categoryId in bprsScores)
        {
            totalBPRSScore += bprsScores[categoryId].score;
        }

        // Return the detailed category scores and the total score
        return {
            scores: bprsScores,
            totalScore: totalBPRSScore,
        };
    }
}

module.exports = BPRS;