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
            "sintomi fisici non giustificati", "somatizzazione", "ipocondria",
            "mal di testa", "nausea", "vertigini", "dolore al petto", "palpitazioni", "problemi gastrointestinali"
        ],
        modifiers: {
            "estrema": ["gravemente preoccupato per la salute", "ossessivo riguardo ai sintomi", "invalidato da sintomi fisici", "deliri somatici", "convincimento irremovibile"],
            "grave": ["intense preoccupazioni somatiche", "numerosi disturbi fisici", "frequenti lamentele fisiche", "gravi", "severi", "debilitanti", "costanti"],
            "moderata": ["moderate lamentele fisiche", "preoccupazioni persistenti per il corpo", "discreto numero di sintomi", "fastidiosi", "frequenti"],
            "lieve": ["poche lamentele fisiche", "preoccupazioni occasionali", "lievi disturbi somatici", "sporadici", "fastidio minimo"],
            "assente": ["nessuna preoccupazione somatica", "nessuna lamentela fisica", "assenti", "nega sintomi somatici"]
        }
    },
    // 2. Ritiro Emotivo
    "ritiro_emotivo": {
        keywords: [
            "ritiro emotivo", "isolamento sociale", "distacco emotivo", "freddezza emotiva",
            "appiattimento affettivo", "espressione emotiva ridotta", "risposta emotiva assente",
            "non risponde", "non interagisce", "non mostra emozioni", "espressione piatta"
        ],
        modifiers: {
            "estrema": ["completo isolamento", "totalmente ritirato", "assenza totale di contatto", "senza risposta emotiva", "catatonico", "grave appiattimento"],
            "grave": ["significativo ritiro", "grave isolamento", "emotivamente non reattivo", "appiattimento marcato", "scarso contatto oculare", "mancanza di mimica"],
            "moderata": ["moderato ritiro", "difficoltà a connettersi emotivamente", "reazioni emotive attenuate", "evita il contatto sociale", "scarso coinvolgimento"],
            "lieve": ["lieve distacco", "occasionale ritiro", "emozioni un po' contenute", "un po' riservato", "non molto espressivo"],
            "assente": ["nessun ritiro emotivo", "contatto emotivo normale", "assenti", "espressione emotiva adeguata"]
        }
    },
    // 3. Disorganizzazione Concettuale
    "disorganizzazione_concettuale": {
        keywords: [
            "disorganizzazione del pensiero", "pensiero incoerente", "associazione allentata",
            "deragliamento", "illogicità", "incoerenza", "salto di idee", "tangenzialità",
            "difficoltà a concentrarsi", "discorso frammentato", "pensiero confuso", "difficile da seguire"
        ],
        modifiers: {
            "estrema": ["totalmente incoerente", "discorso incomprensibile", "frammentazione estrema del pensiero", "insalata di parole", "mutismo improvviso"],
            "grave": ["grave disorganizzazione", "pensiero difficile da seguire", "numerosi deragliamenti", "logica compromessa", "irrilevante", "blocco del pensiero"],
            "moderata": ["moderata disorganizzazione", "occasionale illogicità", "difficoltà nel seguire il filo del discorso", "risposte tangenziali", "circonlocuzioni"],
            "lieve": ["lievi associazioni allentate", "occasionale incoerenza", "piccole difficoltà di concentrazione", "risposte un po' vaghe"],
            "assente": ["pensiero coerente", "logico", "assenti", "flusso di pensiero normale"]
        }
    },
    // 4. Manierismi e Posture Bizzarre
    "manierismi_e_posture_bizzarre": {
        keywords: [
            "manierismi", "posture bizzarre", "movimenti insoliti", "tic", "stereotipie",
            "strane espressioni facciali", "gesti ripetitivi", "rigidità motoria", "ecolalia", "ecoprassia", "catatonia"
        ],
        modifiers: {
            "estrema": ["comportamento totalmente bizzarro", "posture mantenute a lungo", "movimenti gravemente strani", "catatonia piena", "stereotipie invalidanti"],
            "grave": ["numerosi manierismi", "posture insolite frequenti", "comportamento strambo", "marcato", "persistente", "movimenti afinalistici"],
            "moderata": ["moderati manierismi", "qualche postura insolita", "movimenti ripetitivi", "espressioni facciali atipiche"],
            "lieve": ["lievi tic", "piccoli manierismi occasionali", "lievi movimenti strani", "una smorfia occasionale"],
            "assente": ["nessun manierismo o postura bizzarra", "assenti", "movimenti normali e fluidi"]
        }
    },
    // 5. Tensione
    "tensione": {
        keywords: [
            "tensione", "nervosismo", "irrequietezza", "agitazione", "ansia motoria",
            "rigidità muscolare", "tremori", "incapacità di rilassarsi",
            "insonnia", "difficoltà a dormire", "disturbi del sonno", "risvegli notturni", "ansia notturna"
        ],
        modifiers: {
            "estrema": ["tensione insopportabile", "agitazione estrema", "incapacità totale di stare fermo", "panico", "crisi d'ansia", "attacco di panico", "terrore"],
            "grave": ["grave tensione", "agitazione marcata", "tremori costanti", "difficoltà a stare seduto", "acatisia", "ansia grave"],
            "moderata": ["moderata tensione", "un po' irrequieto", "nervosismo evidente", "ansia moderata", "difficoltà a rilassarsi"],
            "lieve": ["lieve tensione", "un po' agitato", "lievi segni di nervosismo", "ansia lieve", "si lamenta di stress"],
            "assente": ["assenza di tensione", "calmo", "rilassato", "assenti", "nessuna ansia"]
        }
    },
    // 6. Maniacalità
    "maniacalita": {
        keywords: [
            "maniacalità", "euforia", "iperattività", "grandiosità", "irritabilità marcata",
            "pensiero accelerato", "logorrea", "ridotta necessità di sonno", "eccessiva autostima",
            "umore elevato", "fuga delle idee", "eccessiva loquacità", "comportamento impulsivo", "spreco di denaro"
        ],
        modifiers: {
            "estrema": ["mania grave", "euforia incontenibile", "iperattività pericolosa", "deliri di grandezza", "psicosi maniacale", "disinibizione estrema"],
            "grave": ["marcata euforia", "grave iperattività", "eloquio inarrestabile", "irritabilità estrema", "comportamento sconsiderato"],
            "moderata": ["moderata euforia", "più attivo del solito", "parla molto", "irritabilità", "ridotta esigenza di sonno", "ottimismo eccessivo"],
            "lieve": ["lieve elevazione dell'umore", "un po' più energico", "meno necessità di dormire", "un po' esuberante"],
            "assente": ["umore normale", "nessun segno di mania", "assenti", "umore stabile"]
        }
    },
    // 7. Ostilità
    "ostilita": {
        keywords: [
            "ostilità", "rabbia", "irritabilità", "aggressività", "collera",
            "comportamento antagonistico", "atteggiamento provocatorio", "risentimento",
            "minacce", "dispetto", "atteggiamento sprezzante", "verbale aggressivo"
        ],
        modifiers: {
            "estrema": ["violenza fisica", "aggressività incontrollabile", "minacce dirette e gravi", "assalti fisici", "pericoloso per altri"],
            "grave": ["marcata ostilità", "scoppi di rabbia frequenti", "comportamento aggressivo verbale", "minacce", "risentimento persistente", "conflittualità"],
            "moderata": ["moderata irritabilità", "discussioni frequenti", "atteggiamento critico", "si infastidisce facilmente", "difficoltà di collaborazione"],
            "lieve": ["lieve irritabilità", "qualche segno di fastidio", "sguardi ostili occasionali", "un po' scontroso"],
            "assente": ["nessuna ostilità", "cooperativo", "assenti", "amichevole"]
        }
    },
    // 8. Sospettosità
    "sospettosita": {
        keywords: [
            "sospettosità", "paranoia", "diffidenza", "credenze persecutorie", "idee di riferimento",
            "sensazione di essere osservato", "complotti", "si sente perseguitato", "cospirazione", "non si fida"
        ],
        modifiers: {
            "estrema": ["deliri persecutori invalidanti", "assoluta sfiducia in tutti", "totale convinzione di essere perseguitato", "convinzione delirante irremovibile"],
            "grave": ["marcata sospettosità", "deliri persecutori", "diffidenza significativa", "non si fida di nessuno", "evita gli altri per paura"],
            "moderata": ["moderata sospettosità", "dubbi frequenti sulle intenzioni altrui", "idee di riferimento occasionali", "cautela eccessiva", "fa domande sospettose"],
            "lieve": ["lieve diffidenza", "un po' cauto", "un po' sospettoso", "occasionale sensazione di essere giudicato"],
            "assente": ["nessuna sospettosità", "fiducia negli altri", "assenti", "aperto e fiducioso"]
        }
    },
    // 9. Allucinazioni
    "allucinazioni": {
        keywords: [
            "allucinazioni", "voci", "visioni", "percezioni anomale", "odori strani",
            "sensazioni tattili insolite", "allucinazioni uditive", "allucinazioni visive",
            "allucinazioni olfattive", "allucinazioni gustative", "allucinazioni somatiche", "sentire voci", "vedere cose"
        ],
        modifiers: {
            "estrema": ["allucinazioni continue", "invalidanti", "guidano il comportamento", "pericolose", "completamente assorbito dalle allucinazioni"],
            "grave": ["allucinazioni frequenti", "voci dominanti", "disturbanti", "difficili da distinguere dalla realtà", "ordini allucinatori"],
            "moderata": ["allucinazioni occasionali", "meno frequenti", "il paziente ne è consapevole", "non sempre disturbanti", "critica parziale"],
            "lieve": ["allucinazioni rare", "fugaci", "il paziente le riconosce come tali", "percezioni insolite ma transitorie"],
            "assente": ["nessuna allucinazione", "assenti", "nessuna percezione anomala"]
        }
    },
    // 10. Disorientamento
    "disorientamento": {
        keywords: [
            "disorientamento", "confusione", "perdita di lucidità", "difficoltà a riconoscere luoghi",
            "difficoltà a riconoscere persone", "non sa dove si trova", "non sa che giorno è",
            "perde il filo", "non riconosce", "stato confusionale", "delirium"
        ],
        modifiers: {
            "estrema": ["totalmente disorientato", "non riconosce nessuno", "incapace di orientarsi", "grave confusione", "completamente spaesato"],
            "grave": ["disorientamento marcato", "confuso sulla persona, tempo, luogo", "errori frequenti di orientamento", "non sa il giorno della settimana", "non sa la data"],
            "moderata": ["moderato disorientamento", "confusione occasionale", "difficoltà con date o luoghi meno familiari", "non sempre orientato"],
            "lieve": ["lieve disorientamento", "piccoli errori di orientamento", "momenti di lieve confusione", "a volte si confonde"],
            "assente": ["orientato nel tempo e nello spazio", "lucido", "assenti", "pienamente orientato"]
        }
    },
    // 11. Anedonia / Ritiro Sociale
    "anedonia_ritiro_sociale": {
        keywords: [
            "anedonia", "mancanza di piacere", "perdita di interesse", "isolamento sociale",
            "non prova più piacere", "ritiro dalle attività", "indifferenza",
            "ritiro sociale", "evitamento sociale", "isolato", "perdita di motivazione", "non ha più hobby", "apatia"
        ],
        modifiers: {
            "estrema": ["totale mancanza di piacere", "completamente isolato", "incapacità di godere di nulla", "grave ritiro", "nullo interesse"],
            "grave": ["anedonia marcata", "grave ritiro sociale", "non partecipa ad attività", "non ha più interessi", "indifferenza a tutto"],
            "moderata": ["moderata anedonia", "ridotto interesse per le attività", "socialmente meno attivo", "si annoia facilmente", "ridotto coinvolgimento"],
            "lieve": ["lieve anedonia", "diminuito piacere in alcune cose", "meno propenso a socializzare", "un po' distaccato", "si isola a volte"],
            "assente": ["capacità di provare piacere", "socialmente attivo", "assenti", "partecipa attivamente", "mostra interesse"]
        }
    },
    // 12. Mancanza di Insight
    "mancanza_di_insight": {
        keywords: [
            "mancanza di insight", "negazione della malattia", "non consapevole della patologia",
            "non riconosce i sintomi", "non crede di essere malato", "minimizzazione",
            "attribuisce la colpa ad altri", "manca di consapevolezza", "non accetta la diagnosi"
        ],
        modifiers: {
            "estrema": ["totale assenza di insight", "negazione totale della malattia", "non riconosce alcun sintomo", "delirante riguardo alla malattia"],
            "grave": ["grave mancanza di insight", "forte negazione", "attribuisce i problemi agli altri", "irremovibile nelle sue convinzioni errate"],
            "moderata": ["moderata mancanza di insight", "parziale consapevolezza", "minimizza i problemi", "dubbi sulla diagnosi", "accetta solo in parte"],
            "lieve": ["lieve mancanza di insight", "poca consapevolezza di alcune aree", "momenti di negazione", "non completamente convinto"],
            "assente": ["piena consapevolezza della malattia", "riconosce i sintomi", "assenti", "accetta la diagnosi e la cura"]
        }
    },
    // 13. Insolito Contenuto del Pensiero
    "insolito_contenuto_del_pensiero": {
        keywords: [
            "deliri", "idee fisse", "pensiero insolito", "irrazionale", "credenze bizzarre",
            "ideazione non comune", "pensiero magico", "idee sovrastimate", "riferimento",
            "psicosi", "schizofrenia", "disturbo psicotico", "ideazione delirante", "idee grandiose", "gelosia delirante"
        ],
        modifiers: {
            "estrema": ["deliri bizzarri e incontenibili", "convinzioni totalmente irrazionali che guidano il comportamento", "persecuzioni estreme", "deliri somatici bizzarri"],
            "grave": ["deliri dominanti", "idee fisse e pervasive", "pensiero irrazionale significativo", "convinzioni bizzarre", "difficilmente modificabili"],
            "moderata": ["deliri occasionali", "idee sovrastimate", "pensiero un po' strano o atipico", "convinzioni insolite ma non deliranti", "discussioni su temi bizzarri"],
            "lieve": ["pensieri insoliti fugaci", "idee strambe ma non deliranti", "curiosità per l'occulto", "idee di riferimento lievi"],
            "assente": ["contenuto del pensiero normale", "razionale", "assenti", "nessun delirio"]
        }
    },
    // 14. Ritardo Psicomotorio
    "ritardo_psicomotorio": {
        keywords: [
            "ritardo psicomotorio", "rallentamento", "bradicinesia", "lentezza nei movimenti",
            "risposta lenta", "ridotta mimica", "scarso movimento", "lentezza nel parlare",
            "abulia motoria", "apatia motoria", "mancanza di spontaneità"
        ],
        modifiers: {
            "estrema": ["immobilismo", "catatonia", "totale lentezza", "risposta assente", "gravemente rallentato", "blocco psicomotorio"],
            "grave": ["marcato rallentamento psicomotorio", "movimenti molto lenti", "eloquio rallentato", "mimica ridotta", "difficoltà a iniziare attività"],
            "moderata": ["moderato rallentamento", "meno spontaneo nei movimenti", "risposta un po' lenta", "fatica a iniziare", "voce monocorde"],
            "lieve": ["lieve lentezza", "meno energico del solito", "piccoli segni di rallentamento", "un po' fiacco"],
            "assente": ["normali movimenti e attività", "assenti", "normale velocità psicomotoria"]
        }
    },
    // 15. Apatia
    "apatia": {
        keywords: [
            "apatia", "mancanza di motivazione", "indifferenza", "passività",
            "aboulia", "perdita di iniziativa", "inerzia", "non gli importa", "senza energia",
            "non reagisce"
        ],
        modifiers: {
            "estrema": ["completa apatia", "mancanza totale di motivazione", "incapacità di iniziare attività", "grave aboulia", "totale disinteresse"],
            "grave": ["marcata apatia", "grave mancanza di iniziativa", "indifferenza a tutto", "non si impegna", "non partecipa"],
            "moderata": ["moderata apatia", "ridotta motivazione", "difficoltà a prendere decisioni", "mancanza di interesse per l'ambiente"],
            "lieve": ["lieve apatia", "un po' meno motivato", "qualche incertezza", "minimo disinteresse"],
            "assente": ["motivato", "proattivo", "interessato", "assenti", "mostra iniziativa"]
        }
    },
    // 16. Difficoltà di Concentrazione
    "difficolta_di_concentrazione": {
        keywords: [
            "difficoltà di concentrazione", "distraibilità", "deficit attentivo",
            "attenzione ridotta", "fatica a focalizzarsi", "non riesce a seguire un discorso",
            "difficoltà a leggere", "memoria a breve termine ridotta", "dispersivo"
        ],
        modifiers: {
            "estrema": ["incapacità totale di concentrarsi", "attenzione frammentata", "non segue alcun discorso", "completamente distratto", "non memorizza nulla"],
            "grave": ["grave deficit di attenzione", "facilmente distraibile", "non riesce a completare compiti", "si perde nei pensieri", "difficoltà a sostenere l'attenzione"],
            "moderata": ["moderata difficoltà di concentrazione", "distraibilità", "meno attento del solito", "fatica a mantenere la concentrazione per un tempo prolungato"],
            "lieve": ["lieve difficoltà a concentrarsi", "a volte distratto", "piccoli cali di attenzione", "distraibilità minima"],
            "assente": ["buona concentrazione", "attenzione mantenuta", "assenti", "si concentra bene"]
        }
    },
    // 17. Colpa
    "colpa": {
        keywords: [
            "sensi di colpa", "autocondanna", "senso di indegnità", "autorimprovero",
            "credenze di colpa", "responsabilità eccessiva", "si sente un peso", "si colpevolizza"
        ],
        modifiers: {
            "estrema": ["deliri di colpa", "convincimento di essere una persona orribile", "autocondanna assoluta", "si ritiene la causa di ogni male", "si sente irredimibile"],
            "grave": ["gravi sensi di colpa", "pensieri persistenti di indegnità", "si autoaccusa continuamente", "senso di colpa schiacciante", "si rimprovera per tutto"],
            "moderata": ["moderati sensi di colpa", "si sente spesso in colpa", "si critica molto", "tendente all'autorimprovero"],
            "lieve": ["lievi sensi di colpa", "occasionali autocritiche", "un po' responsabile", "leggeri rimorsi"],
            "assente": ["nessun senso di colpa", "non si autoaccusa", "assenti", "non mostra colpevolizzazione"]
        }
    },
    // 18. Ideazione Suicidaria
    "ideazione_suicidaria": {
        keywords: [
            "ideazione suicidaria", "pensieri di morte", "desiderio di morire", "intenzione di farsi del male",
            "propositi suicidi", "pianificazione suicidaria", "tentato suicidio", // Tentato suicidio è un atto, ma un forte indicatore
            "autolesionismo", "impulsi autolesivi", "volontà di farla finita", "pensieri di togliersi la vita"
        ],
        modifiers: {
            "estrema": ["piano suicidario imminente", "tentativo di suicidio recente", "rischio vitale immediato", "alto rischio suicidario", "imminente pericolo"],
            "grave": ["ideazione suicidaria persistente", "con piano ma senza intento immediato", "forti propositi suicidi", "ricorrente", "significativa preoccupazione per la sua sicurezza"],
            "moderata": ["ideazione suicidaria occasionale", "desiderio di non vivere", "pensieri di morte", "pensieri autolesivi", "non specifici ma presenti"],
            "lieve": ["pensieri fugaci di morte", "senza intento", "non specifici", "solo passivi", "rari pensieri"],
            "assente": ["nessuna ideazione suicidaria", "assenti", "nega pensieri suicidari", "nessun rischio autolesivo"]
        }
    }
};

// Ordine di gravità (dal più al meno grave per prevalenza)
const severityOrder = ["estrema", "grave", "moderata", "lieve", "assente"];

// Mappatura della stima di gravità a un punteggio numerico (scala 1-7 per BFRs)
const bfrsSeverityToScore = {
    "assente": 1,
    "lieve": 2,
    "moderata": 4,
    "grave": 6,
    "estrema": 7
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