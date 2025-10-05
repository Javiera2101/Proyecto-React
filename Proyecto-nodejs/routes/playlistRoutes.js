// routes/playlistRoutes.js

const express = require('express');
const router = express.Router();
const { createPlaylist, getMyPlaylists, updatePlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist } = require('../controllers/playlistController.js');
const { protect } = require('../middleware/authMiddleware.js'); // 1. Importamos al "guardia"

// 2. Le decimos a la ruta que use el middleware 'protect' antes de ejecutar 'createPlaylist'
// Cualquier petición a esta ruta primero pasará por el "guardia"
router.route('/')
    .post(protect, createPlaylist);

router.route('/myplaylists')
    .get(protect, getMyPlaylists);

router.route('/:id')
    .put(protect, updatePlaylist)
    .delete(protect, deletePlaylist);

// Rutas para canciones dentro de una playlist
router.route('/:id/songs')
    .post(protect, addSongToPlaylist);

router.route('/:id/songs/:songId')
    .delete(protect, removeSongFromPlaylist);

module.exports = router;