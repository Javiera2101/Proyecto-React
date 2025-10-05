const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Importamos cors
const path = require('path');
const userRoutes = require('./routes/userRoutes.js'); // Importamos nuestras rutas
const playlistRoutes = require('./routes/playlistRoutes.js');
const downloadRoutes = require('./routes/downloadRoutes.js');

dotenv.config();

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors()); // Usamos cors para permitir peticiones desde el frontend
app.use(express.json()); // MUY IMPORTANTE: para que el backend entienda el JSON que envía el frontend

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('¡Conexión exitosa a MongoDB!'))
  .catch((error) => console.error('Error de conexión a MongoDB:', error));

// Rutas
app.get('/', (req, res) => {
  res.send('API del reproductor de música funcionando...');
});

app.use('/downloads', express.static(path.join(__dirname, 'downloads'))); // Servimos archivos estáticos desde la carpeta 'downloads'

app.use('/api/users', userRoutes); // Le decimos a la app que use las rutas de usuario
app.use('/api/playlists', playlistRoutes); // Rutas de playlists
app.use('/api/download', downloadRoutes); // Rutas de descarga



app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});