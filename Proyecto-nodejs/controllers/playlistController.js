const Playlist = require('../models/Playlist.js');

// @desc    Crear una nueva playlist
// @route   POST /api/playlists
// @access  Private
const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }
    const playlist = new Playlist({ name, description, user: req.user._id });
    const createdPlaylist = await playlist.save();
    res.status(201).json(createdPlaylist);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// @desc    Obtener las playlists del usuario logueado
// @route   GET /api/playlists/myplaylists
// @access  Private
const getMyPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// @desc    Actualizar una playlist
// @route   PUT /api/playlists/:id
// @access  Private
const updatePlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const playlist = await Playlist.findById(req.params.id);

    if (playlist) {
      if (playlist.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Usuario no autorizado' });
      }
      playlist.name = name || playlist.name;
      playlist.description = description === undefined ? playlist.description : description;
      const updatedPlaylist = await playlist.save();
      res.json(updatedPlaylist);
    } else {
      res.status(404).json({ message: 'Playlist no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// @desc    Eliminar una playlist
// @route   DELETE /api/playlists/:id
// @access  Private
const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (playlist) {
      if (playlist.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Usuario no autorizado' });
      }
      await playlist.deleteOne();
      res.json({ message: 'Playlist eliminada' });
    } else {
      res.status(404).json({ message: 'Playlist no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// @desc    Añadir una canción a una playlist
// @route   POST /api/playlists/:id/songs
// @access  Private
const addSongToPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist no encontrada' });
    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Usuario no autorizado' });
    }
    const newSong = req.body;
    if (!newSong.youtubeId || !newSong.title || !newSong.streamUrl) {
      return res.status(400).json({ message: 'Faltan datos de la canción.' });
    }
    playlist.songs.push(newSong);
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// @desc    Eliminar una canción de una playlist
// @route   DELETE /api/playlists/:id/songs/:songId
// @access  Private
const removeSongFromPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist no encontrada' });
    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Usuario no autorizado' });
    }
    playlist.songs = playlist.songs.filter(
      (song) => song._id.toString() !== req.params.songId
    );
    await playlist.save();
    res.json({ message: 'Canción eliminada de la playlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

module.exports = {
  createPlaylist,
  getMyPlaylists,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
};