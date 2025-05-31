const problems = require('../data/problems');
const Context = require('./nlp/context');
const Entity = require('./nlp/entity');
const { findEntities } = require('./nlp/entity_recognizer');
const Pattern = require('./nlp/pattern');
const SectionProcessor = require('./nlp/section_processor');
const Sentence = require('./nlp/sentence');
const Text = require('./utils/text');

class Med
{
    static process(text, dataset)
    {
        const context = new Context();

        // Initialize context properties as empty arrays.
        // This is crucial to ensure we can append to them later.
        context.problems = [];
        context.therapies = [];

        // Prepare negation rules and modifiers to be passed down
        const processOptions = {
            negationRules: {
                negationPrefixes: dataset.language.negationPrefixes || [],
                negationSuffixes: dataset.language.negationSuffixes || [],
                terminationPhrases: dataset.language.terminationPhrases || [],
                pseudoNegations: dataset.language.pseudoNegations || []
            },
            modifierDefinitions: dataset.language.modifiers || {}, // Pass the entire modifiers object
            modifierWindowSize: 5 // You can make this configurable in dataset if needed
        };

        const sections = SectionProcessor.identify(text, dataset.sections);
        for (const section of sections)
        {
            // Assuming section.text holds the string content of the section.
            // Adjust if SectionProcessor.identify returns raw strings directly.
            const sentences = Sentence.identify(section);

            // Map patterns once outside the inner loop for efficiency, as they don't change per sentence.
            const problemPatterns = Pattern.map(dataset.problems);
            const therapyPatterns = Pattern.map(dataset.therapies);

            for (let sentence of sentences)
            {
                // Find problems and therapies within the current sentence.
                const foundProblems = sentence.findEntities(problemPatterns, "PROBLEMA_SALUTE", processOptions);
                const foundTherapies = sentence.findEntities(therapyPatterns, "TERAPIA", processOptions);

                // Append the found entities to the context's arrays.
                // The spread operator (...) unpacks the elements from foundProblems/foundTherapies
                // into individual arguments for push(), effectively merging them.
                context.problems.push(...foundProblems);
                context.therapies.push(...foundTherapies);
            }
        }

        // Logging results (useful for debugging)
        console.log(`${context.problems.length} Problems:`);
        for (const entity of context.problems)
        {
            console.log(entity.toString());
        }
        console.log(`${context.therapies.length} Therapies:`);
        for (const entity of context.therapies)
        {
            console.log(entity.toString());
        }

        return context; // Make sure to return the populated context object
    }
}

module.exports = Med;