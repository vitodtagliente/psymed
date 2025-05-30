const { normalizeText } = require('../utils/text_processor');
const { relationPatterns } = require('../config/dictionary');
const { findEntities } = require('./entity_recognizer'); // Potrebbe essere necessario per trovare le entità coinvolte

/**
 * Estrae le relazioni tra le entità in una data frase.
 * @param {string} sentence La frase in cui cercare le relazioni.
 * @param {Array<object>} detectedEntities Tutte le entità già rilevate nella frase (da analyzer.js).
 * @returns {Array<object>} Un array di oggetti relazione.
 */
function extractRelations(sentence, detectedEntities)
{
    const normalizedSentence = normalizeText(sentence);
    const relations = [];

    relationPatterns.forEach(relationDef =>
    {
        // Itera su tutte le combinazioni possibili di entità rilevate che corrispondono ai tipi attesi
        // per questa relazione (es. Problema + Terapia).
        const type1Entities = detectedEntities.filter(ent => ent.label === relationDef.entities[0]);
        const type2Entities = detectedEntities.filter(ent => ent.label === relationDef.entities[1]);

        type1Entities.forEach(ent1 =>
        {
            type2Entities.forEach(ent2 =>
            {
                // Prepara i testi delle entità per la regex (normalizzati ed escapati)
                const escapedEnt1 = normalizeText(ent1.text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const escapedEnt2 = normalizeText(ent2.text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                // Crea il pattern dinamico per la relazione
                // L'ordine delle entità nel pattern è importante (es. (A) relaziona con (B) )
                let pattern;
                try
                {
                    pattern = relationDef.pattern(escapedEnt1, escapedEnt2);
                } catch (e)
                {
                    // Gestisci errori nella creazione della regex se i pattern sono complessi
                    console.error("Errore nella creazione del pattern di relazione:", e);
                    return;
                }

                if (pattern.test(normalizedSentence))
                {
                    relations.push({
                        type: relationDef.name,
                        entity1: ent1,
                        entity2: ent2
                        // Potresti aggiungere: span della relazione, testo della relazione, ecc.
                    });
                }
            });
        });
    });

    return relations;
}

module.exports = {
    extractRelations
};