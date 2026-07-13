const express = require('express');
const { getCatalog, saveCatalog, resetCatalog, uploadCatalogImage } = require('../controllers/catalog.controller');
const { uploadPlantImage } = require('../middleware/upload.middleware');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', getCatalog);
router.post('/', authMiddleware, saveCatalog);
router.post('/reset', authMiddleware, resetCatalog);
router.post('/upload', authMiddleware, uploadPlantImage, uploadCatalogImage);

module.exports = router;
