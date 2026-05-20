import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { BIZ_INFO } from '../data/mockData';
import './Footer.css';

const Footer = () => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BIZ_INFO.name} ${BIZ_INFO.location}`)}`;

  return (
    <footer className="footer site-footer">
      <div className="footer-main">
        <div className="container footer-container footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={`${import.meta.env.BASE_URL}images/logo-hero-white.png`} alt="De Raíz Floricultura" className="footer-logo-image" />
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
        <div className="container">
          <p className="footer-copyright">&copy; 2026 De Raíz Floricultura. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
