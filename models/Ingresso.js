const mongoose = require('mongoose');

const ingressoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  evento: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento', required: true },
  valor: { type: Number, required: true }
});

module.exports = mongoose.model('Ingresso', ingressoSchema);
