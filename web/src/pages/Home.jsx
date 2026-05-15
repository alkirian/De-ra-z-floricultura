import { useEffect, useRef } from 'react';
import { ArrowRight, MessageCircle, Sparkles, Leaf, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BIZ_INFO, generateWaLink, WA_MESSAGES } from '../data/mockData';
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

const CATEGORIES = [
  { icon: <IconInterior />, title: 'Plantas', desc: 'Interior, exterior, huerta y suculentas para cada espacio.', link: '/catalogo', color: '#2F4A2E' },
  { icon: <IconMaceta />, title: 'Macetas', desc: 'Barro, rotomoldeadas y opciones decorativas para tu planta.', link: '/catalogo?cat=Macetas', color: '#A65F3A' },
  { icon: <IconJardineria />, title: 'Insumos', desc: 'Sustratos, fertilizantes y herramientas para cuidar mejor.', link: '/catalogo?cat=Sustratos%20y%20Tierra', color: '#6F7F5F' },
];

const Home = () => {
  const valueGridRef = useRef(null);
  const mainHours = BIZ_INFO.hours.split('|')[0]?.trim();

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

  return (
    <div className="home-page">

      {/* ══════════════════════════
          HERO EDITORIAL
      ══════════════════════════ */}
      <section className="hero">
        {/* Hojas decorativas */}
        <div className="hero-leaf hero-leaf--tl">
          <LeafSVG />
        </div>
        <div className="hero-leaf hero-leaf--br">
          <LeafSVG />
        </div>

        {/* Overlay */}
        <div className="hero-overlay"></div>

        {/* Contenido centrado */}
        <div className="container hero-content animate-fade-in">
          <span className="hero-eyebrow">
            <MapPin size={14} /> Las Piedras, Uruguay
          </span>
          <img
            src="/images/logo-hero-white.png"
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

        {/* Onda inferior */}
        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F4EBDD"/>
          </svg>
        </div>
      </section>


      {/* ══════════════════════════
          ATAJOS RÁPIDOS
      ══════════════════════════ */}
      <section className="quick-actions-section section-padding--sm" style={{background: 'var(--crema)'}}>
        <div className="container">
          <div className="text-center mb-8">
            <span className="section-label">Empezá por acá</span>
            <h2>¿Qué necesitás hoy?</h2>
          </div>
          <div className="quick-actions-grid">
            <Link to="/catalogo?cat=Interior" className="quick-action-card">
              <span className="quick-action-kicker">Quiero algo fácil</span>
              <h3>Plantas para principiantes</h3>
              <p>Opciones nobles para arrancar sin complicarte.</p>
              <span className="quick-action-link">Ver plantas <ArrowRight size={16} /></span>
            </Link>
            <Link to="/regalos" className="quick-action-card">
              <span className="quick-action-kicker">Tengo un regalo</span>
              <h3>Armá un combo en 2 pasos</h3>
              <p>Te guiamos según ocasión y presupuesto.</p>
              <span className="quick-action-link">Ir a regalos <ArrowRight size={16} /></span>
            </Link>
            <Link to="/asesoramiento" className="quick-action-card">
              <span className="quick-action-kicker">No sé cuál elegir</span>
              <h3>Hacé el diagnóstico</h3>
              <p>Te lleva 1 minuto y te sugiere plantas concretas.</p>
              <span className="quick-action-link">Empezar test <ArrowRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="solutions-section section-padding--sm" style={{background: 'var(--blanco-calido)'}}>
        <div className="container">
          <div className="text-center mb-8">
            <span className="section-label">Filtros rápidos</span>
            <h2>Elegí según tu espacio</h2>
          </div>
          <div className="solutions-grid">
            <Link to="/catalogo?need=poca-luz" className="solution-card">
              <h4>Poca luz</h4>
              <p>Opciones que se adaptan a sombra.</p>
            </Link>
            <Link to="/catalogo?need=mucha-luz" className="solution-card">
              <h4>Mucha luz</h4>
              <p>Plantas que rinden mejor con sol o luz intensa.</p>
            </Link>
            <Link to="/catalogo?cat=Interior" className="solution-card">
              <h4>Apartamento u oficina</h4>
              <p>Plantas nobles para interior.</p>
            </Link>
            <Link to="/catalogo?need=poco-riego" className="solution-card">
              <h4>Poco riego</h4>
              <p>Opciones resistentes para rutinas ocupadas.</p>
            </Link>
            <Link to="/catalogo?need=pet-friendly" className="solution-card">
              <h4>Pet friendly</h4>
              <p>Plantas mas seguras para convivir con mascotas.</p>
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════
          CÓMO COMPRAR
      ══════════════════════════ */}
      <section className="how-to-buy-section section-padding--sm" style={{background: 'var(--blanco-calido)'}}>
        <div className="container">
          <div className="text-center mb-8">
            <span className="section-label">Proceso simple</span>
            <h2>Cómo comprar en De Raíz</h2>
          </div>
          <div className="how-to-buy-steps">
            <article className="how-step">
              <span className="how-step-number">1</span>
              <h4>Elegí tu planta</h4>
              <p>Explorá el catálogo por tipo de planta, maceta o insumo.</p>
            </article>
            <article className="how-step">
              <span className="how-step-number">2</span>
              <h4>Consultá stock</h4>
              <p>Te confirmamos disponibilidad, precio y opciones en minutos.</p>
            </article>
            <article className="how-step">
              <span className="how-step-number">3</span>
              <h4>Retirá o coordiná</h4>
              <p>Pasás por el vivero o coordinás la mejor forma de entrega.</p>
            </article>
          </div>
          <div className="text-center mt-6">
            <a href={generateWaLink(WA_MESSAGES.general)} target="_blank" rel="noreferrer" className="btn btn-primary">
              <MessageCircle size={18} /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>


      {/* ══════════════════════════
          INFO OPERATIVA
      ══════════════════════════ */}
      <section className="ops-strip-section" style={{background: 'var(--beige-claro)'}}>
        <div className="container">
          <div className="ops-strip">
            <p><strong>Horario:</strong> {mainHours}</p>
            <p><strong>Ubicación:</strong> {BIZ_INFO.location}</p>
            <p><strong>WhatsApp:</strong> respuesta rápida en horario comercial</p>
          </div>
        </div>
      </section>


      {/* ══════════════════════════
          PROPUESTA DE VALOR
      ══════════════════════════ */}
      <section className="value-section section-padding--sm" style={{background: 'var(--crema)'}}>
        <div className="container container--narrow text-center">
          <span className="section-label">Nuestra propuesta</span>
          <h2>No solo vendemos plantas.</h2>
          <p className="value-text">
            Te ayudamos a elegir la planta correcta para tu casa, jardín, oficina o regalo. Con asesoramiento real, productos de calidad y atención local en Las Piedras.
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


      {/* ══════════════════════════
          CATEGORÍAS ILUSTRADAS
      ══════════════════════════ */}
      <WaveTop fill="var(--beige-claro)" bg="var(--crema)" />
      <section className="categories-section section-padding" style={{background: 'var(--beige-claro)'}}>
        {/* Hoja decorativa lateral */}
        <div className="section-leaf section-leaf--right" style={{color: 'var(--verde-salvia)'}}>
          <LeafSVG />
        </div>

        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Qué encontrás en De Raíz</span>
            <h2>Explorá nuestras categorías</h2>
            <div className="title-underline"></div>
          </div>
          <div className="value-grid">
            {CATEGORIES.map((cat, i) => (
              <Link key={i} to={cat.link} className="value-item animate-fade-in" style={{ '--cat-color': cat.color, animationDelay: `${i * 0.08}s` }}>
                <div className="value-icon-wrap" style={{ color: cat.color }}>
                  <div className="value-icon">{cat.icon}</div>
                </div>
                <h4>{cat.title}</h4>
                <p>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <WaveBottom fill="var(--beige-claro)" bg="var(--verde-profundo)" />


      {/* ══════════════════════════
          ASESORAMIENTO (DARK)
      ══════════════════════════ */}
      <section className="advice-section section-dark section-padding">
        <div className="container">
          <div className="advice-grid">
            <div className="advice-text">
              <span className="section-label" style={{color: 'var(--terracota-light)'}}>Asesoramiento gratuito</span>
              <h2>¿No sabés qué planta elegir?</h2>
              <p style={{color: 'rgba(244,235,221,0.82)'}}>
                En 1 minuto te recomendamos 3 opciones segun tu luz, espacio y tiempo.
              </p>
              <div className="advice-checklist">
                {['Luz del espacio', 'Interior o exterior', 'Tiempo de cuidado'].map((item, i) => (
                  <span key={i} className="advice-check-item">
                    <Leaf size={14} /> {item}
                  </span>
                ))}
              </div>
              <div className="advice-actions">
                <Link to="/asesoramiento" className="btn btn-light">
                  <Sparkles size={18} /> Empezar test (1 min)
                </Link>
                <a href={generateWaLink(WA_MESSAGES.general)} target="_blank" rel="noreferrer" className="advice-secondary-link">
                  <MessageCircle size={18} /> Escribinos por WhatsApp
                </a>
              </div>
            </div>
            <div className="advice-image">
              <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80" alt="Asesoramiento en De Raíz" />
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════
          TESTIMONIOS
      ══════════════════════════ */}
      <WaveTop fill="var(--blanco-calido)" bg="var(--verde-profundo)" />
      <section className="testimonials-section section-padding" style={{background: 'var(--blanco-calido)'}}>
        <div className="section-leaf section-leaf--left" style={{color: 'var(--verde-salvia)', opacity: 0.1}}>
          <LeafSVG />
        </div>
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Clientes</span>
            <h2>Lo que dicen nuestros clientes</h2>
            <p style={{marginTop: '12px', maxWidth: '520px', margin: '12px auto 0'}}>
              Experiencias de personas que encontraron plantas y asesoramiento en De Raíz.
            </p>
          </div>
          <div className="testimonials-grid">
            {[
              { name: 'Mariana R.', loc: 'Las Piedras', text: 'Me ayudaron a elegir una planta para mi apartamento con poca luz y me explicaron cómo cuidarla. Muy buena atención.' },
              { name: 'Andrés P.', loc: 'Canelones', text: 'Fui buscando un regalo y me recomendaron una planta con maceta preciosa. Quedó muy lindo y la atención fue súper amable.' },
              { name: 'Laura M.', loc: 'Las Piedras', text: 'Me gustó que no solo venden plantas, también te asesoran según el espacio que tengas. Volvería a comprar.' },
            ].map((t, i) => (
              <div key={i} className="testimonial-card animate-fade-in" style={{animationDelay: `${i*0.1}s`}}>
                <div className="testimonial-stars">{'★★★★★'}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  <span>{t.loc}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href={generateWaLink(WA_MESSAGES.general)} target="_blank" rel="noreferrer" className="btn btn-primary">
              <MessageCircle size={18} /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
