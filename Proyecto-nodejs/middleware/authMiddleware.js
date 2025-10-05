const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const protect = async (req, res, next) => {
  let token;

  // Verificamos si la petición tiene la cabecera 'Authorization' y empieza con 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Obtenemos el token de la cabecera (sin la palabra 'Bearer')
      token = req.headers.authorization.split(' ')[1];

      // 2. Verificamos el token usando nuestro secreto
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Buscamos al usuario en la BD con el ID del token y lo adjuntamos a la petición
      // Esto hará que el usuario esté disponible en las rutas protegidas
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Si todo sale bien, continuamos a la siguiente función (el controlador)
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'No autorizado, token falló' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No autorizado, no hay token' });
  }
};

module.exports = { protect };