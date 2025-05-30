// utils/textProcessor.js

const sentenceBoundaryDetector = require('sbd');
// Importa WordTokenizer per suddividere il testo in parole
// Importa StemmerId per lo stemming in italiano
const { WordTokenizer, StemmerId } = require('natural');

// Inizializza il tokenizer di parole. Lo useremo per suddividere le frasi in singole parole
const tokenizer = new WordTokenizer();

/**
 * Tokenizza il testo in frasi.
 * @param {string} text Il testo da tokenizzare.
 * @returns {string[]} Un array di frasi.
 */
function tokenizeSentences(text)
{
    // sbd è ottimo per la tokenizzazione delle frasi.
    return sentenceBoundaryDetector.sentences(text, {
        newline_boundaries: true, // Considera i salti di riga come confini di frase
        sanitize: true,           // Rimuovi caratteri di controllo non stampabili
        allowed_tags: []          // Non ci aspettiamo tag HTML
    });
}

/**
 * Normalizza il testo rimuovendo caratteri non essenziali e riducendo a minuscolo.
 * Mantiene le lettere accentate italiane e apostrofi, utili per la lingua.
 * @param {string} text Il testo da normalizzare.
 * @returns {string} Il testo normalizzato.
 */
function normalizeText(text)
{
    // Questo regex rimuove tutto ciò che non è:
    // - Lettere minuscole dalla 'a' alla 'z'
    // - Numeri dalla '0' alla '9'
    // - Lettere accentate italiane (àèéìòù)
    // - Apostrofo (')
    // - Spazio (-)
    return text.toLowerCase().replace(/[^a-z0-9àèéìòùáéíóúç' -]/g, ' ');
}

/**
 * Applica lo stemming alle parole in una stringa (che può essere una parola o una frase).
 * Utilizza lo stemmer italiano di Natural.
 * @param {string} textToStem La parola o la frase da stemmare.
 * @returns {string} La stringa con le parole stemmate, riunite da spazi.
 */
function stemItalian(textToStem)
{
    // Suddivide la stringa in parole, applica lo stemmer a ciascuna parola,
    // e poi riunisce le parole stemmate in una singola stringa.
    const stemmedWords = tokenizer.tokenize(textToStem).map(word => StemmerId.stem(word));
    return stemmedWords.join(' ');
}

module.exports = {
    tokenizeSentences,
    normalizeText,
    stemItalian // Esporta la nuova funzione per renderla disponibile
};