// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // El nombre de usuario debe ser único
    trim: true // Elimina espacios en blanco al inicio y al final
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true // Guarda el email siempre en minúsculas
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Añade automáticamente los campos createdAt y updatedAt
});

// Creamos el modelo 'User' a partir del schema 'userSchema' y lo exportamos
const User = mongoose.model('User', userSchema);

module.exports = User;