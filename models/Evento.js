const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  data: { type: String, required: true },
  local: { type: String, required: true }
});

module.exports = mongoose.model('Evento', eventoSchema);
