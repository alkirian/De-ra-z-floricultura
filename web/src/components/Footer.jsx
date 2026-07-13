import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { BIZ_INFO } from '../data/mockData';
import './Footer.css';

const Footer = () => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BIZ_INFO.name} ${BIZ_INFO.location}`)}`;
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <footer className="footer site-footer">
      <div className="footer-plant-decor-container">
        <div 
          className="footer-plant-decor footer-plant-1" 
          style={{
            maskImage: `url(${baseUrl}images/grass-leaf-plant-14-svgrepo-com.svg)`,
            WebkitMaskImage: `url(${baseUrl}images/grass-leaf-plant-14-svgrepo-com.svg)`
          }}
        />
        <div 
          className="footer-plant-decor footer-plant-3" 
          style={{
            maskImage: `url(${baseUrl}images/grass-leaf-plant-11-svgrepo-com.svg)`,
            WebkitMaskImage: `url(${baseUrl}images/grass-leaf-plant-11-svgrepo-com.svg)`
          }}
        />
        <div 
          className="footer-plant-decor footer-plant-2" 
          style={{
            maskImage: `url(${baseUrl}images/grass-leaf-plant-11-svgrepo-com.svg)`,
            WebkitMaskImage: `url(${baseUrl}images/grass-leaf-plant-11-svgrepo-com.svg)`
          }}
        />
        <div 
          className="footer-plant-decor footer-plant-4" 
          style={{
            maskImage: `url(${baseUrl}images/grass-leaf-plant-14-svgrepo-com.svg)`,
            WebkitMaskImage: `url(${baseUrl}images/grass-leaf-plant-14-svgrepo-com.svg)`
          }}
        />
      </div>

      <div className="footer-main">
        <div className="container footer-container footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={`${import.meta.env.BASE_URL}images/logo-hero-white.webp`} alt="De Raíz Floricultura" className="footer-logo-image" />
            </Link>
            <p className="footer-description">
              Floricultura especializada en plantas de interior y exterior, con asesoramiento local en Las Piedras.
            </p>
            <div className="footer-socials">
              <a href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Ver ubicación en Google Maps" className="social-link"><Globe size={20} /></a>
            </div>
          </div>

          <nav className="footer-links-group footer-nav" aria-label="Navegación del footer">
            <h4 className="footer-heading footer-title">Navegación</h4>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to="/aprende-de-raiz">Aprende de Raíz</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </nav>

          <div className="footer-links-group footer-contact-group">
            <h4 className="footer-heading footer-title">Contacto</h4>
            <ul className="footer-contact footer-contact-list">
              <li className="footer-contact-item">
                <MapPin size={18} />
                <span>
                  Las Piedras, Canelones
                  <br />
                  Ruta 48, Uruguay
                </span>
              </li>
              <li className="footer-contact-item">
                <Phone size={18} />
                <a href={`tel:+${BIZ_INFO.phone}`}>+598 9330 7699</a>
              </li>
              <li className="footer-contact-item">
                <Mail size={18} />
                <a href="mailto:info@deraizfloricultura.com">info@deraizfloricultura.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p className="footer-copyright" style={{ margin: 0 }}>&copy; 2026 De Raíz Floricultura. Todos los derechos reservados.</p>
          <Link to="/admin" className="footer-admin-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'rgba(244, 235, 221, 0.45)', transition: 'color var(--t-fast)' }}>
            <span style={{ fontSize: '0.75rem' }}>🔒</span> Acceso Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
