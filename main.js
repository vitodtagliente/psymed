// index.js

const path = require('path');
const { extractTextFromPdf } = require('./utils/pdf_extractor');
const { analyzeMedicalText } = require('./nlp/analyzer'); // Importa la nuova funzione di analisi

async function main()
{
    /*
    const pdfFilePath = path.join(__dirname, 'referto.pdf'); // Assicurati di avere un file 'referto.pdf' nella root del progetto

    console.log(`Caricamento ed estrazione del testo dal file: ${pdfFilePath}`);
    const fullText = await extractTextFromPdf(pdfFilePath);

    if (!fullText) {
        console.error("Impossibile estrarre il testo dal PDF. Uscita.");
        return;
    }
    */

    const fullText = `
        Referto Medico

        Paziente: Mario Rossi
        Data: 28/05/2025

        Anamnesi: Il paziente ha una storia di ipertensione, ma non ha mai sofferto di insufficienza cardiaca. Nega qualsiasi dolore toracico recente. È stato in terapia con paracetamolo per una cefalea occasionale l'anno scorso. Assenza di precedenti di diabete mellito. Non si segnala asma.

        Esame Obiettivo: Condizioni generali buone. Assenza di segni di influenza. La pressione arteriosa è ben controllata. Nessuna evidenza di broncopneumopatia cronica ostruttiva.

        Terapia in atto: Attualmente assume un beta-bloccante per l'ipertensione. Gli è stato prescritto un ciclo di antibiotico per una recente infezione respiratoria, ma non ha iniziato la chemioterapia.

        Diagnosi: Ipertensione essenziale ben compensata. Sospetta infezione respiratoria batterica, per la quale è stata iniziata la terapia. Nessuna diagnosi di artrite.

        Conclusioni: Il paziente è stabile e la prognosi è favorevole.
    `;

    console.log("Testo estratto con successo. Avvio analisi NLP...");
    const analysisResults = await analyzeMedicalText(fullText); // Chiama la funzione di analisi

    console.log("\n--- Risultati dell'Analisi del Referto ---");
    console.log("Problemi di Salute:");
    analysisResults.problems.forEach(p => console.log(`  - ${p.text} (Sezione: ${p.section}, Negato: ${p.isNegated}), Attributi: ${JSON.stringify(p.attributes)}`));

    console.log("\nTerapie:");
    analysisResults.therapies.forEach(t => console.log(`  - ${t.text} (Sezione: ${t.section}, Negato: ${t.isNegated}), Attributi: ${JSON.stringify(t.attributes)}`));

    console.log("\n--- Relazioni Estratte ---");
    if (analysisResults.relations.length > 0)
    {
        analysisResults.relations.forEach(rel =>
        {
            console.log(`  - Tipo: ${rel.type}, Entità 1: "${rel.entity1.text}" (${rel.entity1.label}), Entità 2: "${rel.entity2.text}" (${rel.entity2.label}) (Sezione: ${rel.section})`);
        });
    } else
    {
        console.log("Nessuna relazione trovata.");
    }

    console.log("\n--- Stima BFRs ---");
    for (const item in analysisResults.bfrs)
    {
        const itemData = analysisResults.bfrs[item];
        if (itemData.is_present)
        {
            console.log(`  - ${item}: Presente (Stima gravità: ${itemData.severity_estimate.charAt(0).toUpperCase() + itemData.severity_estimate.slice(1)})`);
        } else
        {
            console.log(`  - ${item}: Assente`);
        }
    }

    console.log("\n--- Stima GAF ---");
    for (const indicator in analysisResults.gaf)
    {
        console.log(`  - ${indicator}: ${analysisResults.gaf[indicator].is_present ? 'Presente' : 'Assente (non rilevato)'}`);
    }

    console.log("\n--- Analisi per Sezione ---");
    analysisResults.sections.forEach(section =>
    {
        console.log(`\n### Sezione: ${section.name.toUpperCase()} ###`);
        console.log(`Testo della sezione (prime 100 char): "${section.text.substring(0, 100)}..."`);
        if (section.problems.length > 0)
        {
            console.log("  Problemi:");
            section.problems.forEach(p => console.log(`    - ${p.text} (Negato: ${p.isNegated})`));
        }
        if (section.therapies.length > 0)
        {
            console.log("  Terapie:");
            section.therapies.forEach(t => console.log(`    - ${t.text} (Negato: ${t.isNegated})`));
        }
        if (section.relations.length > 0)
        {
            console.log("  Relazioni:");
            section.relations.forEach(rel => console.log(`    - ${rel.type}: ${rel.entity1.text} -> ${rel.entity2.text}`));
        }
        if (section.problems.length === 0 && section.therapies.length === 0 && section.relations.length === 0)
        {
            console.log("  Nessuna entità o relazione rilevata in questa sezione.");
        }
    });
}

// Avvia la funzione principale
main().catch(error =>
{
    console.error("Si è verificato un errore critico nell'applicazione:", error);
});