const { identifyWithPlantnet } = require('../services/plantnet.service');

const identifyPlant = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Debes subir una imagen JPG o PNG en el campo "image".',
        details: 'Campo requerido: image (multipart/form-data).',
      });
    }

    const result = await identifyWithPlantnet(req.file);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  identifyPlant,
};
