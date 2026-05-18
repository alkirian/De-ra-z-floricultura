import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { BIZ_INFO } from '../data/mockData';
import './Footer.css';

const Footer = () => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BIZ_INFO.name} ${BIZ_INFO.location}`)}`;

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={`${import.meta.env.BASE_URL}images/logo-hero-white.png`} alt="De Raíz Floricultura" className="footer-logo-image" />
          </Link>
          <p className="footer-description">
            Floricultura especializada en plantas de interior, exterior y regalos. Te acompañamos a elegir la mejor opción para tu espacio con asesoramiento local en Las Piedras.
          </p>
          <div className="footer-socials">
            <a href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Ver ubicación en Google Maps" className="social-link"><Globe size={20} /></a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Navegación</h4>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/asesoramiento">Te ayudo a elegir</Link></li>
            <li><Link to="/regalos">Regalos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Contacto</h4>
          <ul className="footer-contact">
            <li>
              <MapPin size={18} />
              <span>{BIZ_INFO.location}</span>
            </li>
            <li>
              <Phone size={18} />
              <a href={`tel:+${BIZ_INFO.phone}`}>+{BIZ_INFO.phone}</a>
            </li>
            <li>
              <Mail size={18} />
              <a href="mailto:info@deraizfloricultura.com">info@deraizfloricultura.com</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} De Raíz Floricultura. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
