const mongoose = require('mongoose');

const vinylSchema = new mongoose.Schema({
  categoria: {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: ['Rock', 'Pop', 'Jazz', 'Clásica', 'Blues', 'Metal', 'Electrónica'],
    trim: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  precio: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: 0
  },
  stock: {
    type: Number,
    required: [true, 'El stock es requerido'],
    min: 0,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vinyl', vinylSchema);
