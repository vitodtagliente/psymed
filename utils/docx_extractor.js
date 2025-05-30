const mammoth = require('mammoth');
const fs = require('fs').promises; // Usiamo le Promises di fs per un'estrazione asincrona più pulita

/**
 * Estrae il testo da un file DOCX specificato dal percorso.
 * @param {string} docxFilePath Il percorso completo del file DOCX.
 * @returns {Promise<string|null>} Una Promise che si risolve con il testo estratto o null in caso di errore.
 */
async function extractTextFromDocx(docxFilePath)
{
    try
    {
        // Verifica se il file esiste
        await fs.access(docxFilePath);

        // mammoth.extractRawText() è più semplice per il nostro scopo,
        // ma mammoth.extractText() restituisce HTML se vuoi una formattazione più ricca.
        const result = await mammoth.extractRawText({ path: docxFilePath });

        // mammoth restituisce un oggetto con 'value' (il testo) e 'messages' (eventuali avvisi/errori)
        const text = result.value; // Il contenuto testuale
        const messages = result.messages; // Eventuali messaggi di avvertimento o errore durante l'estrazione

        if (messages.length > 0)
        {
            console.warn(`Avvisi durante l'estrazione dal DOCX (${docxFilePath}):`, messages);
        }

        if (!text || text.trim() === '')
        {
            console.warn(`Il file DOCX (${docxFilePath}) potrebbe essere vuoto o non contenere testo estraibile.`);
            return null;
        }

        return text;

    } catch (error)
    {
        if (error.code === 'ENOENT')
        {
            console.error(`Errore: Il file DOCX non trovato al percorso: ${docxFilePath}`);
        } else
        {
            console.error(`Errore durante l'estrazione del testo dal DOCX (${docxFilePath}):`, error);
        }
        return null;
    }
}

module.exports = {
    extractTextFromDocx
};