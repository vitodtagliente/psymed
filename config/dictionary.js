const problemiSaluteKeywords = [
    // ... (termini medici generali esistenti) ...

    // --- Disturbi dell'Umore ---
    "disturbo depressivo maggiore",
    "episodio depressivo maggiore",
    "disturbo bipolare tipo 1",
    "disturbo bipolare tipo 2",
    "disturbo distimico",
    "ideazione suicidaria",
    "tentato suicidio",
    "crisi suicidaria",
    "umore depresso",
    "depressione",
    "depresso",
    "tristezza",
    "disperazione",
    "anedonia",
    "apatia",
    "perdita di interesse",
    "sensi di colpa",
    "autocondanna",
    "pensieri di morte",
    "mania",
    "ipomania",
    "umore elevato",
    "euforia",
    "irritabilità",
    "iperattività",
    "grandiosità",
    "fuga delle idee",

    // --- Disturbi d'Ansia e Correlati allo Stress ---
    "ansia generalizzata",
    "disturbo d'ansia generalizzata",
    "attacchi di panico",
    "disturbo di panico",
    "agorafobia",
    "fobia sociale",
    "fobia specifica",
    "disturbo ossessivo-compulsivo",
    "stress post-traumatico",
    "disturbo da stress post-traumatico",
    "disturbo da stress acuto",
    "disturbi di adattamento",
    "ansia",
    "ansioso",
    "nervosismo",
    "agitazione",
    "tensione",
    "irrequietezza",
    "preoccupazione",
    "fobia",
    "ossessioni",
    "compulsioni",

    // --- Disturbi Psicotici ---
    "disorganizzazione concettuale",
    "insolito contenuto del pensiero",
    "mancanza di insight",
    "ritiro emotivo",
    "manierismi e posture bizzarre",
    "disturbo schizoaffettivo",
    "schizofrenia",
    "psicosi",
    "disturbo psicotico",
    "allucinazioni",
    "deliri",
    "voci",
    "visioni",
    "sospettosità",
    "paranoia",
    "idee persecutorie",
    "pensiero disorganizzato",
    "appiattimento affettivo",
    "alogia",
    "ritiro sociale",

    // --- Disturbi di Personalità ---
    "disturbo di personalità borderline",
    "disturbo di personalità narcisistica",
    "disturbo di personalità antisociale",
    "disturbo di personalità",
    "instabilità emotiva",
    "impulsività",

    // --- Disturbi Neurocognitivi e Correlati ---
    "demenza di alzheimer",
    "demenza vascolare",
    "malattia di alzheimer",
    "parkinson con demenza",
    "corpi di lewy",
    "disturbo neurocognitivo",
    "demenza",
    "delirium",
    "confusione mentale",
    "disorientamento",
    "deficit cognitivo",
    "amnesia",
    "afasia",
    "aprassia",
    "agnosia",

    // --- Disturbi da Uso di Sostanze ---
    "dipendenza da sostanze",
    "abuso di sostanze",
    "alcolismo",
    "dipendenza da alcol",
    "tossicodipendenza",
    "astinenza",
    "intossicazione acuta",

    // --- Altri Sintomi o Condizioni Comuni ---
    "disturbo del sonno",
    "insonnia",
    "anoressia nervosa",
    "bulimia nervosa",
    "disturbo del comportamento alimentare",
    "crisi epilettiche",
    "cefalea tensiva",
    "conversione",
    "crisi convulsive",

    // ... (altri termini medici generali) ...
];

const terapieKeywords = [
    // ... (termini medici generali esistenti, es. "paracetamolo", "fans", "insulina", "antibiotico") ...

    // --- Farmaci Antidepressivi ---
    "inibitori selettivi della ricaptazione della serotonina",
    "SSRI",
    "fluoxetina",
    "sertralina",
    "paroxetina",
    "citalopram",
    "escitalopram",
    "fluvoxamina",
    "antidepressivi triciclici",
    "TCA",
    "amitriptilina",
    "imipramina",
    "nortriptilina",
    "clomipramina",
    "venlafaxina",
    "duloxetina",
    "bupropione",
    "mirtazapina",
    "trazodone",
    "agomelatina",
    "vortioxetina",

    // --- Farmaci Ansiolitici / Benzodiazepine ---
    "benzodiazepina",
    "lorazepam",
    "alprazolam",
    "diazepam",
    "clonazepam",
    "bromazepam",
    "oxazepam",
    "buspirone",
    "idrossizina",

    // --- Farmaci Antipsicotici ---
    "antipsicotico atipico",
    "risperidone",
    "olanzapina",
    "quetiapina",
    "aripiprazolo",
    "ziprasidone",
    "clozapina",
    "amisulpride",
    "lurasidone",
    "antipsicotico tipico",
    "aloperidolo",
    "clorpromazina",
    "flufenazina",

    // --- Stabilizzatori dell'Umore ---
    "stabilizzatore dell'umore",
    "carbonato di litio",
    "acido valproico",
    "litio",
    "valproato",
    "lamotrigina",
    "carbamazepina",
    "topiramato",

    // --- Interventi Psicoterapeutici / Non Farmacologici ---
    "terapia cognitivo-comportamentale",
    "terapia dialettico-comportamentale",
    "psicoterapia dinamica",
    "psicoterapia psicodinamica",
    "terapia interpersonale",
    "terapia familiare",
    "terapia di gruppo",
    "supporto psicologico",
    "ricovero psichiatrico",
    "trattamento sanitario obbligatorio",
    "riabilitazione psichiatrica",
    "terapia elettroconvulsivante",
    "stimolazione magnetica transcranica",
    "psicoterapia",
    "counseling",
    "cbt",
    "dbt",
    "tso",
    "tec",
    "tms",

    // --- Altri Farmaci Rilevanti ---
    "metilfenidato",
    "atomoxetina",
    "zolpidem",
    "zopiclone",

    // ... (altri termini medici generali) ...
];

const negationPrefixes = [
    "non", "nessun", "assenza di", "negazione di", "senza", "no evidenza di",
    "nessuna traccia di", "negativo per", "non si osserva", "non riscontrato",
    "esclude", "assente", "escluso", "non presente", "non riferito"
];

const negationSuffixes = [
    "assente", "negativo", "escluso", "non evidenziato", "non riscontrato",
    "non presente", "non riferito"
];

// Parole o frasi che possono interrompere la negazione
const terminationPhrases = [
    "ma", "tuttavia", "ad eccezione di", "sebbene", "eccetto", "anche se", ".", ",", ";" // Aggiungere punteggiatura per terminare
];

// Parole che possono sembrare negazioni ma spesso non lo sono in un contesto medico,
// o che modificano il significato in modo diverso dalla negazione diretta.
const pseudoNegations = [
    "nonostante", "a parte", "tranne", "più di", "meno di", "difficilmente",
    "parzialmente", "quasi", "potrebbe essere", "sospetto per", "non escludo"
];

const bfrsItems = {
    "ansia": {
        keywords: ["ansia", "ansioso", "preoccupazione", "agitazione", "tensione"],
        modifiers: {
            "grave": ["grave", "severa", "intensa", "paralizzante", "costante", "insopportabile"],
            "moderata": ["moderata", "discreta", "significativa", "persistente"],
            "lieve": ["lieve", "minima", "occasionale", "transitoria"],
            "assente": ["assente", "non presente", "nessuna"] // Per la negazione
        }
    },
    "depressione": {
        keywords: ["depressione", "depresso", "tristezza", "umore basso", "anedonia", "apatia"],
        modifiers: {
            "grave": ["grave", "profonda", "marcata", "invalidante", "disperazione"],
            "moderata": ["moderata", "persistente", "significativa"],
            "lieve": ["lieve", "transitoria", "occasionale"],
            "assente": ["assente", "non presente", "nessuna"]
        }
    },
    "preoccupazione_somatica": { // Item 1 BPRs
        keywords: ["preoccupazioni somatiche", "dolori fisici", "malesseri", "sintomi fisici non giustificati"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "ritiro_emotivo": { // Item 2 BPRs
        keywords: ["ritiro emotivo", "isolamento", "chiuso in sé", "distaccato", "freddezza emotiva", "appiattimento affettivo"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "disorganizzazione_concettuale": { // Item 3 BPRs
        keywords: ["disorganizzazione del pensiero", "pensiero incoerente", "difficoltà a concentrarsi", "salto di idee"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "manierismi_e_posture_bizzarre": { // Item 4 BPRs
        keywords: ["manierismi", "posture bizzarre", "movimenti insoliti", "tics"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "tensione": { // Item 5 BPRs
        keywords: ["tensione", "nervosismo", "irrequietezza", "agitazione psicomotoria"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "maniacalità": { // Item 6 BPRs
        keywords: ["maniacalità", "euforia", "iperattività", "grandiosità", "irritabilità marcata"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "ostilita": { // Item 7 BPRs
        keywords: ["ostilità", "rabbia", "irritabilità", "aggressività", "collera"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "sospettosita": { // Item 8 BPRs
        keywords: ["sospettosità", "paranoia", "diffidenza", "credenze persecutorie"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "allucinazioni": { // Item 9 BPRs
        keywords: ["allucinazioni", "voci", "visioni", "percezioni anomale"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "disorientamento": { // Item 10 BPRs
        keywords: ["disorientamento", "confusione", "perdita di lucidità", "difficoltà a riconoscere luoghi/persone"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "anedonia": { // Item 11 BPRs (spesso legato a depressione, ma separato nel BPRS)
        keywords: ["anedonia", "mancanza di piacere", "perdita di interesse"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "mancanza_di_insight": { // Item 12 BPRs
        keywords: ["mancanza di insight", "negazione della malattia", "non consapevole della patologia"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "insolito_contenuto_del_pensiero": { // Item 13 BPRs
        keywords: ["deliri", "idee fisse", "pensiero insolito", "irrazionale", "credenze bizzarre"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "ritardo_psicomotorio": { // Item 14 BPRs
        keywords: ["ritardo psicomotorio", "rallentamento", "bradicinesia", "lentezza nei movimenti"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "apatia": { // Item 15 BPRs (spesso legato a depressione, ma separato nel BPRS)
        keywords: ["apatia", "mancanza di motivazione", "indifferenza", "passività"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "difficolta_di_concentrazione": { // Item 16 BPRs
        keywords: ["difficoltà di concentrazione", "distraibilità", "deficit attentivo"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "colpa": { // Item 17 BPRs
        keywords: ["sensi di colpa", "autocondanna", "senso di indegnità"],
        modifiers: { /* definisci i modificatori di gravità */ }
    },
    "ideazione_suicidaria": {
        keywords: ["ideazione suicidaria", "pensieri di morte", "desiderio di morire", "intenzione di farsi del male", "propositi suicidi"],
        modifiers: {
            "grave": ["grave", "persistente", "con piano", "immediato"],
            "moderata": ["moderata", "occasionale", "fluttuante"],
            "lieve": ["lieve", "rara", "non specifica"],
            "assente": ["assente", "non presente", "nessuna"]
        }
    }
};

// Ordine di gravità (dal più al meno grave per prevalenza)
const severityOrder = ["grave", "moderata", "lieve", "assente"];

// Mappatura della stima di gravità a un punteggio numerico (scala 1-7 per BFRs)
// 1 = non presente, 7 = estremamente grave
const bfrsSeverityToScore = {
    "assente": 1,         // Non presente
    "lieve": 3,           // Lieve (tra 2-3 della scala BFRs)
    "moderata": 5,        // Moderata (tra 4-5 della scala BFRs)
    "grave": 7            // Grave (tra 6-7 della scala BFRs)
};

const gafIndicators = {
    "funzionamento_sociale_compromesso": ["isolamento sociale", "difficoltà relazionali", "non socializza"],
    "funzionamento_lavorativo_compromesso": ["problemi lavoro", "disoccupato", "difficoltà professionali", "licenziato"],
    "cura_di_sé_compromessa": ["igiene scarsa", "trascurato", "non si prende cura di sé"],
    "funzionamento_eccellente": ["funzionamento eccellente", "ben adattato", "produttivo", "socialmente attivo"]
    // Aggiungi altri indicatori rilevanti
};

// Attributi Comuni
const attributeModifiers = {
    // Gravità
    "gravita": {
        "lieve": ["lieve", "moderato", "scarso", "minimo"],
        "moderata": ["moderato", "discreto"],
        "grave": ["grave", "severo", "intenso", "marcato", "critico"],
        "assente": ["assente", "non presente", "nessun", "zero"]
    },
    // Cronicità / Decorso
    "cronicità": {
        "acuto": ["acuto", "improvviso", "recente"],
        "cronico": ["cronico", "persistente", "di lunga data", "da anni"],
        "in remissione": ["in remissione", "regredito", "risolto"]
    },
    // Stato (per condizioni)
    "stato_condizione": {
        "controllato": ["controllato", "ben gestito", "stabile", "compensato"],
        "non controllato": ["non controllato", "scompensato", "instabile", "aggravato"],
        "migliorato": ["migliorato", "in regressione"],
        "peggiorato": ["peggiorato", "in progressione", "deteriorato"]
    },
    // Frequenza (per sintomi)
    "frequenza": {
        "occasionale": ["occasionale", "saltuario"],
        "frequente": ["frequente", "ricorrente", "spesso"],
        "costante": ["costante", "continuo"]
    }
    // Aggiungi altri attributi rilevanti (es. localizzazione per dolore, tipo per diabete)
};

// Regole per le Relazioni
const relationPatterns = [
    // TRATTATO_CON: "Problema trattato con Terapia"
    {
        name: "TRATTATO_CON",
        pattern: (problem, therapy) => new RegExp(`\\b${problem}\\s+(?:è|è stato|fu|viene)?\\s*(?:trattato|curato|gestito)\\s+(?:con|mediante|grazie a)\\s+${therapy}\\b`, 'i'),
        entities: ["PROBLEMA_SALUTE", "TERAPIA"]
    },
    // CAUSATO_DA: "Problema causato da Problema"
    {
        name: "CAUSATO_DA",
        pattern: (cause, effect) => new RegExp(`\\b${effect}\\s+(?:causato|dovuto|derivante|conseguente)\\s+(?:da|a)\\s+${cause}\\b`, 'i'),
        entities: ["PROBLEMA_SALUTE", "PROBLEMA_SALUTE"] // Es. "dolore dovuto a frattura"
    },
    // ASSUME_PER: "Paziente assume Terapia per Problema"
    {
        name: "ASSUME_PER",
        pattern: (therapy, problem) => new RegExp(`\\b(?:assume|sta assumendo|prescritto|dato)\\s+${therapy}\\s+(?:per|a causa di|data l')\\s+${problem}\\b`, 'i'),
        entities: ["TERAPIA", "PROBLEMA_SALUTE"]
    }
    // Aggiungi altre relazioni comuni che ti interessano
    // Es. "ASSOCIAZIONE": "Sintomo associato a [altro sintomo/condizione]"
    // Es. "LOCALIZZAZIONE": "[sintomo] a livello [parte del corpo]"
];

// Regole per il rilevamento delle sezioni
const sectionPatterns = [
    { name: "anamnesi", patterns: ["anamnesi:", "storia clinica:"] },
    { name: "esame_obiettivo", patterns: ["esame obiettivo:", "e.o.:", "obiettività:"] },
    { name: "diagnosi", patterns: ["diagnosi:", "diagnosi principale:"] },
    { name: "terapia", patterns: ["terapia:", "terapia in atto:", "piano terapeutico:"] },
    { name: "conclusioni", patterns: ["conclusioni:", "considerazioni finali:"] },
    { name: "prognosi", patterns: ["prognosi:"] },
    { name: "esami_strumentali", patterns: ["esami strumentali:", "indagini strumentali:", "imaging:"] },
    { name: "laboratorio", patterns: ["esami di laboratorio:", "laboratorio:"] }
    // Aggiungi altre sezioni comuni che trovi nei tuoi referti
];

const gafRanges = [
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
];

problemiSaluteKeywords.sort((a, b) => b.length - a.length);
terapieKeywords.sort((a, b) => b.length - a.length);

module.exports = {
    problemiSaluteKeywords,
    terapieKeywords,
    negationPrefixes,
    negationSuffixes,
    terminationPhrases,
    bfrsItems,
    gafIndicators,
    pseudoNegations,
    attributeModifiers,
    relationPatterns,
    sectionPatterns,
    severityOrder,
    bfrsSeverityToScore,
    gafRanges,
};