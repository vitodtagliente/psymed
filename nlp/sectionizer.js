const { sectionPatterns } = require('../config/dictionary');
const { tokenizeSentences } = require('../utils/text_processor'); // Useremo il tokenizer per frasi

/**
 * Rappresenta una sezione di testo estratta.
 * @typedef {object} Section
 * @property {string} name Il nome identificativo della sezione (es. "anamnesi").
 * @property {number} start L'indice di inizio della sezione nel testo originale.
 * @property {number} end L'indice di fine della sezione nel testo originale.
 * @property {string} text Il testo contenuto in questa sezione.
 */

/**
 * Identifica le sezioni all'interno di un testo medico.
 * @param {string} fullText Il testo completo del referto medico.
 * @returns {Array<Section>} Un array di oggetti Section.
 */
function identifySections(fullText)
{
    const sections = [];
    let currentSectionStart = 0;
    let currentSectionName = "unspecified"; // Sezione di default per il testo iniziale o non categorizzato

    // Per evitare problemi con maiuscole/minuscole e spazi extra
    const normalizedFullText = fullText.toLowerCase();

    // Raccoglie tutti i potenziali indici di inizio delle sezioni
    const potentialSectionStarts = [];
    sectionPatterns.forEach(sectionDef =>
    {
        sectionDef.patterns.forEach(pattern =>
        {
            const regex = new RegExp(`\\b${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'gi'); // 'g' per trovare tutte le occorrenze
            let match;
            while ((match = regex.exec(fullText)) !== null)
            { // Usa fullText originale per gli indici corretti
                potentialSectionStarts.push({
                    index: match.index,
                    name: sectionDef.name,
                    // length: match[0].length // Potrebbe servire se si vuole escludere l'intestazione dal testo della sezione
                });
            }
        });
    });

    // Ordina i punti di inizio per garantire la sequenza corretta
    potentialSectionStarts.sort((a, b) => a.index - b.index);

    // Itera sui punti di inizio per definire le sezioni
    for (let i = 0; i < potentialSectionStarts.length; i++)
    {
        const sectionStart = potentialSectionStarts[i];

        // Prima di aggiungere la nuova sezione, chiudiamo la precedente
        if (i > 0 || currentSectionStart > 0)
        { // Se non è la prima sezione, o se c'è un testo iniziale non categorizzato
            const previousSectionEnd = sectionStart.index;
            const sectionText = fullText.substring(currentSectionStart, previousSectionEnd).trim();
            if (sectionText.length > 0)
            {
                sections.push({
                    name: currentSectionName,
                    start: currentSectionStart,
                    end: previousSectionEnd,
                    text: sectionText
                });
            }
        }

        currentSectionStart = sectionStart.index; // Inizia la nuova sezione dall'indice della sua intestazione
        currentSectionName = sectionStart.name;
    }

    // Aggiungi l'ultima sezione (dal penultimo punto di inizio alla fine del testo)
    if (currentSectionStart < fullText.length)
    {
        const sectionText = fullText.substring(currentSectionStart, fullText.length).trim();
        if (sectionText.length > 0)
        {
            sections.push({
                name: currentSectionName,
                start: currentSectionStart,
                end: fullText.length,
                text: sectionText
            });
        }
    }

    // Filtra e pulisci le sezioni.
    // La logica qui sopra include l'intestazione nel testo della sezione.
    // Se vuoi escludere l'intestazione, dovresti modificare l'substring.
    // Per semplicità, possiamo mantenere l'intestazione, oppure aggiungere un campo 'headerText'.

    return sections;
}


/**
 * Analizza le entità e le negazioni all'interno di una sezione specifica.
 * @param {string} sectionText Il testo della sezione.
 * @param {object} dictionaries Oggetto con i dizionari (problemi, terapie, ecc.).
 * @param {function} findEntities Funzione per trovare entità.
 * @param {function} checkNegation Funzione per controllare negazioni.
 * @returns {object} Un oggetto con problemi e terapie trovate nella sezione.
 */
function analyzeSectionText(sectionText, dictionaries, findEntities, checkNegation)
{
    const sentences = tokenizeSentences(sectionText);
    const sectionResults = {
        problems: [],
        therapies: []
    };

    sentences.forEach(sentence =>
    {
        const foundProblems = findEntities(sentence, dictionaries.problemiSaluteKeywords, "PROBLEMA_SALUTE");
        foundProblems.forEach(ent =>
        {
            sectionResults.problems.push({
                text: ent.text,
                label: ent.label,
                isNegated: checkNegation(sentence, ent.text)
            });
        });

        const foundTerapies = findEntities(sentence, dictionaries.terapieKeywords, "TERAPIA");
        foundTerapies.forEach(ent =>
        {
            sectionResults.therapies.push({
                text: ent.text,
                label: ent.label,
                isNegated: checkNegation(sentence, ent.text)
            });
        });
    });

    return sectionResults;
}


module.exports = {
    identifySections,
    analyzeSectionText
};