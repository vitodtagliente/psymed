module.exports = {
    categories: [
        {
            id: "somatic_concern",
            name: "Somatic Concern",
            mappings: [
                {
                    entityTextKeywords: [
                        "preoccupazione somatica",
                        "lamentele fisiche",
                        "dolori somatici",
                        "fastidi corporei",
                        "malesseri fisici",
                        "dolore somatoforme",
                        "malattia immaginaria cronica",
                        "sintomi inesistenti cronici",
                        "disturbi psicosomatici",
                        "dolore psicogeno",
                        "fatica psicogena",
                        "nausea psicogena",
                        "disturbi gastrointestinali funzionali",
                        "cefalea tensiva",
                        "preoccupazione per la salute patologica",
                        "disagio somatico generalizzato"
                    ],
                    baseScore: 3,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 },
                            intenso: { adjustment: 3 }
                        }
                    }
                },
                {
                    entityTextKeywords: [
                        "ipocondria",
                        "idee ipocondriache"
                    ],
                    baseScore: 4,
                    modifierRules: {}
                }
            ]
        },
        {
            id: "anxiety",
            name: "Anxiety",
            mappings: [
                {
                    entityTextKeywords: [
                        "angoscia",
                        "ansia",
                        "nervosismo",
                        "agitazione",
                        "irrequietezza",
                        "tensione interna",
                        "sentirsi teso",
                        "agitato",
                        "paura",
                        "preoccupazione",
                        "fobia",
                        "panico",
                        "ipervigilanza",
                        "ansia da separazione adulta",
                        "timore patologico",
                        "ipervigilanza patologica",
                        "iperreattività emotiva",
                        "tensione emotiva cronica",
                        "esaurimento emotivo",
                        "burn-out",
                        "stress cronico patologico",
                        "fobia sociale",
                        "fobia specifica",
                        "fobia generalizzata",
                        "evitamento fobico"
                    ],
                    baseScore: 3,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 },
                            critica: { adjustment: 3 },
                            severa: { adjustment: 3 }
                        },
                        frequenza: {
                            occasionale: { adjustment: 0 },
                            frequente: { adjustment: 1 },
                            costante: { adjustment: 2 },
                            persistente: { adjustment: 2 }
                        }
                    }
                },
                {
                    entityTextKeywords: [
                        "attacchi di panico",
                        "crisi di ansia"
                    ],
                    baseScore: 5,
                    modifierRules: {}
                },
                {
                    entityTextKeywords: [
                        "insonnia",
                        "insonnia iniziale",
                        "difficoltà ad addormentarsi",
                        "risvegli notturni",
                        "insonnia intermedia",
                        "insonnia terminale",
                        "ipersonnia",
                        "incubi",
                        "risveglio precoce"
                    ],
                    baseScore: 2,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 }
                        }
                    }
                }
            ]
        },
        {
            id: "emotional_withdrawal",
            name: "Emotional Withdrawal",
            mappings: [
                {
                    entityTextKeywords: [
                        "ritiro sociale",
                        "ritiro emotivo",
                        "isolamento",
                        "apatia",
                        "mancanza di interazione",
                        "distacco emotivo",
                        "evitamento sociale",
                        "anaffettività",
                        "freddezza emotiva",
                        "comportamenti autistici",
                        "trascuratezza igiene personale",
                        "trascuratezza alimentare",
                        "trascuratezza domestica",
                        "ritiro familiare",
                        "isolamento lavorativo",
                        "perdita interessi",
                        "isolamento cronico",
                        "evitamento sociale cronico",
                        "comportamenti auto-isolanti",
                        "incapacità di autocura cronica",
                        "disordine domestico cronico",
                        "isolamento lavorativo cronico",
                        "distacco sociale patologico",
                        "incapacità di integrazione sociale",
                        "esclusione sociale autoindotta",
                        "comportamento evitante generalizzato",
                        "incapacità di ascolto patologica"
                    ],
                    baseScore: 4,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 },
                            severo: { adjustment: 2 }
                        },
                        durata: {
                            cronicizzata: { adjustment: 1 },
                            persistente: { adjustment: 1 }
                        }
                    }
                },
                {
                    entityTextKeywords: [
                        "mutacico",
                        "mutismo",
                        "silenzio prolungato",
                        "non verbale",
                        "mutacismo selettivo"
                    ],
                    baseScore: 5,
                    modifierRules: {}
                },
                {
                    entityTextKeywords: [
                        "scarsa cura di sé",
                        "aspetto poco curato",
                        "incuria personale",
                        "negligenza dell'igiene"
                    ],
                    baseScore: 3,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 }
                        }
                    }
                }
            ]
        },
        {
            id: "conceptual_disorganization",
            name: "Conceptual Disorganization",
            mappings: [
                {
                    entityTextKeywords: [
                        "disorganizzazione concettuale",
                        "pensiero disorganizzato",
                        "associazioni lasse",
                        "tangenzialità",
                        "deragliamento",
                        "illogicità del pensiero",
                        "schizofrenia",
                        "psicosi",
                        "pensiero incoerente",
                        "rallentamento del pensiero",
                        "accelerazione del pensiero",
                        "fuga delle idee",
                        "incoerenza del pensiero",
                        "illogicità",
                        "perseverazione",
                        "ecolalia",
                        "verbigerazione",
                        "neologismi",
                        "schizofasia",
                        "afasia",
                        "alogia",
                        "povertà di linguaggio",
                        "mutismo",
                        "logorrea",
                        "eloquio accelerato",
                        "eloquio rallentato",
                        "balbuzie psicogena",
                        "mutacismo selettivo",
                        "dissociazione del pensiero",
                        "dereismo",
                        "sintomi psicotici",
                        "catastrofizzazione",
                        "pensiero circolare",
                        "blocco del pensiero",
                        "rimuginio",
                        "pensieri ripetitivi patologici",
                        "ruminazione patologica"
                    ],
                    baseScore: 4,
                    modifierRules: {
                        gravita: {
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 },
                            severa: { adjustment: 2 }
                        },
                        cronicita: {
                            cronicizzata: { adjustment: 1 },
                            persistente: { adjustment: 1 }
                        }
                    }
                }
            ]
        },
        {
            id: "guilt",
            name: "Guilt",
            mappings: [
                {
                    entityTextKeywords: [
                        "senso di colpa",
                        "colpa",
                        "autocondanna",
                        "rimorso",
                        "inadeguatezza",
                        "sentirsi in colpa",
                        "colpevolezza"
                    ],
                    baseScore: 4,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 }
                        }
                    }
                }
            ]
        },
        {
            id: "tension",
            name: "Tension",
            mappings: [
                {
                    entityTextKeywords: [
                        "tensione",
                        "agitazione psicomotoria",
                        "irrequietezza motoria",
                        "frenesia",
                        "nervosismo motorio",
                        "tensione muscolare",
                        "acatisia",
                        "iperattività",
                        "iperprosessia"
                    ],
                    baseScore: 4,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 },
                            severa: { adjustment: 2 }
                        }
                    }
                }
            ]
        },
        {
            id: "mannerisms_and_posturing",
            name: "Mannerisms and Posturing",
            mappings: [
                {
                    entityTextKeywords: [
                        "manierismi",
                        "posture",
                        "stereotipie motorie",
                        "tics",
                        "bizzarrie motorie",
                        "movimenti ripetitivi",
                        "agitazione catatonica",
                        "stupor catatonico",
                        "negativismo catatonico",
                        "manierismo motorio",
                        "ecolalia catatonica",
                        "ecoprassia",
                        "catalepsia",
                        "waxy flexibility (flessibilità cerea)",
                        "postura bizzarra",
                        "tic motori",
                        "tremore",
                        "ipotonia psicogena",
                        "paralisi psicogena",
                        "crisi pseudoepilettiche",
                        "rigidità comportamentale"
                    ],
                    baseScore: 4,
                    modifierRules: {
                        frequenza: {
                            occasionale: { adjustment: 0 },
                            frequente: { adjustment: 1 },
                            costante: { adjustment: 2 }
                        }
                    }
                }
            ]
        },
        {
            id: "grandiosity",
            name: "Grandiosity",
            mappings: [
                {
                    entityTextKeywords: [
                        "grandiosità",
                        "delirio di grandezza",
                        "senso di superiorità",
                        "onnipotenza",
                        "idee megalomaniche",
                        "eccessiva autostima",
                        "narcisismo patologico",
                        "egocentrismo patologico",
                        "arroganza patologica",
                        "superbia patologica",
                        "atteggiamento di superiorità patologica"
                    ],
                    baseScore: 4,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 }
                        }
                    }
                }
            ]
        },
        {
            id: "depression",
            name: "Depression",
            mappings: [
                {
                    entityTextKeywords: [
                        "depressione",
                        "depressivo",
                        "depressiva",
                        "umore depresso",
                        "tristezza",
                        "disforia",
                        "sentirsi giù",
                        "malinconia",
                        "abbattimento",
                        "disperazione",
                        "pessimismo",
                        "autosvalutazione",
                        "pianto frequente",
                        "diminuzione appetito",
                        "perdita peso",
                        "astenia",
                        "affaticabilità",
                        "fatica cronica",
                        "diminuzione libido",
                        "disperazione futura",
                        "sfiducia futuro",
                        "perdita motivazione",
                        "perdita senso vita",
                        "reazione depressiva",
                        "fragilità emotiva",
                        "vulnerabilità emotiva",
                        "nichilismo patologico",
                        "idee nichilistiche",
                        "idee catastrofiche",
                        "idee di rovina",
                        "idee di inutilità",
                        "sentimento di vuoto",
                        "senso di solitudine patologico",
                        "sensazione di abbandono",
                        "sentimenti di rifiuto cronici",
                        "disillusione cronica",
                        "nichilismo affettivo",
                        "disinvestimento affettivo",
                        "isolamento lavorativo cronico",
                        "insoddisfazione cronica",
                        "infelicità cronica",
                        "pessimismo cronico",
                        "visione catastrofica cronica",
                        "negativismo cronico",
                        "perdita della progettualità",
                        "perdita di speranza cronica",
                        "perdita della motivazione cronica",
                        "atteggiamento fatalistico"
                    ],
                    baseScore: 3,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 },
                            critica: { adjustment: 3 },
                            severa: { adjustment: 3 }
                        },
                        durata: {
                            persistente: { adjustment: 1 },
                            cronicizzata: { adjustment: 2 }
                        }
                    }
                },
                {
                    entityTextKeywords: [
                        "crisi di pianto",
                        "pianto inconsolabile",
                        "lamenti"
                    ],
                    baseScore: 4,
                    modifierRules: {}
                },
                {
                    entityTextKeywords: [
                        "calo ponderale",
                        "perdita di appetito",
                        "anoressia",
                        "difficoltà ad alimentarsi"
                    ],
                    baseScore: 3,
                    modifierRules: {}
                },
                {
                    entityTextKeywords: [
                        "anedonia",
                        "perdita di interesse",
                        "mancanza di piacere",
                        "mancanza di motivazione"
                    ],
                    baseScore: 4,
                    modifierRules: {}
                },
                {
                    entityTextKeywords: [
                        "idee suicidarie",
                        "tentativo di suicidio",
                        "pensieri di morte",
                        "ideazione suicidaria",
                        "suicidio",
                        "autolesionismo",
                        "ideazione autolesiva",
                        "comportamenti autodistruttivi",
                        "comportamenti autolesivi cronici",
                        "pensieri suicidari ricorrenti",
                        "tentativi suicidari",
                        "comportamento suicidario",
                        "comportamento autodistruttivo cronico",
                        "comportamento automutilante cronico"
                    ],
                    baseScore: 6,
                    modifierRules: {}
                }
            ]
        },
        {
            id: "hostility",
            name: "Hostility",
            mappings: [
                {
                    entityTextKeywords: [
                        "ostilità",
                        "aggressività",
                        "irritabilità",
                        "collera",
                        "rabbia",
                        "atteggiamento provocatorio",
                        "verbosità aggressiva",
                        "scontrosità",
                        "intolleranza",
                        "violenza",
                        "irritazione",
                        "crisi di rabbia",
                        "sadismo psicologico",
                        "aggressività passiva cronica",
                        "passivo-aggressività patologica",
                        "atteggiamento tirannico",
                        "comportamento dominatore",
                        "comportamento provocatorio",
                        "atteggiamento sfidante cronico",
                        "opposizione patologica",
                        "comportamento ribelle",
                        "rapporti interpersonali patologici",
                        "ostilità interpersonale cronica",
                        "comportamento vendicativo cronico",
                        "desiderio di vendetta patologico",
                        "incapacità di perdono cronica",
                        "rancore patologico",
                        "odio cronico",
                        "comportamento intimidatorio"
                    ],
                    baseScore: 4,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 },
                            violento: { adjustment: 3 }
                        }
                    }
                }
            ]
        },
        {
            id: "suspiciousness",
            name: "Suspiciousness",
            mappings: [
                {
                    entityTextKeywords: [
                        "diffidenza",
                        "sospettosità",
                        "paranoia",
                        "idee di persecuzione",
                        "sfiducia",
                        "malfidenza",
                        "sentirsi spiato",
                        "deliri persecutori",
                        "ideazione paranoide",
                        "ipervigilanza",
                        "vissuti persecutori",
                        "atteggiamento difensivo",
                        "atteggiamenti paranoici cronici",
                        "sospettosità cronica",
                        "diffidenza cronica",
                        "atteggiamento prevenuto",
                        "idee pregiudiziali patologiche",
                        "fanatismo ideologico",
                        "idee persecutorie generalizzate",
                        "sfiducia relazionale cronica",
                        "scetticismo patologico",
                        "diffidenza patologica generalizzata"
                    ],
                    baseScore: 4,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 }
                        }
                    }
                }
            ]
        },
        {
            id: "hallucinations",
            name: "Hallucinations",
            mappings: [
                {
                    entityTextKeywords: [
                        "allucinazioni",
                        "voci",
                        "visioni",
                        "esperienze percettive insolite",
                        "psicosi",
                        "uditive",
                        "visive",
                        "tattili",
                        "olfattive",
                        "gustative",
                        "sentire voci",
                        "vedere cose",
                        "allucinazioni uditive",
                        "voci dialoganti",
                        "voci imperative",
                        "allucinazioni visive",
                        "allucinazioni tattili",
                        "allucinazioni olfattive",
                        "allucinazioni gustative",
                        "pseudoallucinazioni",
                        "illusioni percettive",
                        "percezione alterata della realtà",
                        "distorsione percettiva",
                        "distorsione sensoriale"
                    ],
                    baseScore: 5,
                    modifierRules: {
                        frequenza: {
                            occasionale: { adjustment: 0 },
                            frequente: { adjustment: 1 },
                            costante: { adjustment: 2 }
                        },
                        modalita: {
                            uditive: { adjustment: 0 },
                            visive: { adjustment: 0 },
                            tattili: { adjustment: 0 },
                            olfattive: { adjustment: 0 },
                            gustative: { adjustment: 0 }
                        }
                    }
                }
            ]
        },
        {
            id: "motor_retardation",
            name: "Motor Retardation",
            mappings: [
                {
                    entityTextKeywords: [
                        "rallentamento motorio",
                        "bradicinesia",
                        "mutacico",
                        "acinesia",
                        "ipocinesia",
                        "scarso movimento",
                        "lentezza nei movimenti",
                        "immobilità",
                        "bradipsichismo",
                        "ipomimia"
                    ],
                    baseScore: 4,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 },
                            severo: { adjustment: 2 }
                        }
                    }
                }
            ]
        },
        {
            id: "uncooperativeness",
            name: "Uncooperativeness",
            mappings: [
                {
                    entityTextKeywords: [
                        "non collaborazione",
                        "scarso insight",
                        "opposizione",
                        "resistenza al trattamento",
                        "rifiuto di cure",
                        "mancanza di compliance",
                        "difficoltà a collaborare",
                        "mancanza di insight",
                        "negazione sintomi",
                        "oppositività",
                        "opposizione terapeutica",
                        "mancanza di adesione terapeutica",
                        "atteggiamento passivo-aggressivo",
                        "comportamento passivo-aggressivo",
                        "evitamento responsabilità",
                        "passività patologica",
                        "masochismo psicologico",
                        "autosabotaggio",
                        "comportamenti autodistruttivi",
                        "negligenza personale",
                        "irresponsabilità cronica",
                        "condotta irresponsabile",
                        "comportamento negligente cronico",
                        "negativismo cronico",
                        "negligenza relazionale",
                        "abuso psicologico",
                        "violenza domestica psicologica",
                        "vittimizzazione patologica",
                        "complesso di inferiorità patologico",
                        "comportamento sprezzante",
                        "atteggiamento cinico cronico",
                        "cinismo patologico",
                        "incapacità di autocura cronica",
                        "incapacità di relazionarsi",
                        "relazioni conflittuali croniche",
                        "incomprensione relazionale cronica",
                        "comportamento lamentoso cronico",
                        "comportamento recriminatorio",
                        "incapacità progettuale",
                        "incapacità organizzativa",
                        "procrastinazione cronica",
                        "incapacità di pianificazione",
                        "incapacità di previsione",
                        "irresponsabilità cronica",
                        "condotta irresponsabile",
                        "comportamento negligente cronico",
                        "negligenza relazionale",
                        "incapacità relazionale cronica",
                        "comportamento oppositivo cronico",
                        "comportamento irresponsabile cronico",
                        "comportamento impulsivo cronico",
                        "comportamento a rischio cronico",
                        "promiscuità patologica cronica",
                        "comportamento sessuale a rischio cronico"
                    ],
                    baseScore: 4,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 }
                        }
                    }
                }
            ]
        },
        {
            id: "unusual_thought_content",
            name: "Unusual Thought Content",
            mappings: [
                {
                    entityTextKeywords: [
                        "contenuto di pensiero insolito",
                        "deliri",
                        "delusioni",
                        "idee di riferimento",
                        "idee persecutorie",
                        "pensieri bizzarri",
                        "psicosi",
                        "schizofrenia",
                        "schizofrenia residuale",
                        "psicosi schizofrenica cronicizzata",
                        "idee di colpa",
                        "idee di morte",
                        "pensieri ossessivi",
                        "pensieri compulsivi",
                        "delirio persecutorio",
                        "delirio di grandezza",
                        "delirio di riferimento",
                        "delirio erotomanico",
                        "delirio somatico",
                        "delirio religioso",
                        "gelosia patologica",
                        "delirio nichilistico",
                        "delirio ipocondriaco",
                        "ideazione paranoide",
                        "sospettosità",
                        "diffidenza",
                        "ipervigilanza",
                        "delirio mistico",
                        "delirio bizzarro",
                        "idee di influenzamento",
                        "delirio di controllo",
                        "idee di trasmissione del pensiero",
                        "idee di lettura del pensiero",
                        "ideas de inserción del pensamiento", // Assuming a typo and meant 'inserzione'
                        "idee di furto del pensiero",
                        "delirio di infestazione",
                        "catastrofismo",
                        "pensiero dicotomico",
                        "polarizzazione affettiva",
                        "distorsioni cognitive",
                        "bias cognitivi"
                    ],
                    baseScore: 5,
                    modifierRules: {
                        gravita: {
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 },
                            severa: { adjustment: 2 }
                        },
                        cronicita: {
                            cronicizzata: { adjustment: 1 },
                            persistente: { adjustment: 1 }
                        },
                        tipologia: {
                            persecutorio: { adjustment: 0 },
                            grandioso: { adjustment: 0 },
                            "di riferimento": { adjustment: 0 }
                        }
                    }
                }
            ]
        },
        {
            id: "blunted_affect",
            name: "Blunted Affect",
            mappings: [
                {
                    entityTextKeywords: [
                        "appiattimento affettivo",
                        "affetto appiattito",
                        "monotonia dell'umore",
                        "povertà emotiva",
                        "mancanza di espressività",
                        "espressione facciale fissa",
                        "voce monocorde",
                        "affettività appiattita",
                        "emozione incongrua",
                        "emozione labile",
                        "ambivalenza affettiva",
                        "apatia emotiva",
                        "incongruenza emotiva",
                        "ottundimento affettivo",
                        "ipoaffettività",
                        "iperespressione emotiva",
                        "iporespressione emotiva",
                        "inespressività emotiva",
                        "ipercoinvolgimento emotivo",
                        "rigidità affettiva",
                        "disregolazione emotiva",
                        "mimica facciale inespressiva",
                        "monotonia vocale"
                    ],
                    baseScore: 4,
                    modifierRules: {
                        gravita: {
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 },
                            severa: { adjustment: 2 }
                        },
                        durata: {
                            persistente: { adjustment: 1 },
                            cronicizzata: { adjustment: 1 }
                        }
                    }
                }
            ]
        },
        {
            id: "excitement",
            name: "Excitement",
            mappings: [
                {
                    entityTextKeywords: [
                        "eccitamento",
                        "agitazione psicomotoria",
                        "iperattività",
                        "logorrea",
                        "pressione verbosa",
                        "fuga di idee",
                        "maniacale",
                        "ipercinetico",
                        "eloquio accelerato",
                        "mania",
                        "ipomania",
                        "ciclotimia",
                        "umore labile",
                        "labilità affettiva",
                        "euforia",
                        "ipertimia",
                        "disinibizione",
                        "comportamento disinibito",
                        "comportamento impulsivo",
                        "condotte a rischio",
                        "comportamento stravagante",
                        "promiscuità patologica cronica",
                        "comportamento sessuale a rischio cronico",
                        "comportamento impulsivo cronico",
                        "comportamento a rischio cronico"
                    ],
                    baseScore: 4,
                    modifierRules: {
                        gravita: {
                            lieve: { adjustment: 0 },
                            moderata: { adjustment: 1 },
                            grave: { adjustment: 2 },
                            severa: { adjustment: 2 }
                        }
                    }
                }
            ]
        },
        {
            id: "disorientation",
            name: "Disorientation",
            mappings: [
                {
                    entityTextKeywords: [
                        "disorientato",
                        "disorientamento",
                        "confusione",
                        "deterioramento cognitivo",
                        "difficoltà di orientamento",
                        "non orientato",
                        "perdita di memoria",
                        "distorsione temporale",
                        "disturbi della memoria",
                        "difficoltà di concentrazione",
                        "disattenzione",
                        "distraibilità",
                        "indecisione",
                        "incapacità decisionale",
                        "dubbio patologico",
                        "confusione",
                        "deficit attenzione",
                        "deficit memoria breve termine",
                        "deficit memoria lungo termine",
                        "deficit memoria procedurale",
                        "deficit memoria episodica",
                        "deficit memoria semantica",
                        "difficoltà pianificazione",
                        "deficit funzioni esecutive",
                        "confabulazione",
                        "disturbi orientamento spazio-temporale",
                        "smarrimento",
                        "disorganizzazione comportamentale",
                        "disorganizzazione ambientale",
                        "inabilità nella cura personale",
                        "incapacità gestione economica",
                        "incapacità relazionale",
                        "deterioramento delle relazioni interpersonali",
                        "disturbi cognitivi",
                        "deterioramento cognitivo lieve",
                        "rigidità cognitiva",
                        "disregolazione cognitiva",
                        "alterazioni coscienza",
                        "obnubilamento",
                        "sopore",
                        "torpore",
                        "stato confusionale acuto",
                        "stato confusionale cronico",
                        "delirium",
                        "stato crepuscolare",
                        "alterazioni della vigilanza",
                        "disattenzione cronica",
                        "ipoprosexia",
                        "attenzione selettiva patologica",
                        "attenzione dispersa",
                        "disattenzione selettiva",
                        "ridotta vigilanza",
                        "ottundimento cognitivo",
                        "affaticamento mentale",
                        "saturazione mentale",
                        "disturbo dell'identità",
                        "alterazione senso del tempo",
                        "esperienza di déjà-vu patologico",
                        "esperienza di jamais-vu",
                        "flashback traumatici",
                        "rigidità comportamentale",
                        "rigidità relazionale",
                        "comportamento controllante patologico",
                        "atteggiamento manipolatorio",
                        "seduzione patologica",
                        "comportamento teatrale cronico",
                        "incapacità adattativa",
                        "disturbo adattivo cronico",
                        "maladattamento",
                        "comportamenti regressivi cronici",
                        "infantilismo patologico",
                        "evitamento responsabilità cronico",
                        "incapacità progettuale",
                        "incapacità organizzativa",
                        "procrastinazione cronica",
                        "incapacità di pianificazione",
                        "incapacità di previsione",
                        "irresponsabilità cronica",
                        "condotta irresponsabile",
                        "comportamento negligente cronico",
                        "negligenza relazionale",
                        "incapacità di mantenere lavoro stabile",
                        "instabilità economica",
                        "disoccupazione patologica",
                        "isolamento lavorativo",
                        "perdita interessi",
                        "perdita energia",
                        "disperazione futura",
                        "sfiducia futuro",
                        "perdita motivazione",
                        "perdita senso vita",
                        "trascuratezza igiene personale",
                        "trascuratezza alimentare",
                        "trascuratezza domestica",
                        "ritiro familiare",
                        "comportamento stravagante",
                        "eccessiva religiosità",
                        "fanatismo",
                        "credenze superstiziose",
                        "comportamento ritualistico",
                        "pseudofilosofia",
                        "verbosità vuota",
                        "relazioni superficiali",
                        "mimica facciale inespressiva",
                        "monotonia vocale",
                        "relazioni disfunzionali",
                        "rapporti interpersonali patologici",
                        "incapacità di risoluzione conflitti",
                        "disfunzione familiare cronica",
                        "evitamento del conflitto patologico",
                        "personalità multipla",
                        "dissociazione cronica",
                        "frammentazione identitaria",
                        "percezione alterata di sé cronica",
                        "perdita del senso di identità cronica"
                    ],
                    baseScore: 3,
                    modifierRules: {
                        gravita: {
                            moderato: { adjustment: 1 },
                            grave: { adjustment: 2 },
                            severo: { adjustment: 2 }
                        },
                        ambito: {
                            spaziale: { adjustment: 0 },
                            temporale: { adjustment: 1 },
                            personale: { adjustment: 2 },
                            multiplo: { adjustment: 2 }
                        }
                    }
                }
            ]
        }
    ]
};