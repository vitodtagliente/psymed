import medspacy
from medspacy.ner import TargetRule
from medspacy.visualization import visualize_ent
import spacy

# 1. Carica il modello spaCy italiano
# nlp = medspacy.load("it_core_news_lg")
ita_lang = spacy.load("it_core_news_lg")
nlp = medspacy.load(medspacy_enable="all")
print(nlp.pipe_names)

print("Modello spaCy italiano caricato con successo!")

# Add rules for target concept extraction
target_matcher = nlp.get_pipe("medspacy_target_matcher")
target_matcher.add(
    [
        TargetRule("dolore toracico", "PROBLEMA_SALUTE"),
        TargetRule("insufficienza cardiaca", "PROBLEMA_SALUTE"),
        TargetRule("diabete mellito", "PROBLEMA_SALUTE"),
        TargetRule("ipertensione", "PROBLEMA_SALUTE"),
        TargetRule("cefalea", "PROBLEMA_SALUTE"),
        TargetRule("influenza", "PROBLEMA_SALUTE"),
        # Add other relevant medical terms for health problems
    ]
)

target_matcher.add(
    [
        TargetRule("FANS", "TERAPIA"),
        TargetRule("paracetamolo", "TERAPIA"),
        TargetRule("insulina", "TERAPIA"),
        TargetRule("antibiotico", "TERAPIA"),
        TargetRule("chemioterapia", "TERAPIA"),
        # Add other relevant terms for therapies
    ]
)

# 5. Processa il tuo testo medico
text  = """
Anamnesi: Il paziente presenta cefalea da diversi giorni. Non si riferisce dolore toracico.
Esame Obiettivo: Assenza di insufficienza cardiaca. La pressione arteriosa è normale.
Terapia: Gli è stata prescritta una terapia con paracetamolo per la cefalea.
Diagnosi: Non si evidenziano segni di influenza. Precedenti di diabete mellito, ma ben controllato.
Conclusioni: Il paziente è in buone condizioni generali.
"""

doc = nlp(text)

print("--- Risultati dell'analisi delle entità ---")
for ent in doc.ents:
    print(f"Testo: {ent.text}, Categoria: {ent.label_}, Negato: {ent._.is_negated}")

# visualize_ent(doc)