const fs = require('fs');
const path = require('path');

const OVERRIDES_FILE = path.join(__dirname, '..', 'data', 'catalog_overrides.json');
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, '..', '..', '..', 'public', 'uploads');

// Ensure directories exist
try {
  fs.mkdirSync(path.dirname(OVERRIDES_FILE), { recursive: true });
} catch (e) {
  // Ignore
}
try {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
} catch (e) {
  // Ignore
}

// GET /api/catalog
const getCatalog = (req, res, next) => {
  try {
    if (fs.existsSync(OVERRIDES_FILE)) {
      const data = fs.readFileSync(OVERRIDES_FILE, 'utf-8');
      const products = JSON.parse(data);
      return res.json(products);
    }
    // Return empty array if no overrides have been written yet
    return res.json([]);
  } catch (error) {
    return next(error);
  }
};

// POST /api/catalog
const saveCatalog = (req, res, next) => {
  try {
    const products = req.body;
    if (!Array.isArray(products)) {
      const error = new Error('Formato de datos inválido. Debe ser un array.');
      error.status = 400;
      return next(error);
    }

    fs.writeFileSync(OVERRIDES_FILE, JSON.stringify(products, null, 2), 'utf-8');
    return res.json({ success: true, message: 'Catálogo guardado exitosamente en el servidor.' });
  } catch (error) {
    return next(error);
  }
};

// POST /api/catalog/reset
const resetCatalog = (req, res, next) => {
  try {
    if (fs.existsSync(OVERRIDES_FILE)) {
      fs.unlinkSync(OVERRIDES_FILE);
    }
    return res.json({ success: true, message: 'Sobreescritura del catálogo eliminada. Restablecido al estado inicial.' });
  } catch (error) {
    return next(error);
  }
};

// POST /api/catalog/upload
const uploadCatalogImage = (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('No se recibió ninguna imagen.');
      error.status = 400;
      return next(error);
    }

    // Since we are using memoryStorage in upload.middleware.js,
    // let's physically write the file to public/uploads
    const fileExt = req.file.mimetype === 'image/png' ? '.png' : '.jpg';
    const filename = `prod_${Date.now()}${fileExt}`;
    const filePath = path.join(UPLOADS_DIR, filename);

    fs.writeFileSync(filePath, req.file.buffer);

    // Return the relative URL served by Vite's dev server or static site
    const imageUrl = `/uploads/${filename}`;
    
    return res.json({
      success: true,
      message: 'Imagen subida exitosamente.',
      imageUrl
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCatalog,
  saveCatalog,
  resetCatalog,
  uploadCatalogImage
};
