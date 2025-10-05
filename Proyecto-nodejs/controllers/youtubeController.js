const ytdlp = require('yt-dlp-exec');

const getVideoInfo = async (req, res) => {
  try {
    const { youtubeUrl } = req.body;
    if (!youtubeUrl) {
      return res.status(400).json({ message: 'Se requiere una URL de YouTube' });
    }

    const info = await ytdlp(youtubeUrl, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    });

    const audioFormat = info.formats.find(f => f.vcodec === 'none' && f.acodec !== 'none');

    if (!audioFormat || !audioFormat.url) {
      return res.status(404).json({ message: 'No se encontró una URL de streaming de solo audio.' });
    }
    
    res.status(200).json({
      youtubeId: info.id,
      title: info.title,
      artist: info.uploader,
      thumbnail: info.thumbnail,
      duration: info.duration,
      streamUrl: audioFormat.url,
    });

  } catch (error) {
    console.error('Error al obtener información de YouTube:', error);
    res.status(500).json({ message: 'Error al procesar la URL de YouTube', error: error.message });
  }
};

module.exports = { getVideoInfo };