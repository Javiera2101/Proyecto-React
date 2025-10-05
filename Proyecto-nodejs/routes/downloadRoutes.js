const express = require('express');
const router = express.Router();
const { downloadAudio } = require('../controllers/downloadController.js');

router.post('/', downloadAudio);

module.exports = router;