# PsyMed: Global Assessment of Functioning (GAF) Calculation Methodology

PsyMed provides an automated calculation of the Global Assessment of Functioning (GAF) score based on the extracted psychiatric entities from clinical text. The GAF is a single numerical score (typically ranging from 0 to 100) that reflects an individual's overall psychological, social, and occupational functioning. Higher scores indicate better functioning.

PsyMed's GAF calculation is driven by:
1.  **GAF Configuration (e.g., within `data-ita.json`)**: This configuration defines the initial GAF score, the impact of specific entities, the effect of negations, and how modifiers influence the score.
2.  **`gaf.js`**: The JavaScript algorithm that processes the extracted entities and applies the rules defined in the GAF configuration to compute the final score.

## 1. GAF Configuration Structure (Assumed from `gaf.js` Usage)

The GAF calculation relies on a configuration object (referred to as `gafConfig` in `gaf.js`) which would typically be part of your main data configuration file (like `data-ita.json`). This `gafConfig` object is expected to have the following structure:

* **`initialGAF`**: A numerical value representing the starting GAF score (e.g., `100`). This is the baseline from which reductions are made based on identified problems and therapies.
* **`entityImpact`**: An object where keys are normalized text strings (or patterns) of entities (e.g., "ansia", "depressione", "disturbo bipolare") and values are numerical decrements to the GAF score. It also includes a `_default` key for the impact of entities not explicitly listed.
    ```json
    "entityImpact": {
        "ansia": 5,
        "depressione": 8,
        "allucinazioni": 15,
        "psicosi": 20,
        "_default": 2
    }
    ```
* **`modifiersImpact`**: An object defining how different types of modifiers (e.g., "intensita", "cronicità") and their specific values (e.g., "grave", "cronico") multiply the impact of an entity. These are multiplicative factors.
    ```json
    "modifiersImpact": {
        "intensita": {
            "lieve": 0.5,
            "moderato": 1.2,
            "grave": 1.5,
            "severa": 1.8
        },
        "cronicità": {
            "acuto": 1.0,
            "cronico": 1.5,
            "in remissione": 0.2
        }
    }
    ```
* **`negationImpactFactor`**: A numerical factor (e.g., `0.5`) that reduces the calculated impact of an entity if it is explicitly negated in the text (e.g., if a "problem" is reported as "not present").

## 2. GAF Calculation Algorithm (`gaf.js`)

The `GAF.process` method takes two main inputs:
* `entities`: An array of `Entity` objects extracted from the text by PsyMed's NLP pipeline. Each `Entity` includes its `text`, `label` (e.g., "problem", "therapy"), `isNegated` status, and any identified `modifiers`.
* `gafConfig`: The GAF configuration object as described above.

The algorithm calculates the GAF score through the following steps:

### Step 1: Initialize GAF Score

The `currentGAF` score is initialized with the `gafConfig.initialGAF` value (typically `100`). This represents a perfect state of functioning before any issues are considered.

### Step 2: Iterate and Assess Impact of Each Extracted Entity

The algorithm processes each `entity` identified by the NLP pipeline:

1.  **Normalize Entity Text:** The `text` of the current `entity` is normalized (converted to lowercase, accented characters removed, etc.) using `Text.normalize`. This normalized form is used for consistent lookup in the `gafConfig`.
2.  **Determine Base Impact:**
    * The algorithm first attempts to find an exact match for the `normalizedEntityText` within `gafConfig.entityImpact`.
    * If an exact match is not found, it then iterates through all defined keys in `gafConfig.entityImpact` to find a partial match (where the normalized entity text includes the key, or the key includes the normalized entity text). The `impact` is set to the value of the **first** such match found.
    * If no specific match (exact or partial) is found, the `impact` defaults to the value specified under `gafConfig.entityImpact._default`. This ensures every entity has at least a baseline impact.
3.  **Filter by Label:** Importantly, the `impact` of an entity is only considered if its `label` is either `'problem'` or `'therapy'`. If the entity's label is anything else (e.g., `patient_info`, `progress` that might indicate improvement), its calculated `impact` is reset to `0`. This focuses the GAF calculation solely on entities that reflect difficulties or interventions for those difficulties.
4.  **Adjust for Negation:** If the `entity.isNegated` flag is `true` (meaning the problem/therapy was explicitly stated as absent or not occurring), the determined `impact` is multiplied by `gafConfig.negationImpactFactor`. Since `negationImpactFactor` is typically less than 1 (e.g., 0.5), this effectively reduces the negative influence of a negated entity on the GAF score.
5.  **Adjust for Modifiers:** For each `modifierType` (e.g., "intensita", "cronicità") detected with the current `entity`:
    * Both the `modifierType` and its specific `modifierValue` (e.g., "grave") are normalized.
    * The algorithm looks up a corresponding multiplicative factor in `gafConfig.modifiersImpact`.
    * If a matching factor is found, the `impact` is multiplied by this factor. This allows for nuanced adjustments: for example, a "grave" (severe) problem would have its impact increased, while a problem "in remissione" (in remission) would have its impact decreased.
6.  **Decrement GAF Score:** The final calculated `impact` for the current entity (after all adjustments for label, negation, and modifiers) is subtracted from `currentGAF`.

### Step 3: Clamp the Final GAF Score

After processing all entities, the `currentGAF` score is clamped to ensure it falls within the standard GAF range of `0` to `100`. This is done using `Math.max(0, Math.min(100, currentGAF))`, ensuring the score does not go below 0 or above 100.

### Step 4: Return Final GAF Score

The algorithm returns the final, clamped GAF score.

This comprehensive, rule-based approach enables PsyMed to automate the assessment of a patient's overall functioning based on the content of their psychiatric notes, providing a valuable quantitative summary.