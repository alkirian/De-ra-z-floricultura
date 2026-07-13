const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ 
      success: false, 
      error: 'Acceso denegado. Cabecera de autorización faltante.' 
    });
  }

  const token = authHeader.replace(/^Bearer\s+/, '');
  const adminPassword = process.env.ADMIN_PASSWORD || 'deraiz2026';

  if (token !== adminPassword) {
    return res.status(401).json({ 
      success: false, 
      error: 'Acceso denegado. Contraseña incorrecta.' 
    });
  }

  next();
};

module.exports = {
  authMiddleware
};
