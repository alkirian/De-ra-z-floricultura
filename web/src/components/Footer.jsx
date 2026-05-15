import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { BIZ_INFO } from '../data/mockData';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/images/Logo-transparent.png" alt="De Raíz Logo" className="footer-logo-image" />
            <span className="footer-logo-text">De Raíz</span>
          </Link>
          <p className="footer-description">
            Floricultura especializada en plantas de interior, exterior y regalos. Te acompañamos a elegir la mejor opción para tu espacio con asesoramiento local en Las Piedras.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Sitio web" className="social-link"><Globe size={20} /></a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Navegación</h4>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/asesoramiento">Asesoramiento</Link></li>
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
              <span>{BIZ_INFO.phone}</span>
            </li>
            <li>
              <Mail size={18} />
              <span>info@deraizfloricultura.com</span>
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
