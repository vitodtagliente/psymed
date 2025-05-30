// nlp/entityRecognizer.js

const { normalizeText, stemItalian } = require('../utils/text_processor'); // Importa stemItalian

/**
 * Trova entità (problemi di salute o terapie) in una frase utilizzando lo stemming.
 * @param {string} sentence La frase originale da analizzare.
 * @param {string[]} keywords Un array di parole chiave da cercare (queste verranno stemmate internamente).
 * @param {string} label L'etichetta da assegnare all'entità.
 * @returns {Array<object>} Un array di entità trovate, con testo originale e label.
 */
function findEntities(sentence, keywords, label)
{
    const foundEntities = [];
    const normalizedSentence = normalizeText(sentence); // Normalizza la frase per consistenza

    // Tokenizza la frase normalizzata in parole e stemmale
    const originalWords = normalizedSentence.split(/\s+/).filter(Boolean); // Rimuovi stringhe vuote
    const stemmedWords = originalWords.map(word => stemItalian(word));

    // Iteriamo su ogni keyword fornita nel dizionario
    for (const keyword of keywords)
    {
        const normalizedKeyword = normalizeText(keyword);
        const stemmedKeywordTokens = normalizedKeyword.split(/\s+/).map(word => stemItalian(word)).filter(Boolean);

        // Se la keyword stemmata è vuota (es. era solo punteggiatura), saltala
        if (stemmedKeywordTokens.length === 0) continue;

        // Cerchiamo la sequenza di parole stemmate della keyword all'interno delle parole stemmate della frase
        for (let i = 0; i <= stemmedWords.length - stemmedKeywordTokens.length; i++)
        {
            let matchFound = true;
            for (let j = 0; j < stemmedKeywordTokens.length; j++)
            {
                if (stemmedWords[i + j] !== stemmedKeywordTokens[j])
                {
                    matchFound = false;
                    break;
                }
            }

            if (matchFound)
            {
                // Abbiamo trovato un match nella versione stemmata.
                // Ora dobbiamo recuperare la porzione di testo *originale* corrispondente.
                const matchedOriginalText = originalWords.slice(i, i + stemmedKeywordTokens.length).join(' ');

                // Aggiungiamo l'entità solo se non è già stata trovata (per evitare duplicati se più keyword
                // stemmano alla stessa radice o se ci sono sovrapposizioni nelle keyword).
                const alreadyFound = foundEntities.some(ent => ent.text === matchedOriginalText && ent.label === label);
                if (!alreadyFound)
                {
                    foundEntities.push({
                        text: matchedOriginalText,
                        label: label
                    });
                }
                // Una volta trovata la keyword più lunga e specifica,
                // possiamo considerare di non cercare keyword più corte che potrebbero essere un sottoinsieme.
                // L'ordinamento delle keyword nel dizionario (dal più lungo al più corto)
                // dovrebbe già aiutare in questo, ma lo stemming può alterare le lunghezze.
                // Per un controllo più rigoroso, potremmo rimuovere i token già abbinati
                // dalla `stemmedWords` o segnarli come "usati". Per ora, lo lasciamo così.
            }
        }
    }
    return foundEntities;
}

module.exports = {
    findEntities
};