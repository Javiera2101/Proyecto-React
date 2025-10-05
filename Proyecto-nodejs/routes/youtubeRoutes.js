const express = require('express');
const router = express.Router();
const { getVideoInfo } = require('../controllers/youtubeController.js');

router.post('/info', getVideoInfo);

module.exports = router;