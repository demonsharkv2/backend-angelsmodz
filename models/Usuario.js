const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  numero: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  senha: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
