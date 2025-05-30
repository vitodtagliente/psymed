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
    // 1. Preoccupazione Somatica
    "preoccupazione_somatica": {
        keywords: [
            "preoccupazioni somatiche", "lamentele somatiche", "dolori fisici", "malesseri fisici",
            "sintomi fisici non giustificati", "somatizzazione", "ipocondria"
        ],
        modifiers: {
            "estrema": ["gravemente preoccupato per la salute", "ossessivo riguardo ai sintomi", "invalidato da sintomi fisici"],
            "grave": ["intense preoccupazioni somatiche", "numerosi disturbi fisici", "frequenti lamentele fisiche", "gravi", "severi"],
            "moderata": ["moderate lamentele fisiche", "preoccupazioni persistenti per il corpo", "discreto numero di sintomi"],
            "lieve": ["poche lamentele fisiche", "preoccupazioni occasionali", "lievi disturbi somatici"],
            "assente": ["nessuna preoccupazione somatica", "nessuna lamentela fisica", "assenti"]
        }
    },
    // 2. Ritiro Emotivo
    "ritiro_emotivo": {
        keywords: [
            "ritiro emotivo", "isolamento sociale", "distacco emotivo", "freddezza emotiva",
            "appiattimento affettivo", "espressione emotiva ridotta", "risposta emotiva assente"
        ],
        modifiers: {
            "estrema": ["completo isolamento", "totalmente ritirato", "assenza totale di contatto", "senza risposta emotiva"],
            "grave": ["significativo ritiro", "grave isolamento", "emotivamente non reattivo", "appiattimento marcato"],
            "moderata": ["moderato ritiro", "difficoltà a connettersi emotivamente", "reazioni emotive attenuate"],
            "lieve": ["lieve distacco", "occasionale ritiro", "emozioni un po' contenute"],
            "assente": ["nessun ritiro emotivo", "contatto emotivo normale", "assenti"]
        }
    },
    // 3. Disorganizzazione Concettuale
    "disorganizzazione_concettuale": {
        keywords: [
            "disorganizzazione del pensiero", "pensiero incoerente", "associazione allentata",
            "deragliamento", "illogicità", "incoerenza", "salto di idee", "difficoltà a concentrarsi"
        ],
        modifiers: {
            "estrema": ["totalmente incoerente", "discorso incomprensibile", "frammentazione estrema del pensiero"],
            "grave": ["grave disorganizzazione", "pensiero difficile da seguire", "numerosi deragliamenti", "logica compromessa"],
            "moderata": ["moderata disorganizzazione", "occasionale illogicità", "difficoltà nel seguire il filo del discorso"],
            "lieve": ["lievi associazioni allentate", "occasionale incoerenza", "piccole difficoltà di concentrazione"],
            "assente": ["pensiero coerente", "logico", "assenti"]
        }
    },
    // 4. Manierismi e Posture Bizzarre
    "manierismi_e_posture_bizzarre": {
        keywords: [
            "manierismi", "posture bizzarre", "movimenti insoliti", "tic", "stereotipie",
            "strane espressioni facciali", "gesti ripetitivi", "rigidità motoria"
        ],
        modifiers: {
            "estrema": ["comportamento totalmente bizzarro", "posture mantenute a lungo", "movimenti gravemente strani"],
            "grave": ["numerosi manierismi", "posture insolite frequenti", "comportamento strambo", "marcato", "persistente"],
            "moderata": ["moderati manierismi", "qualche postura insolita", "movimenti ripetitivi"],
            "lieve": ["lievi tic", "piccoli manierismi occasionali", "lievi movimenti strani"],
            "assente": ["nessun manierismo o postura bizzarra", "assenti"]
        }
    },
    // 5. Tensione
    "tensione": {
        keywords: [
            "tensione", "nervosismo", "irrequietezza", "agitazione", "ansia motoria",
            "rigidità muscolare", "tremori", "incapacità di rilassarsi"
        ],
        modifiers: {
            "estrema": ["tensione insopportabile", "agitazione estrema", "incapacità totale di stare fermo", "panico"],
            "grave": ["grave tensione", "agitazione marcata", "tremori costanti", "difficoltà a stare seduto"],
            "moderata": ["moderata tensione", "un po' irrequieto", "nervosismo evidente"],
            "lieve": ["lieve tensione", "un po' agitato", "lievi segni di nervosismo"],
            "assente": ["assenza di tensione", "calmo", "rilassato", "assenti"]
        }
    },
    // 6. Maniacalità
    "maniacalita": {
        keywords: [
            "maniacalità", "euforia", "iperattività", "grandiosità", "irritabilità marcata",
            "pensiero accelerato", "logorrea", "ridotta necessità di sonno", "eccessiva autostima"
        ],
        modifiers: {
            "estrema": ["mania grave", "euforia incontenibile", "iperattività pericolosa", "deliri di grandezza"],
            "grave": ["marcata euforia", "grave iperattività", "eloquio inarrestabile", "irritabilità estrema"],
            "moderata": ["moderata euforia", "più attivo del solito", "parla molto", "irritabilità"],
            "lieve": ["lieve elevazione dell'umore", "un po' più energico", "meno necessità di dormire"],
            "assente": ["umore normale", "nessun segno di mania", "assenti"]
        }
    },
    // 7. Ostilità
    "ostilita": {
        keywords: [
            "ostilità", "rabbia", "irritabilità", "aggressività", "collera",
            "comportamento antagonistico", "atteggiamento provocatorio", "risentimento"
        ],
        modifiers: {
            "estrema": ["violenza fisica", "aggressività incontrollabile", "minacce dirette e gravi"],
            "grave": ["marcata ostilità", "scoppi di rabbia frequenti", "comportamento aggressivo verbale", "minacce"],
            "moderata": ["moderata irritabilità", "discussioni frequenti", "atteggiamento critico"],
            "lieve": ["lieve irritabilità", "qualche segno di fastidio", "sguardi ostili occasionali"],
            "assente": ["nessuna ostilità", "cooperativo", "assenti"]
        }
    },
    // 8. Sospettosità
    "sospettosita": {
        keywords: [
            "sospettosità", "paranoia", "diffidenza", "credenze persecutorie", "idee di riferimento",
            "sensazione di essere osservato", "complotti"
        ],
        modifiers: {
            "estrema": ["deliri persecutori invalidanti", "assoluta sfiducia in tutti", "totale convinzione di essere perseguitato"],
            "grave": ["marcata sospettosità", "deliri persecutori", "diffidenza significativa", "non si fida di nessuno"],
            "moderata": ["moderata sospettosità", "dubbi frequenti sulle intenzioni altrui", "idee di riferimento occasionali"],
            "lieve": ["lieve diffidenza", "un po' cauto", "un po' sospettoso"],
            "assente": ["nessuna sospettosità", "fiducia negli altri", "assenti"]
        }
    },
    // 9. Allucinazioni
    "allucinazioni": {
        keywords: [
            "allucinazioni", "voci", "visioni", "percezioni anomale", "odori strani",
            "sensazioni tattili insolite", "allucinazioni uditive", "allucinazioni visive"
        ],
        modifiers: {
            "estrema": ["allucinazioni continue", "invalidanti", "guidano il comportamento", "pericolose"],
            "grave": ["allucinazioni frequenti", "voci dominanti", "disturbanti", "difficili da distinguere dalla realtà"],
            "moderata": ["allucinazioni occasionali", "meno frequenti", "il paziente ne è consapevole", "non sempre disturbanti"],
            "lieve": ["allucinazioni rare", "fugaci", "il paziente le riconosce come tali"],
            "assente": ["nessuna allucinazione", "assenti"]
        }
    },
    // 10. Disorientamento
    "disorientamento": {
        keywords: [
            "disorientamento", "confusione", "perdita di lucidità", "difficoltà a riconoscere luoghi",
            "difficoltà a riconoscere persone", "non sa dove si trova", "non sa che giorno è"
        ],
        modifiers: {
            "estrema": ["totalmente disorientato", "non riconosce nessuno", "incapace di orientarsi", "grave confusione"],
            "grave": ["disorientamento marcato", "confuso sulla persona, tempo, luogo", "errori frequenti di orientamento"],
            "moderata": ["moderato disorientamento", "confusione occasionale", "difficoltà con date o luoghi meno familiari"],
            "lieve": ["lieve disorientamento", "piccoli errori di orientamento", "momenti di lieve confusione"],
            "assente": ["orientato nel tempo e nello spazio", "lucido", "assenti"]
        }
    },
    // 11. Anedonia / Ritiro Sociale
    "anedonia_ritiro_sociale": {
        keywords: [
            "anedonia", "mancanza di piacere", "perdita di interesse", "isolamento sociale",
            "non prova più piacere", "ritiro dalle attività", "indifferenza"
        ],
        modifiers: {
            "estrema": ["totale mancanza di piacere", "completamente isolato", "incapacità di godere di nulla"],
            "grave": ["anedonia marcata", "grave ritiro sociale", "non partecipa ad attività", "non ha più interessi"],
            "moderata": ["moderata anedonia", "ridotto interesse per le attività", "socialmente meno attivo"],
            "lieve": ["lieve anedonia", "diminuito piacere in alcune cose", "meno propenso a socializzare"],
            "assente": ["capacità di provare piacere", "socialmente attivo", "assenti"]
        }
    },
    // 12. Mancanza di Insight
    "mancanza_di_insight": {
        keywords: [
            "mancanza di insight", "negazione della malattia", "non consapevole della patologia",
            "non riconosce i sintomi", "non crede di essere malato", "minimizzazione"
        ],
        modifiers: {
            "estrema": ["totale assenza di insight", "negazione totale della malattia", "non riconosce alcun sintomo"],
            "grave": ["grave mancanza di insight", "forte negazione", "attribuisce i problemi agli altri", "irremovibile"],
            "moderata": ["moderata mancanza di insight", "parziale consapevolezza", "minimizza i problemi", "dubbi"],
            "lieve": ["lieve mancanza di insight", "poca consapevolezza di alcune aree", "momenti di negazione"],
            "assente": ["piena consapevolezza della malattia", "riconosce i sintomi", "assenti"]
        }
    },
    // 13. Insolito Contenuto del Pensiero
    "insolito_contenuto_del_pensiero": {
        keywords: [
            "deliri", "idee fisse", "pensiero insolito", "irrazionale", "credenze bizzarre",
            "ideazione non comune", "pensiero magico", "idee sovrastimate", "riferimento"
        ],
        modifiers: {
            "estrema": ["deliri bizzarri e incontenibili", "convinzioni totalmente irrazionali che guidano il comportamento"],
            "grave": ["deliri dominanti", "idee fisse e pervasive", "pensiero irrazionale significativo"],
            "moderata": ["deliri occasionali", "idee sovrastimate", "pensiero un po' strano o atipico"],
            "lieve": ["pensieri insoliti fugaci", "idee strambe ma non deliranti", "curiosità per l'occulto"],
            "assente": ["contenuto del pensiero normale", "razionale", "assenti"]
        }
    },
    // 14. Ritardo Psicomotorio
    "ritardo_psicomotorio": {
        keywords: [
            "ritardo psicomotorio", "rallentamento", "bradicinesia", "lentezza nei movimenti",
            "risposta lenta", "ridotta mimica", "scarso movimento"
        ],
        modifiers: {
            "estrema": ["immobilismo", "catatonia", "totale lentezza", "risposta assente"],
            "grave": ["marcato rallentamento psicomotorio", "movimenti molto lenti", "eloquio rallentato", "mimica ridotta"],
            "moderata": ["moderato rallentamento", "meno spontaneo nei movimenti", "risposta un po' lenta"],
            "lieve": ["lieve lentezza", "meno energico del solito", "piccoli segni di rallentamento"],
            "assente": ["normali movimenti e attività", "assenti"]
        }
    },
    // 15. Apatia
    "apatia": {
        keywords: [
            "apatia", "mancanza di motivazione", "indifferenza", "passività",
            "aboulia", "perdita di iniziativa", "inerzia"
        ],
        modifiers: {
            "estrema": ["completa apatia", "mancanza totale di motivazione", "incapacità di iniziare attività"],
            "grave": ["marcata apatia", "grave mancanza di iniziativa", "indifferenza a tutto", "non si impegna"],
            "moderata": ["moderata apatia", "ridotta motivazione", "difficoltà a prendere decisioni"],
            "lieve": ["lieve apatia", "un po' meno motivato", "qualche incertezza"],
            "assente": ["motivato", "proattivo", "interessato", "assenti"]
        }
    },
    // 16. Difficoltà di Concentrazione
    "difficolta_di_concentrazione": {
        keywords: [
            "difficoltà di concentrazione", "distraibilità", "deficit attentivo",
            "attenzione ridotta", "fatica a focalizzarsi", "non riesce a seguire un discorso"
        ],
        modifiers: {
            "estrema": ["incapacità totale di concentrarsi", "attenzione frammentata", "non segue alcun discorso"],
            "grave": ["grave deficit di attenzione", "facilmente distraibile", "non riesce a completare compiti", "si perde nei pensieri"],
            "moderata": ["moderata difficoltà di concentrazione", "distraibilità", "meno attento del solito"],
            "lieve": ["lieve difficoltà a concentrarsi", "a volte distratto", "piccoli cali di attenzione"],
            "assente": ["buona concentrazione", "attenzione mantenuta", "assenti"]
        }
    },
    // 17. Colpa
    "colpa": {
        keywords: [
            "sensi di colpa", "autocondanna", "senso di indegnità", "autorimprovero",
            "credenze di colpa", "responsabilità eccessiva"
        ],
        modifiers: {
            "estrema": ["deliri di colpa", "convincimento di essere una persona orribile", "autocondanna assoluta"],
            "grave": ["gravi sensi di colpa", "pensieri persistenti di indegnità", "si autoaccusa continuamente"],
            "moderata": ["moderati sensi di colpa", "si sente spesso in colpa", "si critica molto"],
            "lieve": ["lievi sensi di colpa", "occasionali autocritiche", "un po' responsabile"],
            "assente": ["nessun senso di colpa", "non si autoaccusa", "assenti"]
        }
    },
    // 18. Ideazione Suicidaria
    "ideazione_suicidaria": {
        keywords: [
            "ideazione suicidaria", "pensieri di morte", "desiderio di morire", "intenzione di farsi del male",
            "propositi suicidi", "pianificazione suicidaria", "tentato suicidio" // Tentato suicidio è un atto, ma può essere un indicatore di ideazione passata
        ],
        modifiers: {
            "estrema": ["piano suicidario imminente", "tentativo di suicidio recente", "rischio vitale immediato"],
            "grave": ["ideazione suicidaria persistente", "con piano ma senza intento immediato", "forti propositi suicidi"],
            "moderata": ["ideazione suicidaria occasionale", "desiderio di non vivere", "pensieri di morte"],
            "lieve": ["pensieri fugaci di morte", "senza intento", "non specifici", "solo passivi"],
            "assente": ["nessuna ideazione suicidaria", "assenti"]
        }
    }
};

// Ordine di gravità (dal più al meno grave per prevalenza)
// Ho aggiunto "estrema" come livello di gravità superiore.
const severityOrder = ["estrema", "grave", "moderata", "lieve", "assente"];

// Mappatura della stima di gravità a un punteggio numerico (scala 1-7 per BFRs)
const bfrsSeverityToScore = {
    "assente": 1,
    "lieve": 2, // Ora 2 per distinguere da "assente"
    "moderata": 4, // Ora 4 per coprire la metà della scala
    "grave": 6, // Ora 6
    "estrema": 7 // Il massimo della scala BFRs
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