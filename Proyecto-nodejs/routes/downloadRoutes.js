// routes/downloadRoutes.js
const express = require('express');
const router = express.Router();
const { downloadSong } = require('../controllers/downloadController.js');

// Esta ruta puede ser protegida si quieres que solo usuarios logueados descarguen
// const { protect } = require('../middleware/authMiddleware.js');
// router.post('/', protect, downloadSong);

router.post('/', downloadSong);

module.exports = router;