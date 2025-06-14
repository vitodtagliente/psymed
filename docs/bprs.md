# PsyMed: Brief Psychiatric Rating Scale (BPRS) Calculation Methodology

PsyMed's core functionality includes the calculation of the Brief Psychiatric Rating Scale (BPRS) scores from unstructured psychiatric text. This process leverages the NLP pipeline's ability to extract medical/psychiatric entities and their associated modifiers, mapping them to predefined BPRS categories and assigning scores based on a sophisticated, rule-based algorithm.

The BPRS calculation in PsyMed is governed by two main components:
1.  **`data-ita.json`**: The configuration file that defines BPRS categories, their associated keywords, base scores, and how modifiers influence these scores.
2.  **`bprs.js`**: The JavaScript algorithm that orchestrates the matching of extracted entities to BPRS categories and performs the actual score computation.

## 1. BPRS Configuration (`data-ita.json`)

The `data-ita.json` file serves as the knowledge base for BPRS calculation. It contains two crucial sections for this purpose:

* **`bprsCategories`**: This array defines each individual BPRS symptom or domain that PsyMed will score. Each category object includes:
    * `id`: A unique identifier for the category (e.g., `somatic_concern`, `anxiety`).
    * `name`: The human-readable name of the BPRS category (e.g., "Somatic Concern", "Anxiety").
    * `mappings`: An array of specific text patterns or concepts that map to this BPRS category. Each `mapping` object specifies:
        * `entityTextKeywords`: An array of keywords or phrases. If any of these (or their stemmed forms) are found as an extracted entity in the text, this `mapping` is considered a match for the category.
        * `baseScore`: A numerical value that serves as the initial score for the category if this specific mapping is detected. This represents the baseline severity for the presence of this concept.
        * `modifiersEffect`: An object indicating which types of modifiers (e.g., `intensita`, `cronicità`, `frequenza`, `stato_condizione`, `modalita`) are relevant for this particular `mapping`. A `true` value means that if a modifier of that type is associated with the extracted entity, it will influence the `baseScore`.

* **`modifierWeights`**: This object defines the numerical impact of different modifier values. It's structured by modifier type (e.g., `intensita`, `cronicità`) and, for each type, lists various modifier values (e.g., "lieve", "grave", "cronico") along with their corresponding `weight` (a numerical multiplier). These weights are applied to the `baseScore` of an entity to adjust its final score.

    **Example Modifier Weights from `data-ita.json`:**
    ```json
    "intensita": {
        "lieve": 0.5,
        "moderato": 1.2,
        "grave": 1.5,
        "severa": 1.8,
        "critica": 2.0
    },
    "cronicità": {
        "acuto": 1.0,
        "cronico": 1.5,
        "persistente": 1.3,
        "cronicizzata": 1.7,
        "ricorrente": 1.2,
        "in remissione": 0.2
    }
    ```

## 2. BPRS Calculation Algorithm (`bprs.js`)

The `BPRS.process` method in `bprs.js` takes two main inputs:
* `entities`: An array of `Entity` objects extracted from the text by PsyMed's NLP pipeline. Each `Entity` contains its text, whether it's negated (`isNegated`), and any identified `modifiers` (e.g., `{ intensita: ["grave"], cronicità: ["cronico"] }`).
* `bprsCategories`: The complete BPRS configuration loaded from `data-ita.json`.

The algorithm proceeds through the following steps:

### Step 1: Initialization of Category Scores

All BPRS categories defined in `bprsCategories` are initialized with a default score of `1`. In the standard BPRS, a score of `1` signifies "Not present."

```javascript
// Example initialization:
// bprsScores = {
//     somatic_concern: { name: "Somatic Concern", score: 1 },
//     anxiety: { name: "Anxiety", score: 1 },
//     // ... other categories initialized to 1
// };
```

### Step 2: Mapping Extracted Entities to BPRS Categories

The algorithm iterates through each `entity` extracted from the input text:

1.  **Stemming:** The `text` of each extracted `entity` is first stemmed (using `Text.stemItalian`) to ensure robust matching against the `entityTextKeywords` in `data-ita.json`, regardless of grammatical inflections (e.g., "ansia" and "ansioso" might both stem to a common root like "ans").
2.  **Keyword Matching:** For each stemmed entity, the algorithm checks against every `mapping` within all `bprsCategories`. A match is declared if the stemmed entity text is included in, or includes, any of the stemmed `entityTextKeywords` defined in a `mapping`. This broad matching allows for flexibility in identifying symptoms.
3.  **Categorization (Positive/Negative):**
    * If an entity matches a `mapping` and its `isNegated` flag is `false` (meaning the symptom is described as present), the entity (along with its matched `mapping` and base score) is added to a `positive` list for that category.
    * If the `isNegated` flag is `true` (meaning the symptom is explicitly denied or absent), the entity is added to a `negative` list for that category. This distinction is crucial for accurate BPRS scoring.

### Step 3: Calculating Individual Category Scores

After all entities have been mapped to their respective categories, the algorithm calculates a final score for each BPRS category:

1.  **Default Score:** Each category's score starts at its initial default of `1`.
2.  **Processing Positive Entities:**
    * If a category has one or more `positive` entities mapped to it:
        * A `maxPositiveScore` is initialized to `1` (the minimum possible BPRS score for an item that is present, meaning "Very Mild" or "Present but not severe").
        * For each `positive` entity found for this category:
            * The `scoreForThisMapping` is initially set to the `baseScore` defined in the `mapping` that the entity matched (e.g., `4.0` for a basic "anxiety" match).
            * **Applying Modifiers:** The algorithm then iterates through the `modifiersEffect` defined in the matched `mapping`.
                * For each modifier type that is marked `true` in `modifiersEffect` (e.g., `intensita`), it checks if the extracted `entity` actually has a modifier of that specific type (e.g., `entity.modifiers.intensita` exists).
                * If both conditions are met, it takes the **first** modifier value found for that type (e.g., "grave" for "intensita"), stems this modifier value, and looks up its corresponding `weight` in the global `modifierWeights` configuration.
                * The `scoreForThisMapping` is then multiplied by this `weight`. This allows for dynamic adjustment of the score based on the severity, chronicity, frequency, or other attributes of the detected symptom. For example, "severe anxiety" would result in a higher score than just "anxiety."
            * **Score Clamping:** The `scoreForThisMapping` is then clamped to the valid BPRS range of `1` to `7` using `Math.min(7, Math.max(1, scoreForThisMapping))`. This ensures that no calculated score falls outside the typical BPRS scale boundaries.
            * **Maximum Score Selection:** The `maxPositiveScore` for the category is updated to be the highest `scoreForThisMapping` calculated among all positive entities found for that category. This means if multiple instances of a symptom are found within the text with varying degrees of severity (e.g., "mild anxiety" and "severe anxiety"), the BPRS category score will reflect the most severe manifestation detected.
        * The `finalScore` for the category is set to this `maxPositiveScore`.
3.  **Handling Negative-Only Categories:** If a category has `negative` entities (i.e., the symptom was mentioned but explicitly negated) but **no** `positive` entities found for it, its `finalScore` is explicitly set to `1` ("Not present"). This correctly reflects that while the symptom was discussed, it was stated as absent.
4.  **No Entities:** If a category has neither positive nor negative entities found in the text, its score remains the initial default of `1`.

### Step 4: Calculating the Total BPRS Score

Once all individual category scores have been determined (18 categories in the standard BPRS), the `totalBPRSScore` is calculated by simply summing up the `finalScore` of all these categories.

### Step 5: Returning Results

The `BPRS.process` method returns an object containing:
* `scores`: An object detailing each BPRS category's ID, name, and its calculated score.
* `totalScore`: The aggregate sum of all individual category scores.

This systematic and configurable approach allows PsyMed to translate complex clinical narratives into quantifiable BPRS scores, providing a structured and automated assessment of psychiatric symptomatology based on the input text.