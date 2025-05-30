// --- 3. Funzione per Calcolare Punteggi BPRS Semplificati ---
function calculateSimplifiedBPRS(structuredData)
{
    let totalBPRSScores = 0;
    const detectedBPRSItems = [];

    for (const category in bprsKeywords)
    {
        if (structuredData[category])
        {
            structuredData[category].forEach(item =>
            {
                // Considera solo gli item NON negati per il calcolo dei punteggi
                if (!item.negated)
                {
                    const foundKeyword = bprsKeywords[category].find(kw => kw.term === item.term);
                    if (foundKeyword)
                    {
                        totalBPRSScores += foundKeyword.bprsScore;
                        detectedBPRSItems.push({ item: item.term, score: foundKeyword.bprsScore, category: category });
                    }
                }
            });
        }
    }
    return { totalBPRSScores, detectedBPRSItems };
}

// --- 4. Funzione per Calcolare Punteggi GAF Semplificati ---
function calculateSimplifiedGAF(structuredData)
{
    let totalGAFImpact = 0;
    const detectedGAFItems = [];

    for (const category in gafKeywords)
    {
        if (structuredData[category])
        {
            structuredData[category].forEach(item =>
            {
                // Considera solo gli item NON negati per il calcolo dei punteggi
                if (!item.negated)
                {
                    const foundKeyword = gafKeywords[category].find(kw => kw.term === item.term);
                    if (foundKeyword)
                    {
                        totalGAFImpact += foundKeyword.gafImpact;
                        detectedGAFItems.push({ item: item.term, impact: foundKeyword.gafImpact, category: category });
                    }
                }
            });
        }
    }
    // GAF è una scala inversa (punteggio alto = buon funzionamento).
    // Questo è solo un esempio, dovresti mappare l'impatto a un punteggio GAF reale (0-100).
    const estimatedGAF = Math.max(0, 100 - (totalGAFImpact * 5)); // Esempio: ogni punto di impatto riduce GAF di 5
    return { totalGAFImpact, detectedGAFItems, estimatedGAF };
}