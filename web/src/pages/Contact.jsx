import React, { useState } from 'react';
import { MapPin, Clock, MessageCircle, Navigation, Phone, Leaf, Sprout, Shovel, Package, X } from 'lucide-react';
import { BIZ_INFO, generateWaLink, WA_MESSAGES } from '../data/mockData';
import SEO from '../components/SEO';
import './Contact.css';

/* SVG de hoja decorativa */
const LeafSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 170 C60 170 10 130 10 80 C10 30 60 10 60 10 C60 10 110 30 110 80 C110 130 60 170 60 170Z" fill="currentColor"/>
    <path d="M60 170 L60 10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
  </svg>
);

const Contact = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const BASE = import.meta.env.BASE_URL;
  const STORE_IMAGES = [
    `${BASE}images/Instagram/641159597_18569292976036794_7285793248818445959_n.jpg`,
    `${BASE}images/Instagram/625050079_18195451261339886_7903106744929881972_n.jpg`,
    `${BASE}images/Instagram/626654593_18110861101637313_115686602871328692_n.jpg`,
    `${BASE}images/Instagram/654255476_18049528838710120_3399500945441152094_n.jpg`,
    `${BASE}images/Instagram/648207348_17932562826196211_1869222352040900296_n.jpg`,
    `${BASE}images/Instagram/658062127_18177689302375798_6542075994669164954_n.jpg`,
  ];

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BIZ_INFO.name} ${BIZ_INFO.location}`)}`;
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GardenStore',
    name: 'De Raíz Floricultura',
    url: 'https://alkirian.github.io/De-ra-z-floricultura/contacto',
    telephone: `+${BIZ_INFO.phone}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ruta 48, Las Piedras',
      addressLocality: 'Las Piedras',
      addressRegion: 'Canelones',
      addressCountry: 'UY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -34.7291,
      longitude: -56.2201,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
  };

  const serviceCards = [
    { 
      icon: Leaf, 
      title: 'Plantas de interior y exterior', 
      text: 'Selección local con especies adaptadas a cada tipo de luz.',
      details: 'En nuestro local vas a encontrar una selección curada de plantas de interior y exterior. Cada especie está adaptada al clima de Canelones y Montevideo. Te ayudamos a elegir según la iluminación natural de tu hogar y el tiempo que le puedas dedicar.'
    },
    { 
      icon: Sprout, 
      title: 'Asesoría botánica', 
      text: 'Te guiamos según espacio, riego y estacionalidad en Uruguay.',
      details: 'Creemos que cada planta tiene su espacio ideal. Vení con fotos de tus ambientes y te asesoramos de forma personalizada sobre riego, tipo de suelo, ventilación y cuidados específicos para cada estación del año.'
    },
    { 
      icon: Shovel, 
      title: 'Sustratos y cuidado', 
      text: 'Mezclas, fertilizantes y productos para mantener tus plantas saludables.',
      details: 'El secreto de una planta feliz está en sus raíces. Contamos con sustratos premium formulados por nosotros, abonos orgánicos, fertilizantes y productos de prevención contra plagas comunes.'
    },
    { 
      icon: Package, 
      title: 'Macetas y armado', 
      text: 'Opciones con drenaje y armado de combos para regalo.',
      details: 'Elegí la maceta que mejor combine con tu estilo y te la entregamos armada con el sustrato adecuado y piedras de drenaje. Ideal para regalar o renovar tus rincones favoritos al instante.'
    },
  ];

  return (
    <article className="contact-page animate-fade-in">
      <SEO
        title="Visita nuestra tienda de plantas en Las Piedras | De Raíz"
        description="Ubicación, horarios y contacto de De Raíz en Las Piedras. Abrí Google Maps, escribinos por WhatsApp y visitá nuestro local botánico."
        path="/contacto"
        jsonLd={localBusinessJsonLd}
      />
      {/*
        JSON-LD skeleton (LocalBusiness) listo para ajustar datos finales:
        <script type="application/ld+json">{...}</script>
      */}



      <section className="section-padding" style={{ background: 'var(--blanco-calido)', position: 'relative' }}>
        <div className="leaf-deco" style={{left: '-40px', top: '10%', color: 'var(--verde-salvia)', opacity: 0.15}}>
          <LeafSVG />
        </div>

        <div className="container">
          <div className="contact-main-grid">
            <section className="contact-nap card" aria-labelledby="nap-title">
              <h2 id="nap-title">Información del local</h2>
              <address className="nap-address" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <p className="nap-row"><MapPin size={16} /> {BIZ_INFO.location}</p>
                <p className="nap-row"><Phone size={16} /> <a href={`tel:+${BIZ_INFO.phone}`}>+{BIZ_INFO.phone}</a></p>
              </address>

              <div className="nap-hours" aria-label="Horarios de apertura">
                <h3><Clock size={16} /> Horarios</h3>
                <ul>
                  <li><span>Lunes a Sábado</span><strong>09:00 - 18:00</strong></li>
                  <li><span>Domingo</span><strong>09:00 - 13:00</strong></li>
                </ul>
              </div>

              <div className="nap-ctas">
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <Navigation size={18} /> Abrir en Google Maps
                </a>
                <a href={generateWaLink(WA_MESSAGES.ayudaElegir)} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  <MessageCircle size={18} /> Consultar por WhatsApp
                </a>
              </div>
            </section>

            <section className="contact-map card" aria-labelledby="map-title">
              <h2 id="map-title">Ubicación y Visita</h2>
              <div className="botanical-visit-card">
                <div className="botanical-visit-badge">
                  <Leaf size={14} /> ¡Visitanos!
                </div>
                <h3>Nuestro Local en Canelones</h3>
                <p className="botanical-visit-text">
                  Ruta 48, Las Piedras, Uruguay. Te esperamos con la mejor selección y asesoramiento personalizado de plantas en Canelones. Escribinos por WhatsApp para coordinar tu visita o conocer la mejor forma de llegar.
                </p>
                <div className="botanical-visit-map-art">
                  <div className="map-art-route">Ruta 48</div>
                  <div className="map-art-city">Las Piedras</div>
                  <div className="map-art-pin">
                    <MapPin size={24} className="animate-bounce" />
                    <span>De Raíz</span>
                  </div>
                </div>
                <div className="botanical-visit-ctas">
                  <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <Navigation size={16} /> Abrir Google Maps
                  </a>
                  <a href={generateWaLink(WA_MESSAGES.ayudaElegir)} target="_blank" rel="noreferrer" className="btn btn-secondary">
                    <MessageCircle size={16} /> Chat por WhatsApp
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="section-padding--sm" style={{ background: 'var(--crema)' }}>
        <div className="container">
          <section className="local-services" aria-labelledby="services-title">
            <h2 id="services-title">Qué encontrarás en el local</h2>
            <div className="services-grid">
              {serviceCards.map((service, i) => {
                const Icon = service.icon;
                return (
                  <article 
                    key={service.title} 
                    className="service-card card interactable-card"
                    onClick={() => setExpandedService(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedService(i);
                      }
                    }}
                  >
                    <div className="service-icon"><Icon size={18} /></div>
                    <h3>{service.title}</h3>
                    <p className="service-short-text">{service.text}</p>
                    <span className="service-more-btn">Ver más</span>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="local-gallery" aria-labelledby="gallery-title">
            <h2 id="gallery-title">Galería del local</h2>
            <div className="gallery-grid">
              <button type="button" className="gallery-item card" onClick={() => setSelectedImage({ src: STORE_IMAGES[0], alt: 'Exposición de flores y plantas en el vivero De Raíz, Las Piedras Uruguay' })}>
                <img src={STORE_IMAGES[0]} alt="Exposición de flores y plantas en el vivero De Raíz, Las Piedras Uruguay" loading="lazy" decoding="async" />
              </button>
              <button type="button" className="gallery-item card" onClick={() => setSelectedImage({ src: STORE_IMAGES[1], alt: 'Sansevieria y cartel del vivero De Raíz Floricultura en Las Piedras, Canelones' })}>
                <img src={STORE_IMAGES[1]} alt="Sansevieria y cartel del vivero De Raíz Floricultura en Las Piedras, Canelones" loading="lazy" decoding="async" />
              </button>
              <button type="button" className="gallery-item card" onClick={() => setSelectedImage({ src: STORE_IMAGES[2], alt: 'Espacio de plantas de interior en la tienda De Raíz, Ruta 48 Las Piedras' })}>
                <img src={STORE_IMAGES[2]} alt="Espacio de plantas de interior en la tienda De Raíz, Ruta 48 Las Piedras" loading="lazy" decoding="async" />
              </button>
              <button type="button" className="gallery-item card" onClick={() => setSelectedImage({ src: STORE_IMAGES[3], alt: 'Sector de exhibición botánica del vivero De Raíz en Canelones' })}>
                <img src={STORE_IMAGES[3]} alt="Sector de exhibición botánica del vivero De Raíz en Canelones" loading="lazy" decoding="async" />
              </button>
              <button type="button" className="gallery-item card" onClick={() => setSelectedImage({ src: STORE_IMAGES[4], alt: 'Vista general del vivero y floricultura De Raíz en Las Piedras Uruguay' })}>
                <img src={STORE_IMAGES[4]} alt="Vista general del vivero y floricultura De Raíz en Las Piedras Uruguay" loading="lazy" decoding="async" />
              </button>
              <button type="button" className="gallery-item card" onClick={() => setSelectedImage({ src: STORE_IMAGES[5], alt: 'Detalle de plantas y macetas decorativas en De Raíz Floricultura, Canelones' })}>
                <img src={STORE_IMAGES[5]} alt="Detalle de plantas y macetas decorativas en De Raíz Floricultura, Canelones" loading="lazy" decoding="async" />
              </button>
            </div>
          </section>
        </div>
      </section>

      {selectedImage && (
        <div className="gallery-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="gallery-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="gallery-lightbox-close" onClick={() => setSelectedImage(null)} aria-label="Cerrar imagen completa">×</button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
          </div>
        </div>
      )}

      {/* Drawer responsivo para detalles del servicio en celular */}
      {serviceCards.map((service, i) => {
        const Icon = service.icon;
        return (
          <div
            key={`service-drawer-${i}`}
            className={`service-detail-drawer ${expandedService === i ? 'service-detail-drawer--open' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="service-detail-drawer-overlay" onClick={() => setExpandedService(null)}></div>
            <div className="service-detail-drawer-content">
              <button
                type="button"
                className="btn-close-service-drawer"
                onClick={() => setExpandedService(null)}
                aria-label="Cerrar detalle"
              >
                <X size={20} />
              </button>
              <div className="service-drawer-header">
                <div className="service-drawer-icon-wrap">
                  <Icon size={24} />
                </div>
                <div>
                  <span className="service-drawer-subtitle" style={{ color: 'var(--verde-profundo)' }}>Qué encontrarás</span>
                  <h3>{service.title}</h3>
                </div>
              </div>
              <div className="service-drawer-body">
                <p>{service.details}</p>
              </div>
              <div className="service-drawer-footer">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => setExpandedService(null)}
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </article>
  );
};

export default Contact;
