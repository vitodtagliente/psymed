const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const sentenceTokenizer = new natural.SentenceTokenizer();

function normalizeText(text)
{
    let normalized = text.toLowerCase();
    // remove symbols
    normalized = normalized.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    // remove duplicated spaces
    normalized = normalized.replace(/\s{2,}/g, " ");
    return normalized;
}

function tokenizeWords(text)
{
    return tokenizer.tokenize(text);
}

function tokenizeSentences(text)
{
    return sentenceTokenizer.tokenize(text);
}

module.exports = {
    normalizeText,
    tokenizeWords,
    tokenizeSentences
};