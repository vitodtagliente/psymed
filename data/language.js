module.exports = {
    /**
     * @property {string[]} negationPrefixes - Words or phrases that, when preceding a term, indicate its negation.
     * These are common indicators of the absence or non-occurrence of a condition or finding.
     */
    negationPrefixes: [
        "non",
        "nessun",
        "assenza di",
        "negazione di",
        "senza",
        "no evidenza di",
        "nessuna traccia di",
        "negativo per",
        "non si osserva",
        "non riscontrato",
        "esclude",
        "assente",
        "escluso",
        "non presente",
        "non riferito"
    ],

    /**
     * @property {string[]} negationSuffixes - Words or phrases that, when following a term, indicate its negation.
     * These often confirm the absence or negativity of a finding.
     */
    negationSuffixes: [
        "assente",
        "negativo",
        "escluso",
        "non evidenziato",
        "non riscontrato",
        "non presente",
        "non riferito"
    ],

    /**
     * @property {string[]} terminationPhrases - Words, phrases, or punctuation that typically break a negation scope.
     * A negation usually applies to the term immediately preceding it or following it,
     * but these elements signal that the negation no longer applies to subsequent terms.
     */
    terminationPhrases: [
        "ma",
        "tuttavia",
        "ad eccezione di",
        "sebbene",
        "eccetto",
        "anche se",
        ".",
        ",",
        ";"
    ],

    /**
     * @property {string[]} pseudoNegations - Words or phrases that might initially seem like negations
     * but often do not indicate a direct negation in a medical or specific context.
     * They might imply uncertainty, partial presence, or a modification of meaning
     * rather than a complete absence.
     */
    pseudoNegations: [
        "nonostante",
        "a parte",
        "tranne",
        "più di",
        "meno di",
        "difficilmente",
        "parzialmente",
        "quasi",
        "potrebbe essere",
        "sospetto per",
        "non escludo"
    ],

    /**
     * @property {object} modifiers - Defines various sets of modifiers used to describe the characteristics
     * or intensity of symptoms, conditions, or behaviors.
     */
    modifiers: {
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
    },

};