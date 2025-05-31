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

    /**
     * Identifies and extracts entities from a given sentence by matching predefined keywords.
     * This method leverages text normalization and stemming (assumed to be in `Text` utility)
     * for more flexible and robust pattern matching.
     *
     * @param {string} sentence - The input sentence in which to search for entities.
     * @param {Array<string>} keywords - A list of keyword strings to search for.
     * @param {string} label - The label to assign to all entities found using these keywords (e.g., "DRUG_NAME").
     * @returns {Array<Entity>} A collection of unique Entity objects discovered in the sentence.
     */
    static find(sentence, keywords, label)
    {
        const uniqueEntitiesMap = new Map();
        // A Set to keep track of the *stemmed* indices already covered by a found entity.
        // This prevents shorter, overlapping keywords from being identified if a longer one
        // already covers that part of the sentence.
        const coveredIndices = new Set();

        const normalizedSentence = Text.normalize(sentence);
        const originalSentenceTokens = normalizedSentence.split(/\s+/).filter(Boolean);
        const stemmedSentenceTokens = originalSentenceTokens.map(word => Text.stemItalian(word));

        const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);

        for (const keyword of sortedKeywords)
        {
            const normalizedKeyword = Text.normalize(keyword);
            const stemmedKeywordPattern = normalizedKeyword.split(/\s+/).map(word => Text.stemItalian(word)).filter(Boolean);

            const keywordPatternLength = stemmedKeywordPattern.length;

            // Skip if the pattern is empty.
            if (keywordPatternLength === 0) continue;

            // Step 3: Search for the stemmed keyword sequence within the stemmed sentence.
            // We use a sliding window approach.
            for (let i = 0; i <= stemmedSentenceTokens.length - keywordPatternLength; i++)
            {
                // Check if any part of the potential match is already covered by a previously found entity.
                let isOverlap = false;
                for (let k = 0; k < keywordPatternLength; k++)
                {
                    if (coveredIndices.has(i + k))
                    {
                        isOverlap = true;
                        break;
                    }
                }
                if (isOverlap)
                {
                    continue; // Skip this potential match as it overlaps with an existing entity.
                }

                let matchFound = true;
                for (let j = 0; j < keywordPatternLength; j++)
                {
                    if (stemmedSentenceTokens[i + j] !== stemmedKeywordPattern[j])
                    {
                        matchFound = false;
                        break;
                    }
                }

                if (matchFound)
                {
                    // A match is found in the stemmed version.
                    let matchedOriginalText;
                    if (originalSentenceTokens && originalSentenceTokens.length >= i + keywordPatternLength)
                    {
                        // If original tokens are provided, use them to reconstruct the original text.
                        matchedOriginalText = originalSentenceTokens.slice(i, i + keywordPatternLength).join(' ');
                    } else
                    {
                        // Otherwise, use the stemmed tokens for the entity's text (less ideal but works).
                        matchedOriginalText = stemmedSentenceTokens.slice(i, i + keywordPatternLength).join(' ');
                    }

                    // Create a unique key for this potential entity using its text and label.
                    const entityKey = `${matchedOriginalText}::${label}`;
                    // Add the entity to the map only if it hasn't been added already.
                    if (!uniqueEntitiesMap.has(entityKey))
                    {
                        uniqueEntitiesMap.set(entityKey, new Entity(matchedOriginalText, label));
                        // Mark the indices covered by this newly found entity.
                        for (let k = 0; k < keywordPatternLength; k++)
                        {
                            coveredIndices.add(i + k);
                        }
                    }
                }
            }
        }

        return Array.from(uniqueEntitiesMap.values());
    }
}

module.exports = Entity;