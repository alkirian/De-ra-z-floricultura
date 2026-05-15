import React from 'react';
import { MapPin, Clock, CreditCard, MessageCircle, Navigation, Globe } from 'lucide-react';
import { BIZ_INFO, generateWaLink, WA_MESSAGES } from '../data/mockData';
import './Contact.css';

/* SVG de hoja decorativa */
const LeafSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 170 C60 170 10 130 10 80 C10 30 60 10 60 10 C60 10 110 30 110 80 C110 130 60 170 60 170Z" fill="currentColor"/>
    <path d="M60 170 L60 10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
  </svg>
);

const Contact = () => {
  return (
    <div className="contact-page animate-fade-in">
      {/* ══════════════════════════
          HERO CONTACTO
      ══════════════════════════ */}
      <section className="contact-hero section-padding--sm" style={{background: 'var(--crema)', paddingTop: '140px'}}>
        <div className="container text-center">
          <span className="section-label">Ubicación y contacto</span>
          <h1 className="page-title">Dónde Encontrarnos</h1>
          <p className="page-subtitle mb-8 mx-auto" style={{maxWidth: '500px'}}>
            Vení a visitarnos al vivero en Las Piedras o escribinos para coordinar tu pedido.
          </p>
          <div className="title-underline"></div>
        </div>
      </section>

      {/* ══════════════════════════
          INFO GRID
      ══════════════════════════ */}
      <section className="section-padding" style={{background: 'var(--blanco-calido)', position: 'relative'}}>
        <div className="leaf-deco" style={{left: '-40px', top: '10%', color: 'var(--verde-salvia)', opacity: 0.15}}>
          <LeafSVG />
        </div>
        
        <div className="container">
          <div className="contact-grid">
            {/* Info Cards */}
            <div className="contact-info-cards">
              <div className="info-card card">
                <div className="info-icon-wrap"><MapPin size={24} /></div>
                <div className="info-content">
                  <h3>Ubicación</h3>
                  <p>{BIZ_INFO.location}</p>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BIZ_INFO.name + " " + BIZ_INFO.location)}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-text-link mt-2"
                  >
                    <Navigation size={16} /> Ver en Google Maps
                  </a>
                </div>
              </div>

              <div className="info-card card">
                <div className="info-icon-wrap"><Clock size={24} /></div>
                <div className="info-content">
                  <h3>Horarios</h3>
                  <p>{BIZ_INFO.hours.split('|')[0]}</p>
                  <p style={{color: 'var(--terracota)', fontWeight: 600}}>{BIZ_INFO.hours.split('|')[1]}</p>
                </div>
              </div>

              <div className="info-card card">
                <div className="info-icon-wrap"><CreditCard size={24} /></div>
                <div className="info-content">
                  <h3>Medios de pago</h3>
                  <p>{BIZ_INFO.payment}</p>
                </div>
              </div>
            </div>

            {/* Action Box */}
            <div className="contact-action-box card">
              <div className="action-icon-wrap"><MessageCircle size={48} /></div>
              <h2>¿Tenés alguna duda?</h2>
              <p className="mb-8">Escribinos directamente a nuestro WhatsApp. Te asesoramos sobre stock, envíos y cuidados.</p>
              
              <div className="action-buttons">
                <a 
                  href={generateWaLink(WA_MESSAGES.general)} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-primary w-full"
                >
                  <MessageCircle size={20} />
                  Hablar por WhatsApp
                </a>
                
                <div className="social-cta-row">
                  <a href="#" className="social-btn" aria-label="Sitio web"><Globe size={20} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="leaf-deco" style={{right: '-40px', bottom: '10%', color: 'var(--terracota)', opacity: 0.1, transform: 'scaleX(-1)'}}>
          <LeafSVG />
        </div>
      </section>

      {/* ══════════════════════════
          MAPA PLACEHOLDER
      ══════════════════════════ */}
      <section className="map-section section-padding--sm" style={{background: 'var(--crema)'}}>
        <div className="container">
          <div className="map-placeholder card">
            <div className="map-overlay">
              <MapPin size={40} color="var(--terracota)" />
              <p>Las Piedras, Canelones (Ruta 48)</p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BIZ_INFO.name + " " + BIZ_INFO.location)}`}
                target="_blank" 
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
              >
                Abrir mapa completo
              </a>
            </div>
            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80" alt="Mapa" className="map-img" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
