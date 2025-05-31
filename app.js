const path = require('path');
const DataSet = require('./data/dataset');
const FileReader = require('./src/io/file_reader');
const Med = require('./src/med');

async function main() {
    const filePath = path.join(__dirname, '/docs/ubaldini_ubaldo.docx');
    const fileContent = await FileReader.read(filePath);

    if (!fileContent) {
        console.error("Impossibile estrarre il testo dal file. Uscita.");
        return;
    }

    Med.process(fileContent, DataSet);
}

// Avvia la funzione principale
main().catch(error => {
    console.error("Si è verificato un errore critico nell'applicazione:", error);
});