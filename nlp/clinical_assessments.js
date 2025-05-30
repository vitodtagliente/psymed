const { findEntities } = require('./entity_recognizer');
const { checkNegation } = require('./negation_detector');
const { tokenizeSentences } = require('../utils/text_processor');
const { normalizeText } = require('../utils/text_processor');
const { bfrsItems, gafIndicators, severityOrder, bfrsSeverityToScore, gafRanges } = require('../config/dictionary');

/**
 * Tenta di calcolare il BFRs (Brief Psychiatric Rating Scale)
 * basandosi sulla presenza di keyword e modificatori di gravità nel testo.
 * AVVERTENZA: Questa è una stima molto approssimativa e NON è una valutazione clinica valida.
 * Non può determinare la gravità in modo affidabile, solo la possibile presenza e una stima.
 * @param {string} medicalText Il testo medico da analizzare.
 * @returns {object} Un oggetto con gli item del BFRs, un flag 'is_present', una 'severity_estimate'
 * e il 'score' numerico per ogni item, più il 'total_score'.
 */
async function calculateBFRs(medicalText)
{
    const sentences = tokenizeSentences(medicalText);
    const bfrsResults = {};
    let totalBFRsScore = 0; // Inizializza il punteggio totale

    const normalizedText = normalizeText(medicalText);

    for (const itemKey in bfrsItems)
    {
        const itemDef = bfrsItems[itemKey];
        let isPresent = false;
        let severityEstimate = "assente"; // Default per item non presenti
        let itemScore = bfrsSeverityToScore["assente"]; // Default score

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
            bfrsResults[itemKey] = { is_present: false, severity_estimate: severityEstimate, score: itemScore };
            totalBFRsScore += itemScore; // Aggiungi il punteggio di default (1)
            continue; // Passa al prossimo item del BFRs
        }

        isPresent = true; // Se almeno un'occorrenza non negata è trovata

        // Step 2: Se presente, cerca i modificatori di gravità
        let highestSeverityFound = "lieve"; // Partiamo dalla più bassa se presente

        // Cerca i modificatori in tutto il testo per questo item
        for (const severityLevel of severityOrder)
        {
            if (severityLevel === "assente") continue;

            const modifiers = itemDef.modifiers[severityLevel];
            if (modifiers)
            {
                for (const modifierKeyword of modifiers)
                {
                    const escapedModifier = modifierKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                    // Regex che cerca il modificatore vicino a una delle keyword dell'item
                    const itemKeywordsRegex = itemDef.keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
                    const pattern = new RegExp(`\\b${escapedModifier}\\s+(?:\\w+\\s+){0,5}?(?:${itemKeywordsRegex})\\b|` +
                        `(?:${itemKeywordsRegex})\\s+(?:\\w+\\s+){0,5}?\\b${escapedModifier}\\b`, 'i');

                    if (pattern.test(normalizedText))
                    {
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
        itemScore = bfrsSeverityToScore[severityEstimate]; // Mappa la stima a un punteggio numerico

        bfrsResults[itemKey] = { is_present: isPresent, severity_estimate: severityEstimate, score: itemScore };
        totalBFRsScore += itemScore; // Aggiungi al punteggio totale
    }

    return { items: bfrsResults, total_score: totalBFRsScore }; // Restituisce sia gli item che il totale
}

/**
 * Tenta di stimare il GAF (Global Assessment of Functioning)
 * basandosi sulla presenza di indicatori nel testo.
 * AVVERTENZA: Questa è una stima molto approssimativa e NON è una valutazione clinica valida.
 * Non può assegnare un punteggio numerico affidabile in modo autonomo.
 * @param {string} medicalText Il testo medico da analizzare.
 * @returns {object} Un oggetto con la 'gaf_estimate_range' e il 'gaf_score_estimate' (un punto medio del range).
 */
async function calculateGAF(medicalText) {
    const sentences = tokenizeSentences(medicalText);
    const normalizedText = normalizeText(medicalText); // Normalizza una volta

    let estimatedGafRange = "Non definito";
    let estimatedGafScore = 0; // Default

    // Ordina i range dal più basso al più alto (gravità crescente) per trovare il "peggior funzionamento" rilevato
    // La logica standard del GAF è assegnare il punteggio più basso/grave che il paziente soddisfa.
    // Qui iteriamo sui range dal più basso (1-10) al più alto (91-100).
    // Il primo range per cui troviamo keyword non negate è la nostra stima.

    // Itera in ordine inverso per trovare il più grave (più basso) range applicabile.
    // L'array gafRanges è già ordinato dal più grave (1-10) al meno grave (91-100) per chiarezza.
    for (const rangeDef of gafRanges) {
        let foundKeywordsInThisRange = false;
        for (const keyword of rangeDef.keywords) {
            const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const pattern = new RegExp(`\\b${escapedKeyword}\\b`, 'i');

            if (pattern.test(normalizedText)) { // Cerca la keyword nel testo completo
                // Verifica negazione per l'occorrenza della keyword
                // Qui è un po' più complesso, dovremmo cercare l'esatta occorrenza e poi la negazione.
                // Per semplificare, se la keyword è presente e non c'è una negazione *vicina* alla keyword.
                // Una logica più robusta richiederebbe di passare ogni match attraverso checkNegation.
                
                // Troviamo tutte le occorrenze della keyword e verifichiamo se almeno una non è negata
                let anyNotNegated = false;
                const keywordRegex = new RegExp(`(${escapedKeyword})`, 'gi');
                let match;
                while ((match = keywordRegex.exec(normalizedText)) !== null) {
                    const matchedText = match[0];
                    // Recuperiamo la frase contenente il match (approssimazione)
                    const sentenceAroundMatch = normalizedText.substring(
                        Math.max(0, match.index - 50),
                        Math.min(normalizedText.length, match.index + matchedText.length + 50)
                    );
                    if (!checkNegation(sentenceAroundMatch, matchedText)) {
                        anyNotNegated = true;
                        break;
                    }
                }

                if (anyNotNegated) {
                    foundKeywordsInThisRange = true;
                    break; // Trovato un indicatore per questo range, non cercare oltre per questo range
                }
            }
        }

        if (foundKeywordsInThisRange) {
            estimatedGafRange = rangeDef.score_range;
            // Calcola il punto medio del range come stima numerica
            const [minScore, maxScore] = rangeDef.score_range.split('-').map(Number);
            estimatedGafScore = Math.round((minScore + maxScore) / 2);
            break; // Abbiamo trovato il range più grave rilevato, interrompi la ricerca
        }
    }

    return { gaf_estimate_range: estimatedGafRange, gaf_score_estimate: estimatedGafScore };
}

module.exports = {
    calculateBFRs,
    calculateGAF
};