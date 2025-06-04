const Text = require("../utils/text");

class GAF
{
    /**
     * Calculates the Global Assessment of Functioning (GAF) score
     * based on a list of extracted NLP entities and a GAF configuration.
     *
     * The GAF score is a single number (0-100) used to indicate psychological, social,
     * and occupational functioning. Higher scores indicate better functioning.
     *
     * @param {Array<Object>} entities - The list of entities extracted by NLP.
     * Each entity object is expected to have:
     * - `text`: The original text of the entity.
     * - `label`: The semantic category of the entity (e.g., "problem").
     * - `isNegated`: A boolean indicating if the entity is negated.
     * - `modifiers`: An object containing modifier types and their values.
     * - `originalTokens`: An array of Token objects, where each Token has `text` and `name` (stemmed).
     * @param {Object} gafConfig - The configuration object for GAF calculation.
     * Expected structure:
     * - `initialGAF`: The starting GAF score (e.g., 100).
     * - `entityImpact`: An object mapping normalized entity texts/stems to their GAF decrement values.
     * Includes a `_default` key for general entity impact.
     * - `modifiersImpact`: An object mapping normalized modifier types and values to multiplication factors.
     * - `negationImpactFactor`: A factor to reduce impact if an entity is negated.
     * @returns {number} The calculated GAF score, clamped between 0 and 100.
     */
    static process(entities, gafConfig)
    {
        let currentGAF = gafConfig.initialGAF;

        for (const entity of entities)
        {
            const { text, isNegated, modifiers, originalTokens } = entity;

            let impact = 0;

            // Determine the key for entity impact lookup:
            // If the entity has a single original token, use its stemmed name (more precise).
            // Otherwise (multi-token entity), use the stemmed and normalized full text.
            let entityLookupKey;
            if (originalTokens && originalTokens.length === 1)
            {
                entityLookupKey = originalTokens[0].name; // Use the stemmed form of the single token
            } else
            {
                entityLookupKey = Text.stemItalian(Text.normalize(text)); // Stem and normalize the full entity text
            }

            // Get the base impact for the entity. Use specific impact if defined, otherwise use default.
            // Normalize the key from gafConfig.entityImpact to match our lookup key format.
            // This requires iterating through gafConfig.entityImpact keys to find a match.
            let foundImpact = false;
            for (const configKey in gafConfig.entityImpact)
            {
                if (configKey !== '_default')
                { // Don't normalize _default as it's a special key
                    const normalizedConfigKey = Text.stemItalian(Text.normalize(configKey));
                    if (normalizedConfigKey === entityLookupKey)
                    {
                        impact = gafConfig.entityImpact[configKey];
                        foundImpact = true;
                        break;
                    }
                }
            }

            if (!foundImpact)
            {
                impact = gafConfig.entityImpact._default;
            }

            // If the entity is negated, reduce its impact
            if (isNegated)
            {
                impact *= gafConfig.negationImpactFactor;
            }

            // Apply modifiers (e.g., severity) to the impact
            for (const modifierType in modifiers)
            {
                // Normalize modifier type for robust lookup
                const normalizedModifierType = Text.normalize(modifierType);
                if (gafConfig.modifiersImpact[normalizedModifierType])
                {
                    for (const modifierValue of modifiers[modifierType])
                    {
                        // Normalize modifier value for robust lookup
                        const normalizedModifierValue = Text.normalize(modifierValue);
                        if (gafConfig.modifiersImpact[normalizedModifierType][normalizedModifierValue])
                        {
                            impact *= gafConfig.modifiersImpact[normalizedModifierType][normalizedModifierValue];
                        }
                    }
                }
            }

            currentGAF -= impact;
        }

        // Ensure the GAF score is clamped between 0 and 100
        return Math.max(0, Math.min(100, currentGAF));
    }
}

module.exports = GAF;