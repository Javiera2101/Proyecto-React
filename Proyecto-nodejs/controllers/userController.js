const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- Funciones de Autenticación y Registro ---

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({ _id: user._id, username: user.username, email: user.email });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Email o contraseña inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// --- Funciones de Perfil de Usuario ---

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      autoplay: user.autoplay, // Devolvemos también el estado de autoplay
    });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

const updateUserEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Debes enviar un nuevo email' });
    }
    const emailExists = await User.findOne({ email: email });
    if (emailExists && emailExists._id.toString() !== req.user._id.toString()) {
        return res.status(400).json({ message: 'El email ya está en uso por otra cuenta.' });
    }
    const user = await User.findById(req.user._id);
    user.email = email;
    await user.save();
    res.status(200).json({
      message: 'Email actualizado correctamente',
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// @desc    Actualizar PARCIALMENTE la configuración de autoplay
// @route   PATCH /api/users/profile/autoplay
// @access  Private
const updateUserAutoplay = async (req, res) => {
    try {
        const { autoplay } = req.body;

        // Verificamos que el valor enviado sea un booleano
        if (typeof autoplay !== 'boolean') {
            return res.status(400).json({ message: 'El valor de autoplay debe ser true o false.' });
        }

        const user = await User.findById(req.user._id);
        user.autoplay = autoplay;
        await user.save();

        res.status(200).json({
            message: `Reproducción automática ${autoplay ? 'activada' : 'desactivada'}.`,
            autoplay: user.autoplay,
        });

    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

// --- Función Auxiliar ---
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUserEmail,
  updateUserAutoplay,
};