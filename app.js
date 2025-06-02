const path = require('path');
const DataSet = require('./data/dataset');
const FileReader = require('./src/io/file_reader');
const PsyMed = require('./src/psymed');

async function main() {
    const filePath = path.join(__dirname, '/docs/ubaldini_ubaldo.docx');
    const fileContent = await FileReader.read(filePath);

    if (!fileContent) {
        console.error("Impossibile estrarre il testo dal file. Uscita.");
        return;
    }

    PsyMed.process(fileContent, DataSet);
}

// Avvia la funzione principale
main().catch(error => {
    console.error("Si � verificato un errore critico nell'applicazione:", error);
});