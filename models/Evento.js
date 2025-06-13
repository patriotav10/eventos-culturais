const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    local: { type: String, required: true },
    data: { type: Date, required: true }
});

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento;
