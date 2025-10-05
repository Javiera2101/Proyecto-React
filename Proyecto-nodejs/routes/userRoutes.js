const express = require('express');
const router = express.Router();
// 1. Importar loginUser junto a registerUser
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.post('/register', registerUser);
// 2. Añadir la nueva ruta para el login
router.post('/login', loginUser);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;