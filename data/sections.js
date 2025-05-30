module.exports = [
    { name: "anamnesi", patterns: ["anamnesi:", "storia clinica:"] },
    { name: "esame_obiettivo", patterns: ["esame obiettivo:", "e.o.:", "obiettività:"] },
    { name: "diagnosi", patterns: ["diagnosi:", "diagnosi principale:"] },
    { name: "terapia", patterns: ["terapia:", "terapia in atto:", "piano terapeutico:"] },
    { name: "conclusioni", patterns: ["conclusioni:", "considerazioni finali:"] },
    { name: "prognosi", patterns: ["prognosi:"] },
    { name: "esami_strumentali", patterns: ["esami strumentali:", "indagini strumentali:", "imaging:"] },
    { name: "laboratorio", patterns: ["esami di laboratorio:", "laboratorio:"] }
    // ...
];