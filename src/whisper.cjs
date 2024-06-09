const { Leopard } = require("@picovoice/leopard-node");
const accessKey = "nY9GJz9JbNi2KbmJ/VxrmDwoOPk/XKDi8LE45lFPGYpSlL6t03ZlsA==";
let leopard = new Leopard(accessKey);
const result = leopard.processFile('harvard.wav');
console.log(result.transcript);