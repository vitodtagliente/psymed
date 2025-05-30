const { normalizeText } = require('../utils/text_processor');
const { attributeModifiers } = require('../config/dictionary');

/**
 * Estrae gli attributi di un'entità in una data frase.
 * @param {string} sentence La frase in cui si trova l'entità.
 * @param {object} entity L'oggetto entità (es. { text: "dolore", label: "PROBLEMA_SALUTE" }).
 * @returns {object} Un oggetto con gli attributi estratti per l'entità.
 */
function extractAttributes(sentence, entity)
{
    const normalizedSentence = normalizeText(sentence);
    const normalizedEntityText = normalizeText(entity.text);
    const attributes = {};

    // Per ogni tipo di attributo (gravità, cronicità, ecc.)
    for (const attrType in attributeModifiers)
    {
        const modifiers = attributeModifiers[attrType];
        // Per ogni valore dell'attributo (lieve, cronico, ecc.)
        for (const attrValue in modifiers)
        {
            const keywords = modifiers[attrValue];
            for (const keyword of keywords)
            {
                const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const escapedEntity = normalizedEntityText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                // Pattern per trovare l'attributo vicino all'entità.
                // Cerchiamo l'attributo prima o dopo l'entità, entro X parole.
                // Puoi affinare la distanza o la direzione (solo prima/dopo).
                const pattern = new RegExp(
                    `\\b(?:${escapedKeyword})\\s+(?:\\w+\\s+){0,3}?\\b${escapedEntity}\\b|` + // attributo prima dell'entità (max 3 parole)
                    `\\b${escapedEntity}\\s+(?:\\w+\\s+){0,3}?\\b(?:${escapedKeyword})\\b`,     // attributo dopo l'entità (max 3 parole)
                    'i'
                );

                if (pattern.test(normalizedSentence))
                {
                    // Trovato un attributo
                    // Se più attributi dello stesso tipo vengono trovati (es. "lieve ma grave" - raro),
                    // la logica qui dovrà decidere quale prevale (es. l'ultimo, il primo).
                    // Per semplicità, il primo trovato per tipo.
                    if (!attributes[attrType])
                    { // Solo se non abbiamo già trovato un attributo di questo tipo
                        attributes[attrType] = attrValue;
                    }
                    break; // Passa alla prossima keyword per questo attrType
                }
            }
        }
    }
    return attributes;
}

module.exports = {
    extractAttributes
};