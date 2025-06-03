const Label = require('./label');
const BPRS = require('./nlp/bprs');
const Context = require('./nlp/context');
const Pattern = require('./nlp/pattern');
const Section = require('./nlp/section');
const Sentence = require('./nlp/sentence');

/**
 * @class PsyMed
 * @description
 * The PsyMed class provides static methods for processing medical text.
 * It integrates various NLP components to identify problems, therapies,
 * relations between them, and calculate BPRS (Brief Psychiatric Rating Scale) scores.
 */
class PsyMed
{
    /**
     * Processes a given text to extract medical entities, their relations,
     * and calculate BPRS scores based on a provided data.
     *
     * @static
     * @param {string} text - The input medical text to be processed.
     * @param {object} data - An object containing the NLP data configuration.
     * @param {string[]} [data.negationPrefixes=[]] - An array of words/phrases indicating negation prefixes.
     * @param {string[]} [data.negationSuffixes=[]] - An array of words/phrases indicating negation suffixes.
     * @param {string[]} [data.terminationPhrases=[]] - An array of phrases that terminate a negation scope.
     * @param {string[]} [data.pseudoNegations=[]] - An array of pseudo-negation phrases.
     * @param {object} [data.modifiers={}] - An object defining modifier patterns and their effects.
     * @param {object[]} data.problems - An array of problem definitions, each containing patterns for identification.
     * @param {object[]} data.therapies - An array of therapy definitions, each containing patterns for identification.
     * @param {object[]} [data.relations=[]] - An array of relation definitions, specifying how entities might be related.
     * @param {object} data.bprsCategories - BPRS specific configurations and categories for scoring.
     * @returns {Context} A Context object containing all identified problems, therapies, relations,
     * and BPRS scores.
     */
    static process(text, data)
    {
        // Prepare negation rules and modifiers to be passed down to entity finding methods.
        // These options configure how entities are identified and how their attributes (e.g., negated) are determined.
        const processOptions = {
            negationRules: {
                negationPrefixes: data.negationPrefixes || [],
                negationSuffixes: data.negationSuffixes || [],
                terminationPhrases: data.terminationPhrases || [],
                pseudoNegations: data.pseudoNegations || []
            },
            modifierDefinitions: data.modifiers || {}, // Pass the entire modifiers object for contextual analysis.
            modifierWindowSize: 5 // Defines the word window around an entity to look for modifiers.
        };

        // Map patterns once outside the loops for efficiency.
        // This converts raw pattern definitions into a more usable format for entity identification.
        const problemPatterns = Pattern.map(data.problems);
        const therapyPatterns = Pattern.map(data.therapies);
        const relationDefinitions = data.relations || []; // Ensure relations are available, default to empty array.

        const result = {};

        const sections = Section.identify(text, data.sections || []);
        for (const section of sections)
        {
            // Initialize a new Context object to store all extracted information.
            const context = new Context();
            {
                // Identify individual sentences within the input text.
                const sentences = Sentence.identify(section.content);
                for (let sentence of sentences)
                {
                    // 1. Find Entities:
                    // Identify problem entities within the current sentence using predefined patterns.
                    const foundProblems = sentence.findEntities(problemPatterns, Label.Problem, processOptions);
                    // Identify therapy entities within the current sentence using predefined patterns.
                    const foundTherapies = sentence.findEntities(therapyPatterns, Label.Theraphy, processOptions);

                    // Append newly found entities to the global context.
                    context.problems.push(...foundProblems);
                    context.therapies.push(...foundTherapies);

                    // Combine all entities found in the current sentence for relation extraction.
                    // This array will be used to check for potential relationships between entities.
                    const entitiesInCurrentSentence = [...foundProblems, ...foundTherapies];

                    // Find Relations between entities in the current sentence.
                    // This method uses the relation definitions to identify connections between identified entities.
                    const foundRelations = sentence.findRelations(entitiesInCurrentSentence, relationDefinitions);

                    // Append newly found relations to the global context.
                    context.relations.push(...foundRelations);
                }
            }
            // Perform a reduction step on the context, typically for deduplication or consolidation of entities/relations.
            context.redux();

            // Calculate BPRS Score after all problems have been identified and processed.
            // The BPRS scores are derived from the identified problems and the BPRS data configuration.
            const bprsResult = BPRS.process(context.problems, data.bprsCategories);
            context.bprsScores = bprsResult.scores; // Store category-wise BPRS scores.
            context.totalBPRSSum = bprsResult.totalScore; // Store the total BPRS score.

            result[section.name] = context;
        }

        return result;
    }

    /**
     * Visualizes (logs to console) the extracted information from a processed result object.
     * This method is primarily for debugging and displaying the results in a human-readable format.
     *
     * @static
     * @param {object} result - The Result object containing processed problems, therapies, relations, and BPRS scores.
     */
    static visualize(result)
    {
        for (const section of Object.keys(result))
        {
            const context = result[section];
            console.log(`[${section}]`);

            // Logging identified problems.
            console.log(`${context.problems.length} Problems:`);
            for (const entity of context.problems)
            {
                console.log(entity.toString()); // Use toString for a structured output of each problem entity.
            }

            // Logging identified therapies.
            console.log(`${context.therapies.length} Therapies:`);
            for (const entity of context.therapies)
            {
                console.log(entity.toString()); // Use toString for a structured output of each therapy entity.
            }

            // Logging identified relations.
            console.log(`${context.relations.length} Relations:`);
            for (const relation of context.relations)
            {
                console.log(relation.toString()); // Use toString for a structured output of each relation.
            }

            // Logging BPRS scores by category.
            console.log("BPRS Scores by Category:");
            let i = 0;
            for (const categoryId in context.bprsScores)
            {
                const formattedIndex = String(i + 1).padStart(2, '0'); // Format index with leading zero for readability.
                console.log(`${formattedIndex} - ${context.bprsScores[categoryId].name}: ${context.bprsScores[categoryId].score}`);
                i++;
            }
            // Logging the total BPRS score.
            console.log(`Total BPRS Score: ${context.totalBPRSSum}`);
        }
    }
}

module.exports = PsyMed;
