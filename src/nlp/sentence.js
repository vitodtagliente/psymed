const Text = require("../utils/text");
const Token = require("./token");

class Sentence
{
    constructor(text)
    {
        this.tokens = [];
        this.text = text;

        var _tokens = Text.tokenize(text);
        for (const _token of _tokens)
        {
            this.tokens.push(new Token(_token));
        }
    }

    static identify(text)
    {
        let sentences = [];
        const _sentences = Text.tokenizeSentences(text);
        for (let _sentence of _sentences)
        {
            sentences.push(new Sentence(_sentence));
        }
        return sentences;
    }
}

module.exports = Sentence;