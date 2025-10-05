const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // 1. Importar jsonwebtoken

// ... (la función registerUser que ya teníamos se queda igual)
const registerUser = async (req, res) => {
    // ... nuestro código de registro existente
};


// @desc    Autenticar (loguear) un usuario
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    // 1. Obtener email y password del body
    const { email, password } = req.body;

    // 2. Buscar al usuario por su email
    const user = await User.findOne({ email });

    // 3. Si el usuario existe Y la contraseña coincide
    if (user && (await bcrypt.compare(password, user.password))) {
      // 4. Enviar una respuesta con los datos y el token
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id), // Generamos el "pase VIP"
      });
    } else {
      // Si no, enviar un error de credenciales inválidas
      res.status(401).json({ message: 'Email o contraseña inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// Función para generar el Token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // El token expirará en 30 días
  });
};

// @desc    Obtener el perfil del usuario logueado
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  // Gracias a nuestro middleware 'protect', ya tenemos al usuario en req.user
  // Simplemente lo devolvemos
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

// @desc    Actualizar el perfil del usuario
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    // Si el usuario envía una nueva contraseña, la hasheamos antes de guardarla
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      token: generateToken(updatedUser._id), // Opcional: generar un nuevo token
    });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUserProfile,   // <- Exportar
  updateUserProfile, // <- Exportar
};