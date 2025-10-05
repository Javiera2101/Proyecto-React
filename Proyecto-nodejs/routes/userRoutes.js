const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile,
  updateUserEmail //nuevo controlador
} = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//Nueva ruta PATCH solo para actualizar el email del usuario
router.patch('/update-email', protect, updateUserEmail);

module.exports = router;