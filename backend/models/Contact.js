const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    trim: true
  },
  mensaje: {
    type: String,
    required: [true, 'El mensaje es requerido'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);
