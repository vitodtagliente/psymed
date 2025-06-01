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
                        "malesseri fisici"
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
                        "agitato"
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
                        "risvegli notturni"
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
                        "evitamento sociale"
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
                        "non verbale"
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
                        "pensiero incoerente"
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
                        "tensione muscolare"
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
                        "movimenti ripetitivi"
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
                        "eccessiva autostima"
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
                        "umore deflesso",
                        "tristezza",
                        "disforia",
                        "sentirsi giù",
                        "malinconia",
                        "abbattimento"
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
                        "pensieri di morte"
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
                        "scontrosità"
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
                        "deliri persecutori"
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
                        "vedere cose"
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
                        "immobilità"
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
                        "difficoltà a collaborare"
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
                        "pensieri compulsivi"
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
                        "voce monocorde"
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
                        "eloquio accelerato"
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
                        "perdita di memoria"
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