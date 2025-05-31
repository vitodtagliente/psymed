// index.js

const path = require('path');
const { analyzeMedicalText } = require('./src/nlp/analyzer'); // Importa la nuova funzione di analisi
const FileReader = require('./src/io/file_reader');
const DataSet = require('./data/dataset');
const Med = require('./src/med');

async function main()
{
    const filePath = path.join(__dirname, '/docs/ubaldini_ubaldo.docx');
    const fileContent = await FileReader.read(filePath);

    if (!fileContent)
    {
        console.error("Impossibile estrarre il testo dal file. Uscita.");
        return;
    }

    Med.process(fileContent, DataSet);

    return;
    
    console.log("Testo estratto con successo. Avvio analisi NLP...");
    const analysisResults = await analyzeMedicalText(fileContent); // Chiama la funzione di analisi

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
    for (const item in analysisResults.bfrs.items)
    {
        const itemData = analysisResults.bfrs.items[item];
        if (itemData.is_present)
        {
            console.log(`  - ${item}: Presente (Stima gravità: ${itemData.severity_estimate.charAt(0).toUpperCase() + itemData.severity_estimate.slice(1)}, Punteggio: ${itemData.score})`);
        }
        else
        {
            console.log(`  - ${item}: Assente (Punteggio: ${itemData.score})`);
        }
    }
    console.log(`\n**PUNTEGGIO BFRS TOTALE STIMATO: ${analysisResults.bfrs.total_score}**`); // Nuovo output per il totale

    console.log("\n--- Stima GAF ---");
    console.log(`  - Range Stimato: ${analysisResults.gaf.gaf_estimate_range}`);
    console.log(`  - Punteggio GAF Stimato: ${analysisResults.gaf.gaf_score_estimate}`);


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