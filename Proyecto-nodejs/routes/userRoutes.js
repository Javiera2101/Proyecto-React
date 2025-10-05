const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUserEmail,
  updateUserAutoplay,
} = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Rutas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);

// Rutas protegidas para el perfil completo
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Rutas protegidas para actualizaciones parciales (PATCH)
router.patch('/profile/email', protect, updateUserEmail);
router.patch('/profile/autoplay', protect, updateUserAutoplay);

module.exports = router;