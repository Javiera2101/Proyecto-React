const YTDlpWrap = require('yt-dlp-wrap').default;
const path = require('path');
const fs = require('fs');

const downloadAudio = async (req, res) => {
  try {
    const { youtubeUrl } = req.body;
    if (!youtubeUrl) {
      return res.status(400).json({ message: 'Se requiere una URL de YouTube' });
    }

    const ytDlpWrap = new YTDlpWrap();
    const downloadsPath = path.join(__dirname, '..', 'downloads');
    if (!fs.existsSync(downloadsPath)) {
      fs.mkdirSync(downloadsPath);
    }

    // Variable para almacenar la metadata del video
    let videoMetadata = {};

    ytDlpWrap.exec([
      youtubeUrl,
      '-x',
      '--audio-format', 'mp3',
      '--print-json', // <-- 1. Le pedimos a yt-dlp que imprima la metadata en formato JSON
      '-o', path.join(downloadsPath, '%(id)s.%(ext)s'),
    ])
    .on('progress', (progress) => {
      console.log(progress.percent, progress.totalSize, progress.currentSpeed, progress.eta);
    })
    .on('ytDlpEvent', (eventType, eventData) => {
      // 2. Capturamos la metadata cuando yt-dlp nos la envía
      if (eventType === 'info') {
        videoMetadata = JSON.parse(eventData);
      }
    })
    .on('error', (error) => {
      console.error('Error durante la descarga:', error);
      res.status(500).json({ message: 'Error al descargar el audio', error: error.message });
    })
    .on('close', () => {
      console.log('¡Descarga finalizada!');
      // 3. Ahora usamos la metadata que ya capturamos, sin hacer otra llamada
      if (videoMetadata && videoMetadata.id) {
        const filePath = `/downloads/${videoMetadata.id}.mp3`;
        res.status(200).json({
          message: 'Descarga completa',
          title: videoMetadata.title,
          artist: videoMetadata.uploader,
          filePath: filePath,
        });
      } else {
        res.status(500).json({ message: 'Descarga completa, pero no se pudo capturar la metadata.' });
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

module.exports = { downloadAudio };