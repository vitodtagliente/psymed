const Label = require('./label');
const BPRS = require('./nlp/bprs');
const Context = require('./nlp/context');
const Pattern = require('./nlp/pattern');
const Sentence = require('./nlp/sentence');

class Med
{
    static process(text, dataset)
    {
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

        const context = new Context();
        {
            const sentences = Sentence.identify(text);
            for (let sentence of sentences)
            {
                // 1. Find Entities
                const foundProblems = sentence.findEntities(problemPatterns, Label.Problem, processOptions);
                const foundTherapies = sentence.findEntities(therapyPatterns, Label.Theraphy, processOptions);

                // Append found entities to the context
                context.problems.push(...foundProblems);
                context.therapies.push(...foundTherapies);

                // Combine all entities found in the current sentence for relation extraction
                // You might need to expand this to include other entity types if your relations involve them
                const entitiesInCurrentSentence = [...foundProblems, ...foundTherapies];

                // Find Relations between entities in the current sentence
                const foundRelations = sentence.findRelations(entitiesInCurrentSentence, relationDefinitions);

                // Append found relations to the context
                context.relations.push(...foundRelations);
            }
        }
        context.redux();

        // Combine all relevant entities from the context for BPRS calculation
        const allRelevantEntities = [...context.problems, ...context.therapies];

        // Calculate BPRS Score after all entities have been identified
        const bprsResult = BPRS.process(context.problems, dataset.bprs);

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

        console.log("Punteggi BPRS per Categoria:");
        let i = 0;
        for (const categoryId in bprsResult.itemScores)
        {
            const formattedIndex = String(i + 1).padStart(2, '0');
            console.log(`${formattedIndex} - ${bprsResult.itemScores[categoryId].name}: ${bprsResult.itemScores[categoryId].score}`);
            i++;
        }
        console.log(`Punteggio BPRS Totale: ${bprsResult.totalScore}`);

        return context; // Make sure to return the populated context object
    }
}

module.exports = Med;