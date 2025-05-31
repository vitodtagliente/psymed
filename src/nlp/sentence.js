const Text = require("../utils/text");
const Token = require("./token");

class Sentence
{
    constructor(text)
    {
        this.tokens = [];
        var _tokens = Text.tokenize(text);
        for (const _token of _tokens)
        {
            this.tokens.push(new Token(_token));
        }
    }
}

module.exports = Sentence;