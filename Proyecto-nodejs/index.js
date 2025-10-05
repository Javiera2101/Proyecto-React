// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Asegúrate de que path está importado

// Importar rutas
const userRoutes = require('./routes/userRoutes.js');
const playlistRoutes = require('./routes/playlistRoutes.js');
const youtubeRoutes = require('./routes/youtubeRoutes.js');
const downloadRoutes = require('./routes/downloadRoutes.js'); // <-- AÑADIR

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// <-- AÑADIR ESTA LÍNEA DE NUEVO
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('¡Conexión exitosa a MongoDB!'))
  .catch((error) => console.error('Error de conexión a MongoDB:', error));

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/youtube', youtubeRoutes);
app.use('/api/download', downloadRoutes); // <-- AÑADIR

app.get('/', (req, res) => res.send('API funcionando...'));
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));