module.exports = [
    // TREATED_WITH: "Problem treated with Therapy"
    {
        name: "TREATED_WITH",
        pattern: (problem, therapy) => new RegExp(
            `\\b${problem}\\s+(?:è|è stato|fu|viene)?\\s*(?:trattato|curato|gestito)\\s+(?:con|mediante|grazie a)\\s+${therapy}\\b`,
            'i'
        ),
        entities: ["PROBLEMA_SALUTE", "TERAPIA"]
    },
    // CAUSED_BY: "Problem caused by Problem"
    {
        name: "CAUSED_BY",
        pattern: (cause, effect) => new RegExp(
            `\\b${effect}\\s+(?:causato|dovuto|derivante|conseguente)\\s+(?:da|a)\\s+${cause}\\b`,
            'i'
        ),
        entities: ["PROBLEMA_SALUTE", "PROBLEMA_SALUTE"] // E.g., "dolore dovuto a frattura" (pain due to fracture)
    },
    // TAKES_FOR: "Patient takes Therapy for Problem"
    {
        name: "TAKES_FOR",
        pattern: (therapy, problem) => new RegExp(
            `\\b(?:assume|sta assumendo|prescritto|dato)\\s+${therapy}\\s+(?:per|a causa di|data l')\\s+${problem}\\b`,
            'i'
        ),
        entities: ["TERAPIA", "PROBLEMA_SALUTE"]
    },
    // ASSOCIATED_WITH: "Symptom/Condition associated with another Symptom/Condition"
    {
        name: "ASSOCIATED_WITH",
        pattern: (entity1, entity2) => new RegExp(
            `\\b${entity1}\\s+(?:associato|correlato|in concomitanza|unitamente)\\s+(?:a|con)\\s+${entity2}\\b`,
            'i'
        ),
        entities: ["SINTOMO", "CONDIZIONE"] // Can be ["SINTOMO", "SINTOMO"] or ["CONDIZIONE", "CONDIZIONE"] etc.
    },
    // LOCATED_AT: "Symptom/Problem located at Body Part"
    {
        name: "LOCATED_AT",
        pattern: (symptomOrProblem, bodyPart) => new RegExp(
            `\\b${symptomOrProblem}\\s+(?:a livello|in|nella|nel|sulla|sul|alla|al|nella regione)\\s+${bodyPart}\\b`,
            'i'
        ),
        entities: ["SINTOMO_O_PROBLEMA", "PARTE_CORPO"] // Example: "dolore a livello addominale" (abdominal pain)
    },
    // DIAGNOSED_WITH: "Patient diagnosed with Condition"
    {
        name: "DIAGNOSED_WITH",
        pattern: (patient, condition) => new RegExp(
            `\\b${patient}?\\s*(?:diagnosticato|diagnosi di|presenta)\\s+${condition}\\b`,
            'i'
        ),
        entities: ["PAZIENTE", "CONDIZIONE"] // 'PAZIENTE' could be implied or a specific entity
    },
    // HISTORY_OF: "Patient has history of Condition/Problem"
    {
        name: "HISTORY_OF",
        pattern: (patient, conditionOrProblem) => new RegExp(
            `\\b(?:storia di|anamnesi per|precedenti di|con anamnesi di|risulta avere avuto)\\s+${conditionOrProblem}\\b`,
            'i'
        ),
        entities: ["PAZIENTE", "PROBLEMA_SALUTE_O_CONDIZIONE"]
    },
    // RESPONDED_TO: "Problem responded to Therapy"
    {
        name: "RESPONDED_TO",
        pattern: (problem, therapy) => new RegExp(
            `\\b(?:${problem}\\s+(?:ha risposto|risposta a)|risposta (?:buona|positiva) a ${therapy}\\s+per ${problem})\\b`,
            'i'
        ),
        entities: ["PROBLEMA_SALUTE", "TERAPIA"]
    }
    // ...
];