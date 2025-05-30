module.exports = {
    /**
     * @property {object} indicators - Defines various functional indicators, each with associated keywords.
     * These indicators represent different aspects of an individual's daily functioning and adaptation.
     */
    indicators: {
        "funzionamento_sociale_compromesso": [
            "isolamento sociale",
            "difficoltà relazionali",
            "non socializza"
        ],
        "funzionamento_lavorativo_compromesso": [
            "problemi lavoro",
            "disoccupato",
            "difficoltà professionali",
            "licenziato"
        ],
        "cura_di_sé_compromessa": [
            "igiene scarsa",
            "trascurato",
            "non si prende cura di sé"
        ],
        "funzionamento_eccellente": [
            "funzionamento eccellente",
            "ben adattato",
            "produttivo",
            "socialmente attivo"
        ]
        // Add other relevant indicators here as needed.
    },

    /**
     * @property {object} ranges - Defines GAF's ranges
     */
    ranges: [
        {
            score_range: "1-10",
            description: "Grave e persistente compromissione, rischio di ferirsi o ferire altri.",
            keywords: [
                "rischio suicidario elevato", "pericolo per sé", "pericoloso per altri",
                "incapace di mantenere l'igiene personale", "incapace di comunicare",
                "atto suicidario grave", "violenza grave", "non autonomo", "costante supervisione"
            ]
        },
        {
            score_range: "11-20",
            description: "Grave compromissione in quasi tutte le aree, a volte rischio per sé/altri.",
            keywords: [
                "deliri invalidanti", "allucinazioni persistenti", "grave disorganizzazione",
                "comportamento gravemente inappropriato", "isolamento estremo",
                "non in grado di lavorare o studiare", "totalmente dipendente"
            ]
        },
        {
            score_range: "21-30",
            description: "Grave compromissione nella comunicazione e giudizio, grave disfunzione sociale/lavorativa.",
            keywords: [
                "compromissione del giudizio", "compromissione del test di realtà",
                "gravi problemi di comunicazione", "gravi problemi sociali", "non in grado di mantenere un lavoro",
                "grave incuria di sé", "incapace di vivere autonomamente"
            ]
        },
        {
            score_range: "31-40",
            description: "Alcune gravi compromissioni nel test di realtà o comunicazione, oppure compromissione maggiore in più aree.",
            keywords: [
                "allucinazioni occasionali", "deliri occasionali", "discorso incoerente",
                "comportamento inadeguato", "non ha amici", "incapacità di lavorare",
                "grave ansia generalizzata", "attacchi di panico frequenti e debilitanti"
            ]
        },
        {
            score_range: "41-50",
            description: "Gravi sintomi o grave compromissione in una o due aree (sociale, lavorativa, scolastica).",
            keywords: [
                "sintomi gravi", "depressione maggiore grave", "disturbi bipolari gravi",
                "problemi lavorativi significativi", "pochissimi amici", "conflitti familiari gravi",
                "difficoltà a prendersi cura di sé", "igiene scarsa"
            ]
        },
        {
            score_range: "51-60",
            description: "Sintomi moderati o moderate difficoltà sociali, lavorative, scolastiche.",
            keywords: [
                "sintomi moderati", "depressione moderata", "ansia moderata",
                "problemi a scuola", "problemi a lavoro", "difficoltà interpersonali",
                "isolamento occasionale", "umore altalenante"
            ]
        },
        {
            score_range: "61-70",
            description: "Alcuni sintomi lievi o difficoltà sociali, lavorative, scolastiche, ma generalmente funziona bene.",
            keywords: [
                "sintomi lievi", "ansia lieve", "tristezza temporanea",
                "lavora con difficoltà", "mancanza di motivazione", "irritabilità occasionale",
                "dorme male", "difficoltà di concentrazione"
            ]
        },
        {
            score_range: "71-80",
            description: "Se i sintomi sono presenti, sono reazioni prevedibili a stress psicosociali. Nessuna compromissione significativa.",
            keywords: [
                "reazione allo stress", "stress transitorio", "lievi difficoltà",
                "normali preoccupazioni", "senza compromissione", "ben adattato"
            ]
        },
        {
            score_range: "81-90",
            description: "Sintomi assenti o minimi. Buon funzionamento, nessuna compromissione significativa.",
            keywords: [
                "sintomi assenti", "nessun problema", "funzionamento normale",
                "ben adattato", "produttivo", "socialmente attivo", "sereno"
            ]
        },
        {
            score_range: "91-100",
            description: "Funzionamento superiore, nessun sintomo. Vita piena e soddisfacente.",
            keywords: [
                "funzionamento superiore", "assenza di sintomi", "eccellente adattamento",
                "molto produttivo", "relazioni soddisfacenti", "piena autonomia", "benessere"
            ]
        }
    ]
};