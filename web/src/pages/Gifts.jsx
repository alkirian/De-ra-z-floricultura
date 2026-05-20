import React, { useState } from 'react';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import { Gift, MessageCircle, RefreshCcw, ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import './Gifts.css';

const BASE = import.meta.env.BASE_URL;
const CATALOG_IMAGES_BASE = `${BASE}images/plantas%202`;

/* SVG de hoja decorativa */
const LeafSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 170 C60 170 10 130 10 80 C10 30 60 10 60 10 C60 10 110 30 110 80 C110 130 60 170 60 170Z" fill="currentColor"/>
    <path d="M60 170 L60 10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
  </svg>
);

const GIFT_COMBOS = [
  {
    id: 'sansevieria-noble',
    titulo: 'Sansevieria Noble + Maceta de barro',
    descripcion: 'Regalo duradero, elegante y muy facil de mantener.',
    plantas: ['Sansevieria'],
    extras: ['Maceta de barro', 'Tarjeta simple'],
    profile: 'segura',
    budgets: ['economico', 'medio'],
    occasions: ['cumpleanos', 'casa', 'agradecimiento', 'oficina'],
    spaces: ['interior', 'mixto'],
    light: ['poca', 'media'],
    styles: ['minimalista', 'clasico'],
    sizes: ['chico', 'mediano'],
    flower: 'sin-flor',
    beginner: true,
    petFriendly: false,
    eta: 'Listo en el dia',
    image: `${CATALOG_IMAGES_BASE}/sansevieria.png`,
  },
  {
    id: 'potus-colgante',
    titulo: 'Potus Colgante + Maceta decorativa',
    descripcion: 'Opcion vistosa para alegrar paredes, balcones o rincones.',
    plantas: ['Potus'],
    extras: ['Maceta colgante', 'Lazo decorativo'],
    profile: 'vistosa',
    budgets: ['economico', 'medio'],
    occasions: ['cumpleanos', 'casa', 'aniversario'],
    spaces: ['interior', 'mixto'],
    light: ['media', 'alta'],
    styles: ['tropical', 'colorido'],
    sizes: ['mediano'],
    flower: 'sin-flor',
    beginner: true,
    petFriendly: false,
    eta: 'Listo en 24 h',
    image: `${CATALOG_IMAGES_BASE}/potus.png`,
  },
  {
    id: 'monstera-premium',
    titulo: 'Monstera Premium + Maceta ceramica',
    descripcion: 'Impacto visual fuerte para un regalo protagonista.',
    plantas: ['Monstera'],
    extras: ['Maceta ceramica premium', 'Tarjeta personalizada'],
    profile: 'premium',
    budgets: ['medio', 'premium'],
    occasions: ['cumpleanos', 'casa', 'aniversario'],
    spaces: ['interior'],
    light: ['media', 'alta'],
    styles: ['tropical', 'minimalista'],
    sizes: ['mediano', 'grande'],
    flower: 'sin-flor',
    beginner: false,
    petFriendly: false,
    eta: 'Listo en 24-48 h',
    image: `${CATALOG_IMAGES_BASE}/monstera_deliciosa.png`,
  },
  {
    id: 'violeta-afectiva',
    titulo: 'Violeta Africana + Maceta mini',
    descripcion: 'Detalle con flor para momentos de agradecimiento o carino.',
    plantas: ['Violeta africana'],
    extras: ['Maceta mini', 'Tarjeta'],
    profile: 'vistosa',
    budgets: ['economico'],
    occasions: ['cumpleanos', 'agradecimiento', 'aniversario'],
    spaces: ['interior'],
    light: ['media'],
    styles: ['clasico', 'colorido'],
    sizes: ['chico'],
    flower: 'con-flor',
    beginner: true,
    petFriendly: true,
    eta: 'Listo en el dia',
    image: `${CATALOG_IMAGES_BASE}/violeta_africana.png`,
  },
  {
    id: 'ficus-hogar',
    titulo: 'Ficus elastica + Sustrato premium',
    descripcion: 'Ideal para estrenar casa con una planta de presencia.',
    plantas: ['Ficus elástica'],
    extras: ['Maceta mediana', 'Bolsa de tierra preparada'],
    profile: 'segura',
    budgets: ['medio', 'premium'],
    occasions: ['casa', 'oficina'],
    spaces: ['interior', 'mixto'],
    light: ['media', 'alta'],
    styles: ['minimalista', 'clasico'],
    sizes: ['mediano', 'grande'],
    flower: 'sin-flor',
    beginner: false,
    petFriendly: false,
    eta: 'Listo en 24 h',
    image: `${CATALOG_IMAGES_BASE}/ficus_elastica.png`,
  },
  {
    id: 'combo-celebracion',
    titulo: 'Combo Celebracion (2 plantas + envoltorio)',
    descripcion: 'Armado para sorprender, con doble impacto visual.',
    plantas: ['Monstera Monkey', 'Peperomia'],
    extras: ['Macetas coordinadas', 'Envoltorio de regalo'],
    profile: 'premium',
    budgets: ['premium'],
    occasions: ['cumpleanos', 'aniversario', 'casa'],
    spaces: ['interior', 'mixto'],
    light: ['media', 'alta'],
    styles: ['tropical', 'colorido'],
    sizes: ['mediano', 'grande'],
    flower: 'sin-flor',
    beginner: false,
    petFriendly: false,
    eta: 'Listo en 48 h',
    image: `${CATALOG_IMAGES_BASE}/monstera_adansonii.png`,
  },
  {
    id: 'sansevieria-golden-escritorio',
    titulo: 'Sansevieria golden + Maceta compacta',
    descripcion: 'Solucion simple para oficina o espacios chicos.',
    plantas: ['Sansevieria golden'],
    extras: ['Maceta chica', 'Tag de cuidado'],
    profile: 'segura',
    budgets: ['economico'],
    occasions: ['oficina', 'agradecimiento', 'cumpleanos'],
    spaces: ['interior', 'exterior', 'mixto'],
    light: ['alta', 'media'],
    styles: ['minimalista', 'clasico'],
    sizes: ['chico'],
    flower: 'sin-flor',
    beginner: true,
    petFriendly: false,
    eta: 'Listo en el dia',
    image: `${CATALOG_IMAGES_BASE}/sansevieria_variegada.png`,
  },
];

const OCASIONES = [
  { id: 'cumpleanos', label: '🎂 Cumpleaños', img: 'https://images.unsplash.com/photo-1603436326446-73e0c0c00499?auto=format&fit=crop&w=400&q=80' },
  { id: 'casa', label: '🏡 Casa Nueva', img: 'https://images.unsplash.com/photo-1599427380126-e77a11129b85?auto=format&fit=crop&w=400&q=80' },
  { id: 'oficina', label: '💻 Oficina / Trabajo', img: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=400&q=80' },
  { id: 'aniversario', label: '💞 Aniversario', img: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80' },
  { id: 'agradecimiento', label: '🙏 Agradecimiento', img: 'https://images.unsplash.com/photo-1534567110243-8875d64ca8ff?auto=format&fit=crop&w=400&q=80' },
];

const PRESUPUESTOS = [
  { id: 'economico', label: '💚 Detalle económico', sublabel: 'Algo sencillo y lindo', range: 'Hasta $900', eta: 'Listo en el día' },
  { id: 'medio', label: '🌿 Regalo intermedio', sublabel: 'Impacto real por buen precio', range: '$900 a $1800', eta: 'Listo en 24 h' },
  { id: 'premium', label: '⭐ Combo premium', sublabel: 'Para sorprender de verdad', range: 'Desde $1800', eta: 'Listo en 24-48 h' },
];

const EXPERIENCIAS = [
  { id: 'principiante', label: 'Principiante', sublabel: 'Necesita algo muy facil' },
  { id: 'intermedio', label: 'Intermedio', sublabel: 'Ya cuida algunas plantas' },
  { id: 'entusiasta', label: 'Entusiasta', sublabel: 'Le gusta cuidar y experimentar' },
];

const ESPACIOS = [
  { id: 'interior', label: 'Interior' },
  { id: 'exterior', label: 'Exterior' },
  { id: 'mixto', label: 'Mixto (interior y exterior)' },
];

const LUCES = [
  { id: 'poca', label: 'Poca luz' },
  { id: 'media', label: 'Luz media' },
  { id: 'alta', label: 'Mucha luz' },
];

const TAMANOS = [
  { id: 'chico', label: 'Chico' },
  { id: 'mediano', label: 'Mediano' },
  { id: 'grande', label: 'Grande' },
];

const ESTILOS = [
  { id: 'minimalista', label: 'Minimalista' },
  { id: 'tropical', label: 'Tropical' },
  { id: 'colorido', label: 'Colorido' },
  { id: 'clasico', label: 'Clasico' },
];

const URGENCIAS = [
  { id: 'hoy', label: 'Para hoy' },
  { id: 'manana', label: 'En 24 horas' },
  { id: 'flexible', label: 'En 48 horas o mas' },
];

const PROFILE_LABEL = {
  segura: 'Opcion segura',
  vistosa: 'Opcion vistosa',
  premium: 'Opcion premium',
};

const Gifts = () => {
  const [step, setStep] = useState(1);
  const [ocasion, setOcasion] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [espacio, setEspacio] = useState('');
  const [luz, setLuz] = useState('');
  const [tamano, setTamano] = useState('');
  const [estilo, setEstilo] = useState('');
  const [preferenciaFlor, setPreferenciaFlor] = useState('indistinto');
  const [petFriendly, setPetFriendly] = useState('indistinto');
  const [urgencia, setUrgencia] = useState('');
  const [expandedCardId, setExpandedCardId] = useState('');

  const TOTAL_STEPS = 6;

  const handleOcasion = (id) => { setOcasion(id); setStep(2); };
  const handlePresupuesto = (id) => { setPresupuesto(id); setStep(3); };
  const handleExperiencia = (id) => { setExperiencia(id); setStep(4); };
  const handleEntorno = (spaceId, lightId) => { setEspacio(spaceId); setLuz(lightId); setStep(5); };
  const handlePreferencias = (sizeId, styleId, flowerId, petId) => {
    setTamano(sizeId);
    setEstilo(styleId);
    setPreferenciaFlor(flowerId);
    setPetFriendly(petId);
    setStep(6);
  };
  const handleUrgencia = (id) => { setUrgencia(id); setStep(7); };
  const goBack = () => setStep((current) => Math.max(1, current - 1));
  const reset = () => {
    setStep(1);
    setOcasion('');
    setPresupuesto('');
    setExperiencia('');
    setEspacio('');
    setLuz('');
    setTamano('');
    setEstilo('');
    setPreferenciaFlor('indistinto');
    setPetFriendly('indistinto');
    setUrgencia('');
    setExpandedCardId('');
  };

  const scoreCombo = (combo) => {
    let score = 0;
    if (combo.occasions.includes(ocasion)) score += 4;
    if (combo.budgets.includes(presupuesto)) score += 4;
    if (combo.spaces.includes(espacio)) score += 3;
    if (combo.light.includes(luz)) score += 3;
    if (combo.styles.includes(estilo)) score += 2;
    if (combo.sizes.includes(tamano)) score += 2;
    if (preferenciaFlor !== 'indistinto' && combo.flower === preferenciaFlor) score += 2;
    if (petFriendly === 'si' && combo.petFriendly) score += 2;
    if (petFriendly === 'no') score += 1;
    if (experiencia === 'principiante' && combo.beginner) score += 2;
    if (experiencia === 'intermedio') score += 1;
    if (experiencia === 'entusiasta' && !combo.beginner) score += 2;
    return score;
  };

  const recommendations = GIFT_COMBOS
    .map((combo) => ({ ...combo, score: scoreCombo(combo) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const buildWhy = (combo) => {
    const reasons = [];
    if (combo.light.includes(luz)) reasons.push(`funciona bien en ${LUCES.find((item) => item.id === luz)?.label?.toLowerCase()}`);
    if (combo.sizes.includes(tamano)) reasons.push(`respeta el tamano ${TAMANOS.find((item) => item.id === tamano)?.label?.toLowerCase()} que pediste`);
    if (combo.styles.includes(estilo)) reasons.push(`encaja con estilo ${ESTILOS.find((item) => item.id === estilo)?.label?.toLowerCase()}`);
    if (experiencia === 'principiante' && combo.beginner) reasons.push('es facil de cuidar');
    if (petFriendly === 'si' && combo.petFriendly) reasons.push('es apta para hogares con mascotas');
    return reasons.slice(0, 2);
  };

  const ocasionLabel = OCASIONES.find(o => o.id === ocasion)?.label || '';
  const selectedBudget = PRESUPUESTOS.find(p => p.id === presupuesto);
  const presupuestoLabel = selectedBudget?.label || '';
  const experienciaLabel = EXPERIENCIAS.find((item) => item.id === experiencia)?.label || '';
  const espacioLabel = ESPACIOS.find((item) => item.id === espacio)?.label || '';
  const luzLabel = LUCES.find((item) => item.id === luz)?.label || '';
  const tamanoLabel = TAMANOS.find((item) => item.id === tamano)?.label || '';
  const estiloLabel = ESTILOS.find((item) => item.id === estilo)?.label || '';
  const urgenciaLabel = URGENCIAS.find((item) => item.id === urgencia)?.label || '';

  const waPayload = {
    ocasion: ocasionLabel,
    presupuesto: `${presupuestoLabel} (${selectedBudget?.range || 'Sin rango'})`,
    experiencia: experienciaLabel,
    espacio: espacioLabel,
    luz: luzLabel,
    tamano: tamanoLabel,
    estilo: estiloLabel,
    flor: preferenciaFlor,
    petFriendly,
    urgencia: urgenciaLabel,
  };

  return (
    <div className="gifts-page">
      <SEO
        title="Regalos con plantas y combos listos en Las Piedras | De Raiz"
        description="Regala vida. Encontra combos listos de plantas con maceta para cumpleanos, casas nuevas y ocasiones especiales con atencion local."
        path="/regalos"
      />
      {/* ══════════════════════════
          HERO REGALOS (DARK)
      ══════════════════════════ */}
      <section className="gifts-hero section-dark section-padding" style={{paddingTop: '160px'}}>
        <div className="hero-leaf hero-leaf--tl" style={{color: 'var(--verde-salvia)', opacity: 0.2}}>
          <LeafSVG />
        </div>
        <div className="container text-center animate-fade-in">
          <span className="section-label" style={{color: 'var(--terracota-light)'}}>Obsequios con vida</span>
          <h1 className="page-title" style={{color: 'var(--crema)'}}>El regalo que sigue creciendo</h1>
          <p className="page-subtitle mb-8 mx-auto" style={{color: 'rgba(244,235,224,0.8)', maxWidth: '600px'}}>
            Elegi el regalo ideal con una guia rapida y recibi 3 opciones sugeridas.
          </p>
          <div className="title-underline" style={{background: 'var(--terracota-light)'}}></div>
        </div>
      </section>

      {/* ══════════════════════════
          ARMADOR INTERACTIVO
      ══════════════════════════ */}
      <section className="section-padding" style={{background: 'var(--crema)'}}>
        <div className="container" style={{maxWidth: '900px'}}>
          <div className="gift-progress-wrap">
            <div className="gift-progress-head">
              <span className="section-label">Guia personalizada</span>
              <span>Paso {Math.min(step, TOTAL_STEPS)} de {TOTAL_STEPS}</span>
            </div>
            <div className="gift-progress-bar" role="presentation">
              <span style={{ width: `${(Math.min(step, TOTAL_STEPS) / TOTAL_STEPS) * 100}%` }}></span>
            </div>
          </div>

          {step > 1 && step < 7 && (
            <button type="button" className="gift-back-btn" onClick={goBack}>
              <ArrowLeft size={16} /> Volver
            </button>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <span className="section-label">Paso 1</span>
                <h2 className="section-title">¿Para qué ocasión es el regalo?</h2>
              </div>
              <div className="gift-step-grid">
                {OCASIONES.map(o => (
                  <button key={o.id} className="gift-option-card card" onClick={() => handleOcasion(o.id)}>
                    <div className="gift-option-img">
                      <img src={o.img} alt={o.label} />
                    </div>
                    <span className="gift-option-label">{o.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <p className="badge badge-green mb-4">{ocasionLabel}</p>
                <span className="section-label">Paso 2</span>
                <h2 className="section-title">¿Cuánto pensabas gastar?</h2>
              </div>
              <div className="presupuesto-grid">
                {PRESUPUESTOS.map(p => (
                  <button key={p.id} className="presupuesto-card card" onClick={() => handlePresupuesto(p.id)}>
                    <div className="presupuesto-info">
                      <span className="presupuesto-label">{p.label}</span>
                      <span className="presupuesto-sub">{p.sublabel}</span>
                      <div className="presupuesto-meta">
                        <span>{p.range}</span>
                        <span>{p.eta}</span>
                      </div>
                    </div>
                    <ArrowRight size={20} className="presupuesto-arrow" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <p className="badge badge-green mb-4">{ocasionLabel} · {presupuestoLabel}</p>
                <span className="section-label">Paso 3</span>
                <h2 className="section-title">¿Qué experiencia tiene quien recibe?</h2>
              </div>
              <div className="presupuesto-grid">
                {EXPERIENCIAS.map((item) => (
                  <button key={item.id} className="presupuesto-card card" onClick={() => handleExperiencia(item.id)}>
                    <div className="presupuesto-info">
                      <span className="presupuesto-label">{item.label}</span>
                      <span className="presupuesto-sub">{item.sublabel}</span>
                    </div>
                    <ArrowRight size={20} className="presupuesto-arrow" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <p className="badge badge-green mb-4">{experienciaLabel}</p>
                <span className="section-label">Paso 4</span>
                <h2 className="section-title">Elegi espacio y luz del lugar</h2>
              </div>
              <div className="gift-pair-grid">
                {ESPACIOS.map((space) => (
                  <article className="gift-pair-card card" key={space.id}>
                    <h3>{space.label}</h3>
                    <div className="gift-chip-grid">
                      {LUCES.map((light) => (
                        <button
                          key={light.id}
                          className="gift-chip"
                          onClick={() => handleEntorno(space.id, light.id)}
                        >
                          {light.label}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <p className="badge badge-green mb-4">{espacioLabel} · {luzLabel}</p>
                <span className="section-label">Paso 5</span>
                <h2 className="section-title">Preferencias del regalo</h2>
              </div>

              <div className="gift-preferences card">
                <div className="gift-pref-group">
                  <h3>Tamano</h3>
                  <div className="gift-chip-grid">
                    {TAMANOS.map((item) => (
                      <button key={item.id} className={`gift-chip ${tamano === item.id ? 'is-active' : ''}`} onClick={() => setTamano(item.id)}>{item.label}</button>
                    ))}
                  </div>
                </div>

                <div className="gift-pref-group">
                  <h3>Estilo</h3>
                  <div className="gift-chip-grid">
                    {ESTILOS.map((item) => (
                      <button key={item.id} className={`gift-chip ${estilo === item.id ? 'is-active' : ''}`} onClick={() => setEstilo(item.id)}>{item.label}</button>
                    ))}
                  </div>
                </div>

                <div className="gift-pref-group">
                  <h3>Con flor</h3>
                  <div className="gift-chip-grid">
                    <button className={`gift-chip ${preferenciaFlor === 'con-flor' ? 'is-active' : ''}`} onClick={() => setPreferenciaFlor('con-flor')}>Si</button>
                    <button className={`gift-chip ${preferenciaFlor === 'sin-flor' ? 'is-active' : ''}`} onClick={() => setPreferenciaFlor('sin-flor')}>No</button>
                    <button className={`gift-chip ${preferenciaFlor === 'indistinto' ? 'is-active' : ''}`} onClick={() => setPreferenciaFlor('indistinto')}>Indistinto</button>
                  </div>
                </div>

                <div className="gift-pref-group">
                  <h3>Hogar con mascotas</h3>
                  <div className="gift-chip-grid">
                    <button className={`gift-chip ${petFriendly === 'si' ? 'is-active' : ''}`} onClick={() => setPetFriendly('si')}>Si</button>
                    <button className={`gift-chip ${petFriendly === 'no' ? 'is-active' : ''}`} onClick={() => setPetFriendly('no')}>No</button>
                    <button className={`gift-chip ${petFriendly === 'indistinto' ? 'is-active' : ''}`} onClick={() => setPetFriendly('indistinto')}>Indistinto</button>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-full"
                  onClick={() => handlePreferencias(tamano || 'mediano', estilo || 'minimalista', preferenciaFlor, petFriendly)}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <p className="badge badge-green mb-4">{tamanoLabel || 'Tamano mediano'} · {estiloLabel || 'Minimalista'}</p>
                <span className="section-label">Paso 6</span>
                <h2 className="section-title">¿Para cuando lo necesitas?</h2>
              </div>
              <div className="presupuesto-grid">
                {URGENCIAS.map((item) => (
                  <button key={item.id} className="presupuesto-card card" onClick={() => handleUrgencia(item.id)}>
                    <div className="presupuesto-info">
                      <span className="presupuesto-label">{item.label}</span>
                    </div>
                    <ArrowRight size={20} className="presupuesto-arrow" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 7 && recommendations.length > 0 && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <p className="badge badge-green mb-4">{ocasionLabel} · {presupuestoLabel} · {urgenciaLabel}</p>
                <span className="section-label">Resultado</span>
                <h2 className="section-title">Tus 3 opciones recomendadas</h2>
              </div>

              <div className="gift-results-grid">
                {recommendations.map((combo, index) => (
                  <article key={combo.id} className={`combo-result card is-${combo.profile}`}>
                    <div className="combo-image-wrap">
                      <img src={combo.image} alt={combo.titulo} className="combo-image" loading="lazy" />
                    </div>
                    <button
                      type="button"
                      className="combo-head-button"
                      onClick={() => setExpandedCardId((current) => current === combo.id ? '' : combo.id)}
                    >
                      <div className="combo-header">
                        <div className="combo-icon-wrap"><Gift size={28} /></div>
                        <div>
                          <p className="combo-kicker">{PROFILE_LABEL[combo.profile]} · Opcion {index + 1}</p>
                          <h3 className="combo-title">{combo.titulo}</h3>
                        </div>
                      </div>
                      <ArrowRight size={18} className={`combo-toggle ${expandedCardId === combo.id || index === 0 ? 'is-open' : ''}`} />
                    </button>

                    <div className={`combo-body ${expandedCardId === combo.id || (!expandedCardId && index === 0) ? 'is-open' : ''}`}>
                      <div className="combo-simple-info">
                        <p><strong>Por que recomendada:</strong> {buildWhy(combo)[0] || 'Se adapta bien a tu seleccion.'}</p>
                        <p><strong>Precio estimado:</strong> {selectedBudget?.range}</p>
                        <p><strong>Extra sugerido:</strong> {combo.extras[0]}</p>
                      </div>

                      <div className="combo-cta">
                        <a
                          href={generateWaLink(WA_MESSAGES.regalo({
                            ...waPayload,
                            opcionElegida: `${index + 1}. ${combo.titulo}`,
                            opcionTipo: PROFILE_LABEL[combo.profile],
                            opcionId: combo.id,
                          }))}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary w-full"
                        >
                          <MessageCircle size={20} />
                          Quiero esta opcion
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="combo-result card combo-result-footer">
                <div className="combo-cta">
                  <p>
                    Si preferis, te asesoramos segun estas respuestas y te proponemos disponibilidad real del momento.
                  </p>
                  <a
                    href={generateWaLink(WA_MESSAGES.regalo({ ...waPayload, opcionElegida: 'Necesito asesoramiento para elegir entre las 3 opciones' }))}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary w-full"
                  >
                    <MessageCircle size={20} />
                    Asesorenme por WhatsApp
                  </a>
                  <button className="btn btn-secondary w-full mt-4" onClick={reset}>
                    <RefreshCcw size={16} /> Armar otro regalo
                  </button>
                  <p className="gift-disclaimer">
                    Los precios son rangos orientativos y pueden variar segun stock, tamano y maceta disponible.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Gifts;
