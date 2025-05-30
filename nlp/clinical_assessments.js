const { findEntities } = require('./entity_recognizer');
const { checkNegation } = require('./negation_detector');
const { tokenizeSentences } = require('../utils/text_processor');
const { normalizeText } = require('../utils/text_processor');
const { bfrsItems, gafIndicators, severityOrder } = require('../config/dictionary');

/**
 * Tenta di calcolare il BFRs (Brief Psychiatric Rating Scale)
 * basandosi sulla presenza di keyword e modificatori di gravità nel testo.
 * AVVERTENZA: Questa è una stima molto approssimativa e NON è una valutazione clinica valida.
 * Non può determinare la gravità in modo affidabile, solo la possibile presenza e una stima.
 * @param {string} medicalText Il testo medico da analizzare.
 * @returns {object} Un oggetto con gli item del BFRs, un flag 'is_present' e una 'severity_estimate'.
 */
async function calculateBFRs(medicalText)
{
    const sentences = tokenizeSentences(medicalText);
    const bfrsResults = {};
    const normalizedText = normalizeText(medicalText); // Normalizza una volta per il testo completo

    for (const itemKey in bfrsItems)
    {
        const itemDef = bfrsItems[itemKey];
        let isPresent = false;
        let severityEstimate = "non rilevato"; // Default

        // Step 1: Trova le keyword dell'item e verifica la negazione
        let foundOccurrences = [];
        for (const sentence of sentences)
        {
            const foundInSentence = findEntities(sentence, itemDef.keywords, itemKey);
            foundInSentence.forEach(ent =>
            {
                foundOccurrences.push({
                    text: ent.text,
                    isNegated: checkNegation(sentence, ent.text)
                });
            });
        }

        // Se non ci sono occorrenze non negate, l'item è assente
        const anyNotNegated = foundOccurrences.some(occ => !occ.isNegated);
        if (!anyNotNegated)
        {
            bfrsResults[itemKey] = { is_present: false, severity_estimate: "assente" };
            continue; // Passa al prossimo item del BFRs
        }

        isPresent = true; // Se almeno un'occorrenza non negata è trovata

        // Step 2: Se presente, cerca i modificatori di gravità nell'intero testo (o nelle frasi vicine)
        let highestSeverityFound = "lieve"; // Partiamo dalla più bassa se presente
        for (const severityLevel of severityOrder)
        {
            if (severityLevel === "assente") continue; // Già gestito dalla negazione

            const modifiers = itemDef.modifiers[severityLevel];
            if (modifiers)
            {
                // Per ogni modificatore di gravità, cerca la sua presenza vicino alle keyword dell'item
                for (const modifierKeyword of modifiers)
                {
                    // Costruisci una regex che cerca la keyword dell'item E il modificatore di gravità nella stessa frase
                    // oppure in prossimità nel testo completo se il pattern è più elastico.
                    // Per semplicità, cerchiamo il modificatore nella frase.
                    const escapedModifier = modifierKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                    // Regex che cerca il modificatore vicino a una delle keyword dell'item
                    // (es. "ansia grave", "grave depressione", "sintomi gravi di ansia")
                    // Questo è un punto da affinare: potrebbe usare `attributeExtractor` per trovare attributi
                    // di gravità specifici per le entità BFRs.
                    // Per ora, un approccio più semplice: se il modificatore è presente nella frase e la keyword è presente

                    // Un approccio più robusto potrebbe essere integrare qui l'attributeExtractor.
                    // Ad esempio, trovare l'entità "ansia" e poi cercare i suoi attributi di "gravità".
                    // Per mantenere separati i moduli, facciamo un controllo semplice qui.

                    const pattern = new RegExp(`\\b${escapedModifier}\\s+(?:\\w+\\s+){0,5}?(?:${itemDef.keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b|` +
                        `(?:${itemDef.keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s+(?:\\w+\\s+){0,5}?\\b${escapedModifier}\\b`, 'i');

                    if (pattern.test(normalizedText))
                    { // Cerca nel testo completo per più flessibilità
                        // Se troviamo un modificatore di gravità, e questo è più alto di quello già trovato, aggiorna.
                        const currentSeverityIndex = severityOrder.indexOf(highestSeverityFound);
                        const newSeverityIndex = severityOrder.indexOf(severityLevel);
                        if (newSeverityIndex !== -1 && newSeverityIndex < currentSeverityIndex)
                        {
                            highestSeverityFound = severityLevel;
                        }
                    }
                }
            }
        }
        severityEstimate = highestSeverityFound;

        bfrsResults[itemKey] = { is_present: isPresent, severity_estimate: severityEstimate };
    }
    return bfrsResults;
}

/**
 * Tenta di stimare il GAF (Global Assessment of Functioning)
 * basandosi sulla presenza di indicatori nel testo.
 * AVVERTENZA: Questa è una stima molto approssimativa e NON è una valutazione clinica valida.
 * Non può assegnare un punteggio numerico affidabile.
 * @param {string} medicalText Il testo medico da analizzare.
 * @returns {object} Un oggetto con indicatori GAF e un flag 'is_present'.
 */
async function calculateGAF(medicalText)
{
    const sentences = tokenizeSentences(medicalText);
    const gafResults = {};

    for (const indicator in gafIndicators)
    {
        let isPresent = false;
        for (const sentence of sentences)
        {
            const foundKeywords = findEntities(sentence, gafIndicators[indicator], indicator);
            if (foundKeywords.length > 0)
            {
                const anyNotNegated = foundKeywords.some(ent => !checkNegation(sentence, ent.text));
                if (anyNotNegated)
                {
                    isPresent = true;
                    break;
                }
            }
        }
        gafResults[indicator] = { is_present: isPresent };
    }
    return gafResults;
}

module.exports = {
    calculateBFRs,
    calculateGAF
};