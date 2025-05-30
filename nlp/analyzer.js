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
        return { problems: [], therapies: [], bfrs: {}, gaf: {}, relations: [], sections: [] };
    }

    const results = {
        problems: [],
        therapies: [],
        bfrs: {},
        gaf: {},
        relations: [],
        sections: [] // Nuova proprietà per i risultati per sezione
    };

    const sections = identifySections(medicalText);

    // Analizza ogni sezione individualmente
    for (const section of sections)
    {
        const sectionAnalysis = analyzeSectionText(section.text, dictionaries, findEntities, checkNegation);

        // Aggiungi il nome della sezione e il testo originale alla sezione analizzata
        const sectionResult = {
            name: section.name,
            text: section.text, // Il testo della sezione
            problems: [],
            therapies: [],
            relations: [] // Le relazioni specifiche di questa sezione
        };

        // Processa problemi di salute per questa sezione
        sectionAnalysis.problems.forEach(p =>
        {
            const problemData = {
                text: p.text,
                label: p.label,
                isNegated: p.isNegated,
                attributes: extractAttributes(section.text, p), // Estrai attributi nella sezione specifica
                section: section.name // Aggiungi la sezione all'entità
            };
            results.problems.push(problemData); // Aggiungi alla lista globale
            sectionResult.problems.push(problemData); // Aggiungi alla lista per sezione
        });

        // Processa terapie per questa sezione
        sectionAnalysis.therapies.forEach(t =>
        {
            const therapyData = {
                text: t.text,
                label: t.label,
                isNegated: t.isNegated,
                attributes: extractAttributes(section.text, t), // Estrai attributi nella sezione specifica
                section: section.name // Aggiungi la sezione all'entità
            };
            results.therapies.push(therapyData); // Aggiungi alla lista globale
            sectionResult.therapies.push(therapyData); // Aggiungi alla lista per sezione
        });

        // Per le relazioni, raggruppiamo tutte le entità rilevate in questa sezione
        const allEntitiesInThisSection = [...sectionResult.problems, ...sectionResult.therapies];
        const relationsInThisSection = extractRelations(section.text, allEntitiesInThisSection);

        relationsInThisSection.forEach(rel =>
        {
            rel.section = section.name; // Aggiungi la sezione alla relazione
            results.relations.push(rel); // Aggiungi alla lista globale
            sectionResult.relations.push(rel); // Aggiungi alla lista per sezione
        });

        results.sections.push(sectionResult); // Aggiungi la sezione analizzata ai risultati
    }

    // BFRs e GAF di solito si basano sull'intero referto, non su singole sezioni.
    // Li calcoliamo sul testo completo.
    results.bfrs = await calculateBFRs(medicalText);
    results.gaf = await calculateGAF(medicalText);

    return results;
}

module.exports = {
    analyzeMedicalText
};