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

        // Map patterns once outside the loops for efficiency
        const problemPatterns = Pattern.map(dataset.problems);
        const therapyPatterns = Pattern.map(dataset.therapies);
        const relationDefinitions = dataset.relations || []; // Ensure relations are available

        const sections = SectionProcessor.identify(text, dataset.sections);
        for (const section of sections)
        {
            const sentences = Sentence.identify(section.text || section);

            for (let sentence of sentences)
            {
                // 1. Find Entities
                const foundProblems = sentence.findEntities(problemPatterns, "PROBLEMA_SALUTE", processOptions);
                const foundTherapies = sentence.findEntities(therapyPatterns, "TERAPIA", processOptions);

                // Append found entities to the context
                context.problems.push(...foundProblems);
                context.therapies.push(...foundTherapies);

                // Combine all entities found in the current sentence for relation extraction
                // You might need to expand this to include other entity types if your relations involve them
                const entitiesInCurrentSentence = [...foundProblems, ...foundTherapies];

                // 2. Find Relations between entities in the current sentence
                const foundRelations = sentence.findRelations(entitiesInCurrentSentence, relationDefinitions);

                // Append found relations to the context
                context.relations.push(...foundRelations);
            }
        }

        // Logging results
        console.log(`${context.problems.length} Problems:`);
        for (const entity of context.problems)
        {
            console.log(entity.toString()); // Use toString for better output
        }
        console.log(`${context.therapies.length} Therapies:`);
        for (const entity of context.therapies)
        {
            console.log(entity.toString()); // Use toString for better output
        }
        console.log(`${context.relations.length} Relations:`);
        for (const relation of context.relations)
        {
            console.log(relation.toString()); // Use toString for better output
        }

        return context; // Make sure to return the populated context object
    }
}

module.exports = Med;