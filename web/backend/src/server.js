const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const plantnetRoutes = require('./routes/plantnet.routes');

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  }),
);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'backend-plantnet' });
});

app.use('/api/plantnet', plantnetRoutes);

app.use((error, req, res, next) => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      error: 'La imagen supera el limite de 10 MB.',
      details: 'Subi una imagen mas liviana.',
    });
  }

  if (error.code === 'INVALID_FILE_TYPE') {
    return res.status(400).json({
      success: false,
      error: 'Formato no permitido. Solo JPG o PNG.',
      details: error.message,
    });
  }

  const status = error.status || 500;
  const publicError = error.publicError || 'Error interno del servidor.';

  return res.status(status).json({
    success: false,
    error: publicError,
    details: error.details || error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Backend PlantNet escuchando en http://localhost:${PORT}`);
});
