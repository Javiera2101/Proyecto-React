// controllers/downloadController.js
const ytdlp = require('yt-dlp-exec');
const path = require('path');
const fs = require('fs');

const downloadSong = async (req, res) => {
  try {
    const { youtubeUrl } = req.body;
    if (!youtubeUrl) {
      return res.status(400).json({ message: 'Se requiere una URL de YouTube' });
    }

    const downloadsPath = path.join(__dirname, '..', 'downloads');
    if (!fs.existsSync(downloadsPath)) {
      fs.mkdirSync(downloadsPath);
    }

    console.log(`Iniciando descarga para: ${youtubeUrl}`);

    // Usamos ytdlp para descargar el archivo
    await ytdlp(youtubeUrl, {
      extractAudio: true,
      audioFormat: 'mp3',
      output: path.join(downloadsPath, '%(id)s.%(ext)s'),
    });

    // Obtenemos la info para saber el nombre del archivo
    const info = await ytdlp(youtubeUrl, { dumpSingleJson: true });
    const filePath = `/downloads/${info.id}.mp3`;

    console.log(`Descarga finalizada. Archivo en: ${filePath}`);

    // Devolvemos la ruta para que el frontend pueda ofrecer el enlace de descarga
    res.status(200).json({
      message: 'Descarga completada',
      filePath: filePath,
    });

  } catch (error) {
    console.error('Error en la descarga:', error);
    res.status(500).json({ message: 'Error al descargar la canción.' });
  }
};

module.exports = { downloadSong };