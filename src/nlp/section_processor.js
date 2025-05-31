class SectionProcessor
{
    static identify(text, rules)
    {
        return [text.toLowerCase()];
    }
}

module.exports = SectionProcessor;