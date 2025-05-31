const Text = require("../utils/text"); // Assuming Text utility is available for stemming/lowercase

class BFRS
{
    /**
     * Calculates the total score for the Brief Psychiatric Rating Scale (BFRS)
     * by analyzing a list of identified Entity objects and their associated modifiers.
     *
     * @param {Entity[]} entities An array of Entity objects (e.g., context.problems, context.therapies).
     * @param {object} bprsOptions An object containing the configuration for BFRS scoring.
     * @param {object} bprsOptions.severityToScore A mapping from severity strings to numerical scores.
     * @param {string[]} bprsOptions.severityOrder An ordered list of severity levels from highest to lowest.
     * @param {object} bprsOptions.categories An object defining BFRS categories, each with keywords and modifiers.
     * @returns {{scoresPerCategory: object, totalBFRSSum: number}} An object containing individual category scores
     * and the total BFRS sum.
     */
    static process(entities, bprsOptions)
    {
        if (!Array.isArray(entities))
        {
            console.warn("BFRS.process: 'entities' must be an array of Entity objects.");
            return { scoresPerCategory: {}, totalBFRSSum: 0 };
        }

        if (!bprsOptions || typeof bprsOptions.severityToScore !== 'object' || !Array.isArray(bprsOptions.severityOrder) || typeof bprsOptions.categories !== 'object')
        {
            console.error("BFRS.process: 'bprsOptions' is incomplete or malformed. Requires severityToScore, severityOrder, and categories.");
            return { scoresPerCategory: {}, totalBFRSSum: 0 };
        }

        const { severityToScore, severityOrder, categories } = bprsOptions;

        // Initialize scores for all BFRS categories to their lowest possible score (e.g., 'assente' score)
        // This ensures all 18 categories are accounted for, even if no matching entity is found.
        let currentScores = {};
        for (const categoryKey in categories)
        {
            currentScores[categoryKey] = severityToScore["assente"] || 1; // Default to 1 if 'assente' not found
        }

        // Iterate through each identified entity
        for (const entity of entities)
        {
            // Skip negated entities for BFRS scoring, as they indicate absence of the symptom
            if (entity.isNegated)
            {
                continue;
            }

            // Get the stemmed text of the entity for matching against category keywords
            const entityStemmedText = Text.stemItalian(entity.text.toLowerCase());

            // Check which BFRS category this entity belongs to
            for (const categoryKey in categories)
            {
                const categoryDef = categories[categoryKey];

                // Check if the entity's stemmed text matches any of the category's keywords
                // We'll also stem the keywords for robust matching
                const categoryKeywordsStemmed = categoryDef.keywords.map(kw => Text.stemItalian(kw.toLowerCase()));

                let keywordMatchFound = false;
                for (const keywordStemmed of categoryKeywordsStemmed)
                {
                    // Check if the entity's stemmed text contains the stemmed keyword
                    // Or if the stemmed keyword contains the entity's stemmed text (for partial matches)
                    if (entityStemmedText.includes(keywordStemmed) || keywordStemmed.includes(entityStemmedText))
                    {
                        keywordMatchFound = true;
                        break;
                    }
                }

                if (keywordMatchFound)
                {
                    // If the entity is relevant to this BFRS category,
                    // now find its associated severity modifier (assuming 'gravita' is the relevant type)
                    const gravitaModifiers = entity.modifiers["gravita"];

                    if (gravitaModifiers && gravitaModifiers.length > 0)
                    {
                        // Find the highest severity reported for this entity's 'gravita' modifier
                        let highestEntitySeverity = "assente";
                        let highestEntityScore = severityToScore["assente"] || 1;

                        for (const modifierValue of gravitaModifiers)
                        {
                            const currentModifierScore = severityToScore[modifierValue.toLowerCase()]; // Ensure lowercase for lookup
                            if (currentModifierScore !== undefined && currentModifierScore > highestEntityScore)
                            {
                                highestEntityScore = currentModifierScore;
                                highestEntitySeverity = modifierValue.toLowerCase();
                            }
                        }

                        // Update the category's score only if the found entity's severity is higher
                        // than the current highest score for that category.
                        // We use severityOrder to compare severity levels correctly.
                        const currentCategoryScore = currentScores[categoryKey];
                        const currentCategorySeverityString = Object.keys(severityToScore).find(key => severityToScore[key] === currentCategoryScore);

                        // Compare ranks using severityOrder
                        const currentCategoryRank = severityOrder.indexOf(currentCategorySeverityString);
                        const highestEntityRank = severityOrder.indexOf(highestEntitySeverity);

                        // If the entity's severity is higher (lower index in severityOrder means higher severity)
                        if (highestEntityRank !== -1 && (currentCategoryRank === -1 || highestEntityRank < currentCategoryRank))
                        {
                            currentScores[categoryKey] = highestEntityScore;
                        }
                    } else
                    {
                        // If a keyword is found but no 'gravita' modifier is explicitly attached to the entity,
                        // consider it 'lieve' or a default score if not already higher.
                        // This is a heuristic and might need adjustment based on clinical rules.
                        const defaultScoreForPresence = severityToScore["lieve"] || 2; // Default to 'lieve' if present without specific modifier
                        if (currentScores[categoryKey] < defaultScoreForPresence)
                        {
                            currentScores[categoryKey] = defaultScoreForPresence;
                        }
                    }
                }
            }
        }

        // Calculate total BFRS sum
        let totalBFRSSum = 0;
        for (const categoryKey in currentScores)
        {
            totalBFRSSum += currentScores[categoryKey];
        }

        return {
            scoresPerCategory: currentScores,
            totalBFRSSum: totalBFRSSum
        };
    }
}

module.exports = BFRS;