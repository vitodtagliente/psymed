const Text = require("../utils/text");

class Token
{
    constructor(text)
    {
        this.name = Text.stemItalian(text);
        this.text = text;
    }
}

module.exports = Token;