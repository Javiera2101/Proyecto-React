const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  youtubeId: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String },
  thumbnail: { type: String },
  duration: { type: Number },
  streamUrl: { type: String, required: true },
});

const playlistSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  songs: [songSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true });

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;