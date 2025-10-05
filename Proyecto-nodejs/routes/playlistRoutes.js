const express = require('express');
const router = express.Router();
const {
  createPlaylist,
  getMyPlaylists,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = require('../controllers/playlistController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Rutas para la gestión de playlists (crear, obtener mis playlists)
router.route('/')
  .post(protect, createPlaylist);

router.route('/myplaylists')
  .get(protect, getMyPlaylists);

// Rutas para una playlist específica (actualizar, eliminar)
router.route('/:id')
  .put(protect, updatePlaylist)
  .delete(protect, deletePlaylist);

// Rutas para la gestión de canciones DENTRO de una playlist
router.route('/:id/songs')
  .post(protect, addSongToPlaylist);

router.route('/:id/songs/:songId')
  .delete(protect, removeSongFromPlaylist);

module.exports = router;