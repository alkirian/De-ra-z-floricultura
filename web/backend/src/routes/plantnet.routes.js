const express = require('express');
const { identifyPlant } = require('../controllers/plantnet.controller');
const { uploadPlantImage } = require('../middleware/upload.middleware');

const router = express.Router();

router.post('/identify', uploadPlantImage, identifyPlant);

module.exports = router;
