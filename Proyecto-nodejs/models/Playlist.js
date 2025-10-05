// models/Playlist.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '', // Valor por defecto si no se proporciona
  },
  songs: [
    {
      // Por ahora lo dejaremos simple, ya lo expandiremos después
      title: String,
      artist: String,
      youtubeUrl: String
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId, // Guardará una referencia a un usuario
    required: true,
    ref: 'User' // Establece la relación con el modelo 'User'
  },
  modoReproduccion: {
    type: String,
    enum: ['orden', 'shuffle', 'repeat'], // modos permitidos
    default: 'orden' // valor por defecto
  }
}, {
  timestamps: true
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;