const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  type: { type: String, enum: ['CPF', 'CNPJ'], required: true },
  number: { type: String, required: true, unique: true },
  isBlocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Document', DocumentSchema);