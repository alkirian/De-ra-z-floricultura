import React, { useState } from 'react';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import { Gift, MessageCircle, RefreshCcw, ArrowRight } from 'lucide-react';
import './Gifts.css';

/* SVG de hoja decorativa */
const LeafSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 170 C60 170 10 130 10 80 C10 30 60 10 60 10 C60 10 110 30 110 80 C110 130 60 170 60 170Z" fill="currentColor"/>
    <path d="M60 170 L60 10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
  </svg>
);

// Combos de regalos por tipo de ocasión y presupuesto
const GIFT_COMBOS = {
  'cumpleanos-economico': {
    titulo: 'Mini Suculenta + Maceta de Barro',
    descripcion: 'Una suculenta pequeña en maceta de barro. Sencillo, hermoso y fácil de mantener.',
    plantas: ['Suculenta surtida'],
    extras: ['Maceta de barro pequeña'],
  },
  'cumpleanos-medio': {
    titulo: 'Potus Colgante + Maceta Colgante',
    descripcion: 'El Potus es el favorito para regalar. Resistente, elegante y muy decorativo.',
    plantas: ['Potus'],
    extras: ['Maceta colgante', 'Lazo decorativo'],
  },
  'cumpleanos-premium': {
    titulo: 'Monstera Deliciosa + Maceta Cerámica',
    descripcion: 'La Monstera es el regalo estrella. Impacta, crece y se ve espectacular en cualquier espacio.',
    plantas: ['Monstera'],
    extras: ['Maceta de cerámica premium', 'Tarjeta personalizada'],
  },
  'casa-economico': {
    titulo: 'Peperomia o Sansevieria',
    descripcion: 'Una planta fácil de cuidar, ideal para quien empieza a decorar su hogar.',
    plantas: ['Peperomia o Sansevieria'],
    extras: ['Maceta pequeña'],
  },
  'casa-medio': {
    titulo: 'Ficus Elastica + Sustrato Premium',
    descripcion: 'Un árbol de interior que decora cualquier rincón del nuevo hogar.',
    plantas: ['Ficus elástica'],
    extras: ['Maceta mediana', 'Bolsa de tierra preparada'],
  },
  'casa-premium': {
    titulo: 'Combo Hogar Verde (3 plantas)',
    descripcion: 'Un combo armado para decorar tres espacios distintos del hogar. Consultanos y elegimos juntos.',
    plantas: ['Monstera', 'Potus', 'Sansevieria'],
    extras: ['Macetas coordinadas', 'Tarjeta personalizada'],
  },
  'oficina-economico': {
    titulo: 'Mini Cactus o Suculenta de escritorio',
    descripcion: 'Pequeña, resistente, sin olor y que sobrevive con poca luz artificial.',
    plantas: ['Cactus o Suculenta'],
    extras: ['Maceta chica'],
  },
  'oficina-medio': {
    titulo: 'Sansevieria Dorada',
    descripcion: 'La Sansevieria golden decora, purifica el aire y necesita un riego cada 20 días.',
    plantas: ['Sansevieria golden'],
    extras: ['Maceta moderna'],
  },
  'oficina-premium': {
    titulo: 'Drácena o Ficus Lyrata de oficina',
    descripcion: 'Una planta grande y elegante para un escritorio o rincón de oficina que impacte.',
    plantas: ['Drácena o Ficus lyrata'],
    extras: ['Maceta alta', 'Tarjeta de bienvenida'],
  },
};

const OCASIONES = [
  { id: 'cumpleanos', label: '🎂 Cumpleaños', img: 'https://images.unsplash.com/photo-1603436326446-73e0c0c00499?auto=format&fit=crop&w=400&q=80' },
  { id: 'casa', label: '🏡 Casa Nueva', img: 'https://images.unsplash.com/photo-1599427380126-e77a11129b85?auto=format&fit=crop&w=400&q=80' },
  { id: 'oficina', label: '💻 Oficina / Trabajo', img: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=400&q=80' },
];

const PRESUPUESTOS = [
  { id: 'economico', label: '💚 Detalle económico', sublabel: 'Algo sencillo y lindo', range: 'Hasta $900', eta: 'Listo en el día' },
  { id: 'medio', label: '🌿 Regalo intermedio', sublabel: 'Impacto real por buen precio', range: '$900 a $1800', eta: 'Listo en 24 h' },
  { id: 'premium', label: '⭐ Combo premium', sublabel: 'Para sorprender de verdad', range: 'Desde $1800', eta: 'Listo en 24-48 h' },
];

const Gifts = () => {
  const [step, setStep] = useState(1);
  const [ocasion, setOcasion] = useState('');
  const [presupuesto, setPresupuesto] = useState('');

  const handleOcasion = (id) => { setOcasion(id); setStep(2); };
  const handlePresupuesto = (id) => { setPresupuesto(id); setStep(3); };
  const reset = () => { setStep(1); setOcasion(''); setPresupuesto(''); };

  const combo = GIFT_COMBOS[`${ocasion}-${presupuesto}`];
  const ocasionLabel = OCASIONES.find(o => o.id === ocasion)?.label || '';
  const selectedBudget = PRESUPUESTOS.find(p => p.id === presupuesto);
  const presupuestoLabel = selectedBudget?.label || '';

  return (
    <div className="gifts-page">
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
            Armá el combo perfecto en 2 pasos. Te decimos qué llevar y te lo tenemos listo para sorprender.
          </p>
          <div className="title-underline" style={{background: 'var(--terracota-light)'}}></div>
        </div>
      </section>

      {/* ══════════════════════════
          ARMADOR INTERACTIVO
      ══════════════════════════ */}
      <section className="section-padding" style={{background: 'var(--crema)'}}>
        <div className="container" style={{maxWidth: '900px'}}>

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

          {step === 3 && combo && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <p className="badge badge-green mb-4">{ocasionLabel} · {presupuestoLabel}</p>
                <span className="section-label">Resultado</span>
                <h2 className="section-title">Tu combo ideal</h2>
              </div>

              <div className="combo-result card">
                <div className="combo-header">
                  <div className="combo-icon-wrap"><Gift size={32} /></div>
                  <h3 className="combo-title">{combo.titulo}</h3>
                </div>
                <p className="combo-description">{combo.descripcion}</p>

                <div className="combo-details">
                  <div className="combo-col">
                    <h4>🌱 Plantas incluidas</h4>
                    <ul>{combo.plantas.map((p, i) => <li key={i}>{p}</li>)}</ul>
                  </div>
                  <div className="combo-col">
                    <h4>🎁 Extras sugeridos</h4>
                    <ul>{combo.extras.map((e, i) => <li key={i}>{e}</li>)}</ul>
                  </div>
                </div>

                <div className="combo-cta">
                  <p>
                    Rango estimado: <strong>{selectedBudget?.range}</strong> · Tiempo de armado: <strong>{selectedBudget?.eta}</strong>.
                    Los precios finales pueden variar según stock.
                  </p>
                  <a
                    href={generateWaLink(WA_MESSAGES.regalo(ocasionLabel, presupuestoLabel))}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary w-full"
                  >
                    <MessageCircle size={20} />
                    Encargar este regalo
                  </a>
                  <button className="btn btn-secondary w-full mt-4" onClick={reset}>
                    <RefreshCcw size={16} /> Armar otro combo
                  </button>
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
