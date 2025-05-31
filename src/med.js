const Context = require('./nlp/context');
const Entity = require('./nlp/entity');
const { findEntities } = require('./nlp/entity_recognizer');
const SectionProcessor = require('./nlp/section_processor');
const Text = require('./utils/text');

class Med
{
    static process(text, dataset)
    {
        const context = new Context;

        const sections = SectionProcessor.identify(text, dataset.sections);
        for (const section of sections)
        {
            const sentences = Text.tokenizeSentences(section);
            for (let sentence of sentences)
            {
                context.problems = Entity.find(sentence, dataset.problems, "PROBLEMA_SALUTE");
                context.therapies = Entity.find(sentence, dataset.therapies, "TERAPIA");
            }
        }

        console.log(`${context.problems.length} Problems:`);
        for (const entity of context.problems)
        {
            console.log(entity);
        }
        console.log(`${context.therapies.length} Therapies:`);
        for (const entity of context.therapies)
        {
            console.log(entity);
        }
    }
}

module.exports = Med;