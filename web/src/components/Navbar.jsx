import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { BIZ_INFO, generateWaLink, WA_MESSAGES } from '../data/mockData';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menu al cambiar de ruta
  useEffect(() => { setIsOpen(false); }, [location]);

  const navClass = `navbar ${isHome && !scrolled ? 'navbar--transparent' : 'navbar--solid'} ${isOpen ? 'navbar--open' : ''}`;

  const isLinkActive = (to) => {
    if (to === '/aprende-de-raiz') {
      return location.pathname === to || location.pathname.startsWith('/aprende-de-raiz/');
    }
    return location.pathname === to;
  };

  const links = [
    { to: '/',              label: 'Inicio' },
    { to: '/catalogo',      label: 'Catálogo' },
    { to: '/asesoramiento', label: 'Te ayudo a elegir' },
    { to: '/aprende-de-raiz', label: 'Aprende de Raiz' },
    { to: '/regalos',       label: 'Regalos' },
    { to: '/contacto',      label: 'Contacto' },
  ];

  return (
    <header className={navClass}>
      <div className="container nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src={`${import.meta.env.BASE_URL}images/Logo-transparent.png`} alt="De Raíz Logo" className="nav-logo-img" />
          <span className="nav-logo-text">De Raíz</span>
        </Link>

        {/* Desktop Links */}
        <nav className="nav-links">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${isLinkActive(l.to) ? 'nav-link--active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={generateWaLink(WA_MESSAGES.ayudaElegir)}
          target="_blank"
          rel="noreferrer"
          className="nav-cta btn btn-primary"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>

        {/* Mobile Toggle */}
        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="nav-mobile">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="nav-mobile-link"
              onClick={() => setIsOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={generateWaLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary w-full mt-4"
            onClick={() => setIsOpen(false)}
          >
            <MessageCircle size={18} />
            Consultar por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
