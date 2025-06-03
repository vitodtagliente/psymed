class Section
{
    /**
     * Identifies sections within a text based on provided rules.
     *
     * @param {string} text The input text to be divided into sections.
     * @param {Array<Object>} rules An array of rule objects. Each rule object should have:
     * - `name`: A string identifying the section (e.g., "Admission Start", "Discharge End").
     * - `startPattern`: A string or RegExp to identify the beginning of a section.
     * - `inclusive`: (Optional) A boolean indicating whether the start pattern should be included in the section. Defaults to true.
     * @returns {Array<Object>} An array of section objects. Each section object has:
     * - `name`: The name of the section.
     * - `content`: The text content of the section.
     */
    static identify(text, rules)
    {
        if (!text || typeof text !== 'string')
        {
            return [{ name: 'Default', content: text || '' }];
        }

        const sections = [];
        let currentText = text; // Rename for clarity, this is what we're currently parsing

        while (currentText.length > 0)
        {
            let bestMatch = null;
            let bestMatchIndex = -1;
            let bestRule = null;

            // Find the *earliest* matching rule in the currentText
            for (const rule of rules)
            {
                // Ensure the pattern is always a RegExp object. If it's a string, convert it.
                const pattern = rule.startPattern instanceof RegExp ? rule.startPattern : new RegExp(rule.startPattern, 'i');
                const match = currentText.match(pattern);

                if (match && (bestMatchIndex === -1 || match.index < bestMatchIndex))
                {
                    bestMatch = match;
                    bestMatchIndex = match.index;
                    bestRule = rule;
                }
            }

            if (bestMatch)
            {
                const ruleName = bestRule.name;
                const patternLength = bestMatch[0].length;
                const matchStartIndex = bestMatchIndex; // Where the best pattern was found in currentText

                // 1. Handle any content *before* the first matched section
                if (matchStartIndex > 0 && sections.length === 0)
                {
                    // sections.push({
                    //     name: 'Before First Section',
                    //     content: currentText.substring(0, matchStartIndex).trim()
                    // });
                }

                // Determine where the content for the *current* section actually starts
                // This is either at the matchStartIndex (if inclusive) or after the pattern (if not inclusive)
                const sectionContentStart = (bestRule.inclusive === false || bestRule.inclusive === undefined) ? matchStartIndex + patternLength : matchStartIndex;

                // Find the start of the *next* pattern *after* the current bestMatch,
                // and use that to define the end of the current section.
                let endOfCurrentSectionIndex = currentText.length; // Assume end of text if no next pattern

                // Search for the next pattern *after* the current pattern's end
                // We need to search in the part of `currentText` that comes *after* `matchStartIndex + patternLength`
                const textAfterCurrentPattern = currentText.substring(matchStartIndex + patternLength);

                for (const rule of rules)
                {
                    const nextPattern = rule.startPattern instanceof RegExp ? rule.startPattern : new RegExp(rule.startPattern, 'i');
                    const potentialNextMatch = textAfterCurrentPattern.match(nextPattern);

                    if (potentialNextMatch)
                    {
                        // The index returned by `textAfterCurrentPattern.match(nextPattern)` is relative to `textAfterCurrentPattern`.
                        // We need to convert it back to be relative to the original `currentText`.
                        const absoluteNextMatchIndex = (matchStartIndex + patternLength) + potentialNextMatch.index;
                        endOfCurrentSectionIndex = Math.min(endOfCurrentSectionIndex, absoluteNextMatchIndex);
                    }
                }

                // Extract the content of the current section
                const sectionContent = currentText.substring(sectionContentStart, endOfCurrentSectionIndex).trim();

                // Add the section only if it has content or the rule dictates it should be included even if empty
                if (sectionContent.length > 0 || bestRule.inclusive)
                {
                    sections.push({
                        name: ruleName,
                        content: sectionContent
                    });
                }

                // Crucial fix: Advance `currentText` past the end of the *current* section,
                // which is determined by `endOfCurrentSectionIndex`.
                currentText = currentText.substring(endOfCurrentSectionIndex);

            } 
            else
            {
                // No more rules matched. If there's remaining text, add it as a final section.
                if (currentText.length > 0)
                {
                    sections.push({
                        name: sections.length === 0 ? 'Default' : 'Remaining Text',
                        content: currentText.trim()
                    });
                }
                currentText = ''; // Stop processing
            }
        }

        if (sections.length === 0)
        {
            // If no rules matched at all, return the original text as a single default section
            return [{ name: 'Default', content: text }];
        }

        return sections;
    }
}

module.exports = Section;