import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle, Sparkles, Leaf, MapPin, ChevronLeft, ChevronRight, BookOpen, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import SEO from '../components/SEO';
import './Home.css';

/* SVG de hoja decorativa */
const LeafSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 170 C60 170 10 130 10 80 C10 30 60 10 60 10 C60 10 110 30 110 80 C110 130 60 170 60 170Z" fill="currentColor"/>
    <path d="M60 170 L60 10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
    <path d="M60 100 Q35 85 20 60" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
    <path d="M60 100 Q85 85 100 60" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
    <path d="M60 140 Q40 128 28 108" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round"/>
    <path d="M60 140 Q80 128 92 108" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

/* SVG onda separadora */
const WaveTop = ({ fill = '#F4EBDD', bg = 'transparent' }) => (
  <div style={{ background: bg, lineHeight: 0, display: 'block' }}>
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{display:'block',width:'100%'}}>
      <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={fill}/>
    </svg>
  </div>
);

const WaveBottom = ({ fill = '#F4EBDD', bg = 'transparent' }) => (
  <div style={{ background: bg, lineHeight: 0, display: 'block' }}>
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{display:'block',width:'100%'}}>
      <path d="M0,30 C360,0 1080,60 1440,30 L1440,0 L0,0 Z" fill={fill}/>
    </svg>
  </div>
);

/* Ícono SVG lineal de planta interior */
const IconInterior = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <rect x="20" y="44" width="24" height="12" rx="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 44 C32 44 32 30 32 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 36 C32 36 20 28 16 18 C26 18 32 26 32 36Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M32 30 C32 30 44 22 48 12 C38 12 32 22 32 30Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconFlor = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 8 C32 8 28 18 32 26 C36 18 32 8 32 8Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M32 38 C32 38 28 48 32 56 C36 48 32 38 32 38Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 32 C8 32 18 28 26 32 C18 36 8 32 8 32Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M38 32 C38 32 48 28 56 32 C48 36 38 32 38 32Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M14 14 C14 14 20 22 26 26 C22 20 14 14 14 14Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M38 38 C38 38 44 46 50 50 C46 44 38 38 38 38Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconRegalo = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <rect x="10" y="28" width="44" height="28" rx="3" stroke="currentColor" strokeWidth="2"/>
    <rect x="10" y="20" width="44" height="10" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 20 L32 56" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 20 C32 20 24 14 20 10 C24 8 32 14 32 20Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M32 20 C32 20 40 14 44 10 C40 8 32 14 32 20Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconJardineria = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <path d="M14 50 L28 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <ellipse cx="34" cy="18" rx="12" ry="8" transform="rotate(-30 34 18)" stroke="currentColor" strokeWidth="2"/>
    <path d="M28 24 C28 24 36 20 42 22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
  </svg>
);

const IconMaceta = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <path d="M18 28 L22 54 L42 54 L46 28 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <rect x="14" y="22" width="36" height="8" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 22 C32 22 32 14 32 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 16 C32 16 24 10 20 6 C26 6 32 12 32 16Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M32 14 C32 14 40 8 44 4 C38 4 32 10 32 14Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconAsesoramiento = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-icon">
    <path d="M12 40 C12 40 12 20 32 14 C52 8 54 28 44 36 C36 42 28 38 28 38 L20 52 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="26" cy="28" r="2" fill="currentColor"/>
    <circle cx="32" cy="28" r="2" fill="currentColor"/>
    <circle cx="38" cy="28" r="2" fill="currentColor"/>
  </svg>
);

const BASE = import.meta.env.BASE_URL;
// Reemplazar por el numero final de WhatsApp en formato internacional (sin + ni espacios).
const WHATSAPP_NUMBER = 'AQUI_COLOCAR_NUMERO';
// Si queres cambiar imagenes, edita solo el campo image de cada objeto en COMBO_INSPIRATIONS.

const createWhatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const COMBO_CUSTOM_MESSAGE =
  'Hola De Raíz, quiero armar un combo personalizado con planta y maceta. ¿Me pueden ayudar?';

const COMBO_INSPIRATIONS = [
  {
    id: 'toque-natural',
    title: 'Combo Toque Natural',
    description: 'Un toque de naturaleza que transforma tu espacio.',
    includes: 'Planta + maceta',
    image: `${BASE}images/Combos/662883861_18084336809621436_14415400890110370_n.webp`,
    alt: 'Combo Toque Natural con planta ornamental y maceta blanca texturada.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Toque Natural en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
  {
    id: 'selva-mini',
    title: 'Combo Selva Mini',
    description: 'Sumá verde y frescura a tus espacios.',
    includes: 'Monstera adansonii + maceta a elección',
    image: `${BASE}images/Combos/681808372_18084336797621436_6574950320876914164_n.webp`,
    alt: 'Combo Selva Mini con Monstera adansonii y maceta de interior.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Selva Mini en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
  {
    id: 'rincon-calido',
    title: 'Combo Rincón Cálido',
    description: 'Sumá calidez y vida a tus espacios.',
    includes: 'Planta + maceta',
    image: `${BASE}images/Combos/682819319_18084336818621436_4685393247746492369_n.webp`,
    alt: 'Combo Rincón Cálido con planta variegada en maceta tejida.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Rincón Cálido en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
  {
    id: 'selva-natural',
    title: 'Combo Selva Natural',
    description: 'Verde que transforma, vida que inspira.',
    includes: 'Planta + maceta',
    image: `${BASE}images/Combos/682935109_18084336827621436_33320198583019895_n.webp`,
    alt: 'Combo Selva Natural con planta Monstera en maceta de cerámica clara.',
    whatsappMessage:
      'Hola De Raíz, vi el Combo Selva Natural en la web y me gustaría armar uno parecido. ¿Me pueden asesorar?',
  },
];

const CATEGORIES = [
  { 
    icon: <IconInterior />, 
    title: 'Plantas', 
    shortDesc: 'Interior, exterior y suculentas.', 
    link: '/catalogo', 
    color: '#2F4A2E',
    bgImage: `${BASE}images/categorias/bg_plantas.png`,
    adviceTitle: 'Tip Botánico',
    advice: 'Cada planta tiene su lugar. Las de interior suelen preferir luz indirecta brillante, mientras que las de exterior y huerta necesitan mucho sol directo. Es clave elegir la planta según la luz real de tu espacio, no al revés.'
  },
  { 
    icon: <IconMaceta />, 
    title: 'Macetas', 
    shortDesc: 'Barro, plástico y decorativas.', 
    link: '/catalogo?cat=Macetas', 
    color: '#A65F3A',
    bgImage: `${BASE}images/categorias/bg_macetas.png`,
    adviceTitle: 'El Secreto del Drenaje',
    advice: 'El drenaje es vital para que las raíces no se pudran. Usá macetas con agujeros siempre que puedas. Si elegís una maceta decorativa sin drenaje, te recomendamos usarla como portamaceta.'
  },
  { 
    icon: <IconJardineria />, 
    title: 'Insumos', 
    shortDesc: 'Sustratos y fertilizantes.', 
    link: '/catalogo?cat=Sustratos%20y%20Tierra', 
    color: '#6F7F5F',
    bgImage: `${BASE}images/categorias/bg_insumos.png`,
    adviceTitle: 'Nutrición y Tierra',
    advice: 'La tierra común se compacta. Un buen sustrato debe ser suelto para que las raíces respiren y absorban nutrientes. Recordá fertilizar solo en su época de crecimiento (primavera y verano).'
  },
];

const Home = () => {
  const valueGridRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeComboIndex, setActiveComboIndex] = useState(null);

  const testimonials = [
    { name: 'Mariana R.', loc: 'Las Piedras', text: 'Me recomendaron una planta para poca luz y quedó perfecta. Muy buena atención.' },
    { name: 'Andrés P.', loc: 'Canelones', text: 'Fui por un regalo y me armaron una opción linda y rápida. Recomiendo.' },
  ];
  useEffect(() => {
    const cards = valueGridRef.current?.querySelectorAll('.value-item');
    if (!cards || cards.length === 0) return undefined;

    let rafId = null;

    const animateOnScroll = () => {
      const viewportHeight = window.innerHeight;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const distance = (center - viewportHeight * 0.55) / viewportHeight;
        const shift = Math.max(-16, Math.min(16, distance * (14 + index * 2)));
        const rotate = Math.max(-1.2, Math.min(1.2, distance * (1.4 + index * 0.15)));
        card.style.setProperty('--scroll-shift', `${shift}px`);
        card.style.setProperty('--scroll-rotate', `${rotate}deg`);
      });
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        animateOnScroll();
        rafId = null;
      });
    };

    animateOnScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const openComboLightbox = (index) => {
    setActiveComboIndex(index);
  };

  const closeComboLightbox = () => {
    setActiveComboIndex(null);
  };

  const goToPrevCombo = () => {
    setActiveComboIndex((prev) => (prev === null ? null : (prev - 1 + COMBO_INSPIRATIONS.length) % COMBO_INSPIRATIONS.length));
  };

  const goToNextCombo = () => {
    setActiveComboIndex((prev) => (prev === null ? null : (prev + 1) % COMBO_INSPIRATIONS.length));
  };

  useEffect(() => {
    if (activeComboIndex === null) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeComboLightbox();
      if (event.key === 'ArrowLeft') goToPrevCombo();
      if (event.key === 'ArrowRight') goToNextCombo();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeComboIndex]);

  return (
    <div className="home-page">
      <SEO
        title="De Raíz Floricultura | Venta de Plantas y Macetas en Las Piedras"
        description="Tu vivero de confianza en Las Piedras, Canelones. Encontrá la mejor selección de plantas de interior y exterior, tierra, sustratos y asesoramiento botánico personalizado en Ruta 48."
        path="/"
      />

      {/* ══════════════════════════
          HERO SPLIT ORGÁNICO
      ══════════════════════════ */}
      <section className="hero split-hero" style={{ '--hero-bg-image': `url(${BASE}images/hero_bg.png)` }}>
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="hero-bg-overlay" aria-hidden="true"></div>
        <svg className="hero-wave hero-wave-desktop" viewBox="0 0 1440 520" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,170 C220,80 420,90 620,180 C830,275 1010,365 1210,315 C1320,285 1390,220 1440,160 L1440,520 L0,520 Z" fill="currentColor" />
        </svg>
        <svg className="hero-wave hero-wave-mobile" viewBox="0 0 1440 520" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,220 C240,192 430,188 620,220 C840,256 1036,288 1240,252 C1332,236 1398,208 1440,188 L1440,520 L0,520 Z" fill="currentColor" />
        </svg>

        <div className="hero-content-left animate-fade-in">
          <h1 className="sr-only">De Raiz Floricultura - Vivero en Las Piedras, Uruguay</h1>
          <span className="hero-eyebrow">
            <MapPin size={14} /> Las Piedras, Uruguay
          </span>
          <img
            src={`${BASE}images/logo-hero-white.png`}
            alt="De Raíz Floricultura"
            className="hero-brand-logo"
            loading="eager"
          />
          <p className="hero-subtitle">
            Plantas, flores y asesoramiento en Las Piedras.<br/>
            Te ayudamos a encontrar la planta perfecta para tu espacio.
          </p>
          <div className="hero-actions stagger-3">
            <a href={generateWaLink(WA_MESSAGES.ayudaElegir)} target="_blank" rel="noreferrer" className="btn btn-light">
              <MessageCircle size={18} /> Quiero ayuda para elegir
            </a>
            <Link to="/catalogo" className="btn btn-outline-light">
              Ver plantas y combos <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </section>


      {/* ══════════════════════════
          ATAJOS RÁPIDOS
      ══════════════════════════ */}
      <div className="proposal-block" style={{background: 'var(--crema)'}}>
        <span className="proposal-corner proposal-corner--top-left" aria-hidden="true"></span>
        <span className="proposal-corner proposal-corner--top-right" aria-hidden="true"></span>
        <span className="proposal-corner proposal-corner--bottom-left" aria-hidden="true"></span>
        <span className="proposal-corner proposal-corner--bottom-right" aria-hidden="true"></span>
        <section className="quick-actions-section section-padding--sm">
          <div className="container">
            <div className="text-center mb-12 quick-actions-header">
              <span className="section-label">Comenzá por acá</span>
              <h2>Explorá el universo De Raíz</h2>
              <p className="quick-actions-subtitle">
                Te guiamos en cada paso para que lleves la naturaleza a tu vida, con la calidad y calidez de siempre.
              </p>
            </div>
            <div className="quick-actions-grid">
              <Link to="/catalogo" className="quick-action-card quick-action-card--catalog">
                <div className="quick-action-icon-wrapper">
                  <Leaf size={26} />
                </div>
                <span className="quick-action-kicker">Catálogo Completo</span>
                <h3>Plantas & Macetas</h3>
                <p>Llevá frescura a tu hogar. Gran variedad de interior, exterior, combos exclusivos e insumos premium.</p>
                <span className="quick-action-link">Explorar catálogo <ArrowRight size={16} /></span>
              </Link>

              <Link to="/aprende-de-raiz" className="quick-action-card quick-action-card--learn">
                <div className="quick-action-icon-wrapper">
                  <BookOpen size={26} />
                </div>
                <span className="quick-action-kicker">Guías de Cultivo</span>
                <h3>Aprendé de Raíz</h3>
                <p>Convertite en experto. Consejos paso a paso sobre riego, sustratos y plagas adaptadas a Uruguay.</p>
                <span className="quick-action-link">Ir a la guía botánica <ArrowRight size={16} /></span>
              </Link>

              <Link to="/contacto" className="quick-action-card quick-action-card--contact">
                <div className="quick-action-icon-wrapper">
                  <MapPin size={26} />
                </div>
                <span className="quick-action-kicker">Atención Cercana</span>
                <h3>Visitanos o Escribinos</h3>
                <p>Encontranos en Las Piedras, Ruta 48. O chateá con nuestro equipo para recibir asesoramiento personalizado.</p>
                <span className="quick-action-link">Ver contacto y local <ArrowRight size={16} /></span>
              </Link>
            </div>
          </div>
        </section>
        {/* ══════════════════════════
            PROPUESTA DE VALOR
        ══════════════════════════ */}
        <section className="value-section section-padding--sm">
          <div className="container container--narrow text-center">
            <span className="section-label">Nuestra propuesta</span>
            <h2>No solo vendemos plantas.</h2>
            <p className="value-text">
              Plantas, flores, macetas e insumos con atencion local en Las Piedras.
            </p>
            <div className="value-grid" ref={valueGridRef}>
              <div className="value-item">
                <div className="value-icon-wrap">
                  <div className="value-icon">🌿</div>
                </div>
                <h4>Asesoramiento personalizado</h4>
                <p>Te orientamos según tu espacio, luz y experiencia.</p>
              </div>
              <div className="value-item">
                <div className="value-icon-wrap">
                  <div className="value-icon">🪴</div>
                </div>
                <h4>Plantas, flores y macetas</h4>
                <p>Gran variedad de interior, exterior, flores y más.</p>
              </div>
              <div className="value-item">
                <div className="value-icon-wrap">
                  <div className="value-icon">📍</div>
                </div>
                <h4>Atención local</h4>
                <p>Estamos en Las Piedras, Canelones. Visitanos.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --------------------------
          COMBOS INSPIRACION
      -------------------------- */}
      <section className="combos-section section-padding--sm" aria-labelledby="combos-title">
        <div className="container">
          <div className="text-center combos-header">
            <span className="section-label">Inspiracion real</span>
            <h2 id="combos-title">Combos verdes para regalar o decorar</h2>
            <p className="combos-subtitle">
              Inspirate con algunos combos que ya armamos y escribinos para crear uno a tu medida.
            </p>
          </div>

          <div className="combos-grid">
            {COMBO_INSPIRATIONS.map((combo, index) => (
              <article
                key={combo.id}
                className="combo-card"
                role="button"
                tabIndex={0}
                onClick={() => openComboLightbox(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openComboLightbox(index);
                  }
                }}
                aria-label={`${combo.title}: ver imagen en grande`}
              >
                <div className="combo-card-image-wrap">
                  <img
                    src={combo.image}
                    alt={combo.alt}
                    className="combo-card-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="combo-card-content">
                  <h3>{combo.title}</h3>
                  <p className="combo-card-description">{combo.description}</p>
                  <p className="combo-card-includes">
                    <strong>Incluye:</strong> {combo.includes}
                  </p>
                  <a
                    href={createWhatsAppLink(combo.whatsappMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary combo-card-btn"
                    aria-label={`${combo.title}: Quiero uno parecido por WhatsApp`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    Quiero uno parecido
                  </a>
                </div>
              </article>
            ))}
          </div>

          <article className="combo-custom-cta">
            <h3>Queres armar tu propio combo?</h3>
            <p>
              Elegi una planta, una maceta y el estilo que mas te guste. Nosotros te ayudamos a
              combinarlo.
            </p>
            <a
              href={createWhatsAppLink(COMBO_CUSTOM_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary combo-custom-cta-btn"
            >
              Armar mi combo por WhatsApp
            </a>
          </article>
        </div>
      </section>

      {/* ══════════════════════════
          CATEGORÍAS ILUSTRADAS
      ══════════════════════════ */}
      <WaveTop fill="var(--beige-claro)" bg="var(--crema)" />
      <section className="categories-section section-padding" style={{background: 'var(--beige-claro)', position: 'relative', overflow: 'hidden'}}>
        {/* Hojas decorativas sutiles desenfocadas en los bordes */}
        <img src={`${BASE}images/bg_leaves.png`} alt="" className="bg-leaf-blur bg-leaf-blur--left" aria-hidden="true" />
        <img src={`${BASE}images/bg_leaves.png`} alt="" className="bg-leaf-blur bg-leaf-blur--right" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center mb-12">
            <span className="section-label">Qué encontrás en De Raíz</span>
            <h2>Explorá nuestras categorías</h2>
            <div className="title-underline"></div>
          </div>
          <div className="accordion-container">
            {CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className={`accordion-item ${activeAccordion === i ? 'accordion-item--active' : ''}`}
                onClick={() => setActiveAccordion(i)}
                style={{
                  '--cat-color': cat.color,
                  backgroundImage: `url(${cat.bgImage})`,
                  animationDelay: `${i * 0.08}s`
                }}
              >
                <div className="accordion-overlay"></div>
                <div className="accordion-content-wrapper">
                  <div className="accordion-icon-wrap" style={{ color: cat.color }}>
                    <div className="accordion-icon">{cat.icon}</div>
                  </div>
                  <div className="accordion-content">
                    <div className="accordion-header">
                      <h4>{cat.title}</h4>
                      <p className="accordion-short-desc">{cat.shortDesc}</p>
                    </div>
                    <div className="accordion-details">
                      <div className="advice-box" style={{ borderColor: `${cat.color}60`, backgroundColor: `rgba(255, 255, 255, 0.65)` }}>
                        <span className="advice-title" style={{ color: cat.color }}><Sparkles size={14} /> {cat.adviceTitle}</span>
                        <p>{cat.advice}</p>
                      </div>
                      <Link to={cat.link} className="btn-accordion" style={{ backgroundColor: cat.color }}>
                        Ver {cat.title} <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <WaveBottom fill="var(--beige-claro)" bg="var(--verde-profundo)" />


      {/* ══════════════════════════
          TESTIMONIOS
      ══════════════════════════ */}
      <WaveTop fill="var(--verde-profundo)" bg="var(--verde-profundo)" />
      <section className="testimonials-section section-padding">
        {/* Hojas de eucalipto decorativas desenfocadas */}
        <img src={`${BASE}images/bg_eucalyptus.png`} alt="" className="bg-leaf-blur bg-leaf-blur--left" aria-hidden="true" />
        <img src={`${BASE}images/bg_eucalyptus.png`} alt="" className="bg-leaf-blur bg-leaf-blur--right" aria-hidden="true" />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="text-center mb-12 testimonials-header">
            <span className="section-label">Clientes</span>
            <h2>Lo que dicen nuestros clientes</h2>
            <p className="testimonials-subtitle">
              Opiniones reales de clientes de Las Piedras.
            </p>
          </div>
          <div className="testimonial-carousel">
            <button type="button" className="testimonial-nav testimonial-nav--prev" onClick={goToPrevTestimonial} aria-label="Testimonio anterior">
              <ChevronLeft size={20} />
            </button>

            <div className="testimonial-track" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-slide">
                  <div className="testimonial-card animate-fade-in">
                    <div className="testimonial-stars">{'★★★★★'}</div>
                    <p className="testimonial-text">"{t.text}"</p>
                    <div className="testimonial-author">
                      <strong>{t.name}</strong>
                      <span>{t.loc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="testimonial-nav testimonial-nav--next" onClick={goToNextTestimonial} aria-label="Siguiente testimonio">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="testimonial-dots" aria-label="Indicadores de testimonio">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`testimonial-dot ${activeTestimonial === i ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <a href={generateWaLink(WA_MESSAGES.general)} target="_blank" rel="noreferrer" className="btn btn-outline-light">
              <MessageCircle size={18} /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {activeComboIndex !== null && (
        <div
          className="combo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada: ${COMBO_INSPIRATIONS[activeComboIndex].title}`}
          onClick={closeComboLightbox}
        >
          <div className="combo-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="combo-lightbox-close"
              onClick={closeComboLightbox}
              aria-label="Cerrar imagen"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              className="combo-lightbox-nav combo-lightbox-nav--prev"
              onClick={goToPrevCombo}
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={22} />
            </button>

            <figure className="combo-lightbox-figure">
              <img
                src={COMBO_INSPIRATIONS[activeComboIndex].image}
                alt={COMBO_INSPIRATIONS[activeComboIndex].alt}
                className="combo-lightbox-image"
              />
              <figcaption>
                {COMBO_INSPIRATIONS[activeComboIndex].title}
              </figcaption>
            </figure>

            <button
              type="button"
              className="combo-lightbox-nav combo-lightbox-nav--next"
              onClick={goToNextCombo}
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;




