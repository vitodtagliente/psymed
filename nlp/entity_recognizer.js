const { normalizeText } = require('../utils/text_processor');

function findEntities(text, keywords, entityType)
{
    const foundEntities = new Set();
    const normalizedText = normalizeText(text);

    keywords.forEach(keyword =>
    {
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'g');

        if (regex.test(normalizedText))
        {
            foundEntities.add({ text: keyword, label: entityType });
        }
    });
    return Array.from(foundEntities);
}

module.exports = {
    findEntities
};