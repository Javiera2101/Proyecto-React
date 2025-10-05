const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  // --- NUEVO CAMPO ---
  autoplay: {
    type: Boolean,
    default: false, // Por defecto, la reproducción automática estará desactivada
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;