// controllers/playlistController.js

const Playlist = require('../models/Playlist.js');

// @desc    Crear una nueva playlist
// @route   POST /api/playlists
// @access  Private (protegido)
const createPlaylist = async (req, res) => {
  try {
    // 1. Obtenemos el nombre y la descripción del cuerpo de la petición
    const { name, description } = req.body;

    // 2. Verificamos que el nombre de la playlist no esté vacío
    if (!name) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    // 3. Creamos la nueva playlist
    const playlist = new Playlist({
      name,
      description,
      user: req.user._id, // ¡Aquí está la magia! Asociamos la playlist con el usuario logueado
    });

    // 4. Guardamos la playlist en la base de datos
    const createdPlaylist = await playlist.save();

    // 5. Enviamos la playlist creada como respuesta
    res.status(201).json(createdPlaylist);

  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

const getMyPlaylists = async (req, res) => {
  try {
    // 1. Buscar todas las playlists donde el campo 'user' coincida con el ID del usuario logueado
    const playlists = await Playlist.find({ user: req.user._id });

    // 2. Devolver las playlists encontradas
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// @desc    Actualizar una playlist
// @route   PUT /api/playlists/:id
// @access  Private
const updatePlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const playlist = await Playlist.findById(req.params.id);

    if (playlist) {
      // Verificar que el usuario logueado es el dueño de la playlist
      if (playlist.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Usuario no autorizado' });
      }

      playlist.name = name || playlist.name;
      playlist.description = description || playlist.description;

      const updatedPlaylist = await playlist.save();
      res.json(updatedPlaylist);
    } else {
      res.status(404).json({ message: 'Playlist no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// @desc    Eliminar una playlist
// @route   DELETE /api/playlists/:id
// @access  Private
const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (playlist) {
      if (playlist.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Usuario no autorizado' });
      }

      await playlist.deleteOne();
      res.json({ message: 'Playlist eliminada' });
    } else {
      res.status(404).json({ message: 'Playlist no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// @desc    Añadir una canción a una playlist
// @route   POST /api/playlists/:id/songs
// @access  Private
const addSongToPlaylist = async (req, res) => {
  try {
    const { title, artist, youtubeUrl } = req.body;
    const playlist = await Playlist.findById(req.params.id);

    if (playlist) {
      // Verificar que el usuario logueado es el dueño
      if (playlist.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Usuario no autorizado' });
      }

      // Crear el objeto de la nueva canción
      const song = { title, artist, youtubeUrl };

      // Añadir la canción al array de canciones
      playlist.songs.push(song);

      await playlist.save();
      res.status(201).json(playlist);
    } else {
      res.status(404).json({ message: 'Playlist no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// @desc    Eliminar una canción de una playlist
// @route   DELETE /api/playlists/:id/songs/:songId
// @access  Private
const removeSongFromPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);

        if (playlist) {
            // Verificar dueño
            if (playlist.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Usuario no autorizado' });
            }

            // Buscar la canción dentro del array y eliminarla
            playlist.songs = playlist.songs.filter(
                (song) => song._id.toString() !== req.params.songId
            );

            await playlist.save();
            res.json({ message: 'Canción eliminada de la playlist' });
        } else {
            res.status(404).json({ message: 'Playlist no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

const cambiarModoReproduccion = async (req, res) => {
  try {
    const { id } = req.params;
    const { modoReproduccion } = req.body;

    const modosValidos = ['orden', 'shuffle', 'repeat'];
    if (!modosValidos.includes(modoReproduccion)) {
      return res.status(400).json({ error: 'Modo de reproducción inválido.' });
    }

    const playlist = await Playlist.findByIdAndUpdate(
        id,
        { modoReproduccion },
        { new: true }
    );

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist no encontrada.' });
    }

    res.status(200).json({
      mensaje: 'Modo de reproducción actualizado correctamente.',
      playlist
    });
  } catch (error) {
    console.error('Error al cambiar el modo de reproducción:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = {
  createPlaylist,
  getMyPlaylists,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,      
  removeSongFromPlaylist,
  cambiarModoReproduccion,
};