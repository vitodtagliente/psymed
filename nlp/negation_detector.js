// nlp/negationDetector.js

const { normalizeText } = require('../utils/text_processor');
const { negationPrefixes, negationSuffixes, terminationPhrases, pseudoNegations } = require('../config/dictionary');

/**
 * Controlla se un'entità è negata all'interno della frase fornita.
 * Implementa una logica più sofisticata per l'ambito e le pseudo-negazioni.
 * @param {string} sentence La frase completa in cui cercare.
 * @param {string} entityText Il testo dell'entità da controllare (es. "dolore toracico").
 * @returns {boolean} True se l'entità è negata, False altrimenti.
 */
function checkNegation(sentence, entityText)
{
    const normalizedSentence = normalizeText(sentence);
    const normalizedEntityText = normalizeText(entityText);

    // Escape special characters in entityText for regex
    const escapedEntity = normalizedEntityText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // --- Controllo Pseudo-Negazioni (Prioritario) ---
    // Se la frase contiene una pseudo-negazione immediatamente prima o dopo l'entità,
    // potrebbe invalidare una negazione diretta. Questo richiede un'attenta calibrazione.
    // Per ora, concentriamoci sulla rilevazione delle negazioni vere.

    // --- Controllo Negazioni Precedenti ---
    for (const prefix of negationPrefixes)
    {
        const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Regex per trovare il prefisso seguito dall'entità.
        // (?:\\s+\\w+){0,X}? per permettere fino a X parole intermedie tra negatore ed entità
        // Un numero più piccolo di parole intermedie (es. 3-5) rende la negazione più specifica.
        // Consideriamo anche '.*?' per matchare qualsiasi carattere non-newline in mezzo,
        // ma la limitazione di parole è spesso più accurata per l'ambito medico.
        const pattern = new RegExp(`\\b${escapedPrefix}\\s+(?:\\w+\\s+){0,5}?\\b${escapedEntity}\\b`, 'i');
        const match = normalizedSentence.match(pattern);

        if (match)
        {
            const negationStartIndex = normalizedSentence.indexOf(prefix); // Trova l'inizio del prefisso negatore
            const entityStartIndex = match.index + match[0].indexOf(escapedEntity); // Trova l'inizio dell'entità matchata

            // Verifica se una frase terminante si trova tra il negatore e l'entità.
            // Se sì, la negazione non si applica all'entità.
            let foundTermination = false;
            for (const term of terminationPhrases)
            {
                const termIndex = normalizedSentence.indexOf(normalizeText(term), negationStartIndex + prefix.length);
                if (termIndex !== -1 && termIndex < entityStartIndex)
                {
                    foundTermination = true;
                    break;
                }
            }
            if (!foundTermination)
            {
                return true; // Negazione trovata e non terminata
            }
        }
    }

    // --- Controllo Negazioni Successive ---
    for (const suffix of negationSuffixes)
    {
        const escapedSuffix = suffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Regex per trovare l'entità seguita dal suffisso.
        const pattern = new RegExp(`\\b${escapedEntity}(?:\\s+\\w+){0,5}?\\s+\\b${escapedSuffix}\\b`, 'i');
        const match = normalizedSentence.match(pattern);

        if (match)
        {
            const entityEndIndex = match.index + match[0].indexOf(escapedEntity) + escapedEntity.length;
            const negationStartIndex = match.index + match[0].indexOf(escapedSuffix);

            // Verifica se una frase terminante si trova tra l'entità e il negatore.
            let foundTermination = false;
            for (const term of terminationPhrases)
            {
                const termIndex = normalizedSentence.indexOf(normalizeText(term), entityEndIndex);
                if (termIndex !== -1 && termIndex < negationStartIndex)
                {
                    foundTermination = true;
                    break;
                }
            }
            if (!foundTermination)
            {
                return true; // Negazione trovata e non terminata
            }
        }
    }

    // --- Regola per le Pseudo-Negazioni ---
    // Questo è un livello di sofisticazione aggiuntivo:
    // Se trovi una negazione, ma immediatamente prima o dopo c'è una pseudo-negazione,
    // potresti voler "disattivare" la negazione. Questo è molto contestuale.
    // Esempio: "nonostante il dolore non grave" - "non grave" è negato, ma "nonostante" la rende una qualificazione.
    // Per ora, questa logica non è inclusa direttamente nella funzione, ma potresti aggiungerla
    // come filtro finale se una negazione è stata rilevata dai pattern precedenti.
    /*
    for (const pseudo of pseudoNegations) {
        const escapedPseudo = pseudo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pseudoPattern = new RegExp(`\\b${escapedPseudo}\\s+.*${escapedEntity}\\b|\\b${escapedEntity}.*\\s+${escapedPseudo}\\b`, 'i');
        if (pseudoPattern.test(normalizedSentence)) {
            // Se una pseudo-negazione è presente in prossimità, potrebbe indicare che la negazione
            // non è una negazione "forte" del sintomo, ma una qualificazione.
            // Questa è una logica complessa che richiede molti test.
            // Per ora, evitiamo di complicare troppo.
        }
    }
    */

    return false; // Nessuna negazione rilevata per l'entità
}

module.exports = {
    checkNegation
};