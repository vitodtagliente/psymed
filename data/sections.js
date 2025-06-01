module.exports = [
    { name: "diagnosi_accettazione", patterns: ["diagnosi di accettazione:", "diagnosi principale"], order: 10 },
    { name: "inizio_ricovero_e_condizioni_iniziali", patterns: ["inizio ricovero", "il paziente giunge in clinica accompagnato dalla figlia"], order: 20 },
    { name: "esame_psichico_iniziale", patterns: ["esame psichico", "paziente lucido, vigile"], order: 30 },
    {
        name: "storia_clinica", patterns: [
            "l’esordio psicotico risale",
            "riferite numeri episodi di aggressività",
            "concomitanti all’abuso alcolico e cocaina",
            "tale sintomatologia si è notevolmente affermata",
            "in passato il paziente ha pscritto una produzione delirante",
            "è seguitda dal CIM dal dottor Longhi con incontri mensili"
        ], order: 40
    },
    { name: "decorso_ricovero", patterns: [/\b\d{1,2}\.\d{1,2}\.\d{4}\b/], order: 50 },
    { name: "fine_ricovero_e_condizioni_finali", patterns: ["fine ricovero", "il paziente viene dimesso"], order: 60 },
    { name: "diagnosi_di_dimissione", patterns: ["diagnosi di dimissione:"], order: 70 }
];