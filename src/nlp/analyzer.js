const { tokenizeSentences } = require('../utils/text_processor');
const { findEntities } = require('./entity_recognizer');
const { checkNegation } = require('./negation_detector');
const { problemiSaluteKeywords, terapieKeywords } = require('../config/dictionary');
const { calculateBFRs, calculateGAF } = require('./clinical_assessments');
const { extractAttributes } = require('./attribute_extractor');
const { extractRelations } = require('./relation_extractor');
const { identifySections, analyzeSectionText } = require('./sectionizer'); // NUOVO import
const dictionaries = require('../config/dictionary'); // Importa tutti i dizionari

/**
 * Elabora il testo di un referto medico per estrarre problemi di salute e terapie,
 * inclusa la rilevazione di negazioni.
 * @param {string} medicalText Il testo del referto medico da analizzare.
 * @returns {Promise<object>} Un oggetto contenente array di problemi e terapie, con stato di negazione.
 */
async function analyzeMedicalText(medicalText)
{
    if (!medicalText)
    {
        console.log("Testo vuoto fornito per l'analisi.");
        return { problems: [], therapies: [], bfrs: { items: {}, total_score: 0 }, gaf: { gaf_estimate_range: "Non definito", gaf_score_estimate: 0 }, relations: [], sections: [] };
    }

    const results = {
        problems: [],
        therapies: [],
        bfrs: { items: {}, total_score: 0 },
        gaf: { gaf_estimate_range: "Non definito", gaf_score_estimate: 0 }, // Inizializza correttamente
        relations: [],
        sections: []
    };

    const sections = identifySections(medicalText);

    for (const section of sections)
    {
        const sectionAnalysis = analyzeSectionText(section.text, dictionaries, findEntities, checkNegation);

        const sectionResult = {
            name: section.name,
            text: section.text,
            problems: [],
            therapies: [],
            relations: []
        };

        sectionAnalysis.problems.forEach(p =>
        {
            const problemData = {
                text: p.text,
                label: p.label,
                isNegated: p.isNegated,
                attributes: extractAttributes(section.text, p),
                section: section.name
            };
            results.problems.push(problemData);
            sectionResult.problems.push(problemData);
        });

        sectionAnalysis.therapies.forEach(t =>
        {
            const therapyData = {
                text: t.text,
                label: t.label,
                isNegated: t.isNegated,
                attributes: extractAttributes(section.text, t),
                section: section.name
            };
            results.therapies.push(therapyData);
            sectionResult.therapies.push(therapyData);
        });

        const allEntitiesInThisSection = [...sectionResult.problems, ...sectionResult.therapies];
        const relationsInThisSection = extractRelations(section.text, allEntitiesInThisSection);

        relationsInThisSection.forEach(rel =>
        {
            rel.section = section.name;
            results.relations.push(rel);
            sectionResult.relations.push(rel);
        });

        results.sections.push(sectionResult);
    }

    const bfrsResult = await calculateBFRs(medicalText);
    results.bfrs.items = bfrsResult.items;
    results.bfrs.total_score = bfrsResult.total_score;

    // Aggiorna come segue per il GAF
    const gafResult = await calculateGAF(medicalText);
    results.gaf.gaf_estimate_range = gafResult.gaf_estimate_range;
    results.gaf.gaf_score_estimate = gafResult.gaf_score_estimate;

    return results;
}

module.exports = {
    analyzeMedicalText
};