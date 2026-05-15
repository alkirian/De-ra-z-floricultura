const multer = require('multer');

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    callback(null, true);
    return;
  }

  const typeError = new Error('Formato no permitido. Subi una imagen JPG o PNG.');
  typeError.code = 'INVALID_FILE_TYPE';
  callback(typeError);
};

const uploadPlantImage = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter,
}).single('image');

module.exports = {
  uploadPlantImage,
  MAX_FILE_SIZE_BYTES,
  ALLOWED_MIME_TYPES,
};
