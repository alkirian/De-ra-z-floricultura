import React, { useState, useEffect } from 'react';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import { RefreshCcw, MessageCircle, HelpCircle, Droplets, Sun, AlertTriangle, ChevronDown, ChevronUp, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Advice.css';

/* SVG de hoja decorativa */
const LeafSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 170 C60 170 10 130 10 80 C10 30 60 10 60 10 C60 10 110 30 110 80 C110 130 60 170 60 170Z" fill="currentColor"/>
    <path d="M60 170 L60 10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
  </svg>
);

// Motor de recomendación basado en respuestas
const RECOMMENDATIONS = {
  'interior-poca-principiante': [
    { name: 'Sansevieria', motivo: 'Aguanta poca luz y muy poca agua. Perfecta para empezar.' },
    { name: 'Potus', motivo: 'Se adapta a casi cualquier ambiente interior. Muy resistente.' },
  ],
  'interior-poca-decorar': [
    { name: 'Potus', motivo: 'Cuelga o trepa, da mucho verde con poca luz.' },
    { name: 'Spathiphyllum', motivo: 'Florece en sombra, purifica el aire y se ve muy elegante.' },
  ],
  'interior-media-principiante': [
    { name: 'Peperomia', motivo: 'Pequeña, bonita y muy difícil de matar. Ideal para empezar.' },
    { name: 'Drácena', motivo: 'Crece lento y no es exigente. Perfecta para interiores.' },
  ],
  'interior-media-decorar': [
    { name: 'Monstera', motivo: 'La reina de los interiores. Crece espectacular con luz media.' },
    { name: 'Ficus lyrata', motivo: 'Muy elegante, ideal para decorar esquinas o salas.' },
  ],
  'interior-mucha-principiante': [
    { name: 'Croton', motivo: 'Colores vibrantes con buena luz. Fácil de mantener.' },
    { name: 'Areca', motivo: 'Una palmera de interior espectacular. Ama la luz.' },
  ],
  'interior-mucha-decorar': [
    { name: 'Monstera Monkey', motivo: 'Exótica y llamativa. Para los que buscan algo diferente.' },
    { name: 'Ficus elástica', motivo: 'Hojas grandes y brillantes. Da un look premium al espacio.' },
  ],
  'exterior-poca-principiante': [
    { name: 'Helecho', motivo: 'Clásico para semisombra. Fácil y muy decorativo.' },
    { name: 'Hiedra', motivo: 'Cubre paredes y crece sola. Sin mucho cuidado.' },
  ],
  'exterior-poca-decorar': [
    { name: 'Helecho Hawaii', motivo: 'Exuberante, ideal para balcones o patios sombreados.' },
    { name: 'Columnea', motivo: 'Flores llamativas y se adapta bien a semisombra.' },
  ],
  'exterior-media-principiante': [
    { name: 'Lavanda', motivo: 'Aromática, resistente y muy vistosa. Fácil de cuidar.' },
    { name: 'Gazania', motivo: 'Florece sola y en abundancia. Requiere poco riego.' },
  ],
  'exterior-media-decorar': [
    { name: 'Plumbago', motivo: 'Flores azules preciosas. Ideal para cercos o jardines.' },
    { name: 'Dipladenia', motivo: 'Trepadora florida, perfecta para enrejar con mucho color.' },
  ],
  'exterior-mucha-principiante': [
    { name: 'Copete', motivo: 'Resiste sol intenso y da color todo el año. Muy fácil.' },
    { name: 'Petunia', motivo: 'Floración espectacular con pleno sol. Clásica y hermosa.' },
  ],
  'exterior-mucha-decorar': [
    { name: 'Calistemo', motivo: 'Sus flores rojas son únicas. Para un jardín con personalidad.' },
    { name: 'Dipladenia', motivo: 'Flores grandes y llamativas. Muy decorativa en sol directo.' },
  ],
};

const getRecommendations = (ubicacion, luz, proposito) => {
  const key = `${ubicacion}-${luz}-${proposito}`;
  return RECOMMENDATIONS[key] || [
    { name: 'Sansevieria', motivo: 'Resistente a casi todo. Ideal para cualquier espacio.' },
    { name: 'Potus', motivo: 'El favorito del vivero. Se adapta a todo.' },
  ];
};

const FAQItem = ({ question, answer, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <div className="faq-icon-title">
          <div className="faq-icon-wrap"><Icon size={20} /></div>
          <h3>{question}</h3>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <div className={`faq-answer ${isOpen ? 'show' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

const TIPS = [
  "«Es mil veces más fácil salvar a una planta que pasó sed, que a una planta que se ahogó. Ante la duda, no riegues».",
  "«No te sientas mal si una planta no sobrevive. A todos nos pasa al principio; es parte de aprender».",
  "«Las plantas hablan: puntas secas y crujientes piden humedad en el ambiente».",
  "«Limpiar las hojas del polvo les ayuda a respirar y a hacer mejor la fotosíntesis».",
  "«Las raíces necesitan oxígeno tanto como agua. Siempre usá macetas con drenaje»."
];

const Advice = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ ubicacion: '', luz: '', proposito: '' });
  const [tipIndex, setTipIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => { setTipIndex((prev) => (prev + 1) % TIPS.length); setFade(false); }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setStep(prev => prev + 1);
  };

  const resetQuiz = () => { setStep(1); setAnswers({ ubicacion: '', luz: '', proposito: '' }); };

  const renderQuizStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="quiz-step animate-fade-in">
            <h3 className="quiz-step-title">¿Dónde vas a poner la planta?</h3>
            <div className="quiz-options">
              <button className="quiz-card" onClick={() => handleAnswer('ubicacion', 'interior')}>
                <div className="quiz-card-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1593691509543-c20fb51c0b47?auto=format&fit=crop&w=600&q=80')"}}></div>
                <div className="quiz-card-overlay"></div>
                <div className="quiz-card-content"><span>Adentro (Interior)</span></div>
              </button>
              <button className="quiz-card" onClick={() => handleAnswer('ubicacion', 'exterior')}>
                <div className="quiz-card-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1585320806297-9794b3e4ce88?auto=format&fit=crop&w=600&q=80')"}}></div>
                <div className="quiz-card-overlay"></div>
                <div className="quiz-card-content"><span>Afuera (Exterior / Balcón)</span></div>
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="quiz-step animate-fade-in">
            <h3 className="quiz-step-title">¿Cuánta luz natural tiene ese lugar?</h3>
            <div className="quiz-options">
              <button className="quiz-card" onClick={() => handleAnswer('luz', 'mucha')}>
                <div className="quiz-card-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1416879598555-22008fb95b7b?auto=format&fit=crop&w=600&q=80')"}}></div>
                <div className="quiz-card-overlay"></div>
                <div className="quiz-card-content"><span>Mucha (Sol directo)</span></div>
              </button>
              <button className="quiz-card" onClick={() => handleAnswer('luz', 'media')}>
                <div className="quiz-card-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1597055905081-8fbdfa3ec865?auto=format&fit=crop&w=600&q=80')"}}></div>
                <div className="quiz-card-overlay"></div>
                <div className="quiz-card-content"><span>Media (Sin sol directo)</span></div>
              </button>
              <button className="quiz-card" onClick={() => handleAnswer('luz', 'poca')}>
                <div className="quiz-card-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1598935829031-64e03f0b8d5b?auto=format&fit=crop&w=600&q=80')"}}></div>
                <div className="quiz-card-overlay"></div>
                <div className="quiz-card-content"><span>Poca (Lugar oscuro)</span></div>
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="quiz-step animate-fade-in">
            <h3 className="quiz-step-title">¿Qué buscás en esta planta?</h3>
            <div className="quiz-options">
              <button className="quiz-card" onClick={() => handleAnswer('proposito', 'principiante')}>
                <div className="quiz-card-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80')"}}></div>
                <div className="quiz-card-overlay"></div>
                <div className="quiz-card-content"><span>Soy principiante (quiero algo fácil)</span></div>
              </button>
              <button className="quiz-card" onClick={() => handleAnswer('proposito', 'decorar')}>
                <div className="quiz-card-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80')"}}></div>
                <div className="quiz-card-overlay"></div>
                <div className="quiz-card-content"><span>Quiero algo más decorativo</span></div>
              </button>
            </div>
          </div>
        );
      case 4: {
        const recs = getRecommendations(answers.ubicacion, answers.luz, answers.proposito);
        const nombresRecs = recs.map(r => r.name).join(', ');
        const finalMessage = WA_MESSAGES.asesoramiento(answers.ubicacion, answers.luz, answers.proposito, nombresRecs);
        const suggestedCategory = answers.ubicacion === 'interior' ? 'Interior' : 'Exterior';
        const catalogLink = `/catalogo?cat=${encodeURIComponent(suggestedCategory)}&q=${encodeURIComponent(recs[0]?.name || '')}`;
        return (
          <div className="quiz-step animate-fade-in result-step">
            <div className="result-header">
              <Leaf size={40} color="var(--terracota)" />
              <h3 className="result-title">¡Tu diagnóstico está listo!</h3>
              <p>Para un espacio <strong>{answers.ubicacion}</strong> con <strong>{answers.luz}</strong> luz y nivel <strong>{answers.proposito}</strong>, te recomendamos:</p>
            </div>
            <div className="recommendation-cards">
              {recs.map((rec, idx) => (
                <div key={idx} className="rec-card">
                  <div className="rec-card-name">
                    <Leaf size={18} color="var(--verde-profundo)" />
                    <strong>{rec.name}</strong>
                  </div>
                  <p>{rec.motivo}</p>
                  <Link to="/catalogo" className="rec-card-link">Ver en catálogo <ArrowRight size={14} /></Link>
                </div>
              ))}
            </div>
            <div className="result-cta">
              <p className="result-cta-text">¿Te convencieron? Escribinos y te confirmamos disponibilidad y precio.</p>
              <Link to={catalogLink} className="btn btn-secondary w-full">
                <ArrowRight size={18} /> Ver sugeridas en catálogo
              </Link>
              <a href={generateWaLink(finalMessage)} target="_blank" rel="noreferrer" className="btn btn-primary w-full">
                <MessageCircle size={20} /> Preguntar por estas plantas
              </a>
              <button className="btn btn-secondary w-full mt-4" onClick={resetQuiz}>
                <RefreshCcw size={16} /> Cambiar respuestas
              </button>
            </div>
          </div>
        );
      }
      default: return null;
    }
  };

  return (
    <div className="advice-page">
      {/* ══════════════════════════
          HERO ASESORÍA
      ══════════════════════════ */}
      <section className="advice-hero section-padding--sm" style={{background: 'var(--crema)', paddingTop: '140px'}}>
        <div className="container text-center">
          <span className="section-label">Asesoramiento</span>
          <h1 className="page-title">Consultorio Botánico</h1>
          <p className="page-subtitle mb-8 mx-auto" style={{maxWidth: '600px'}}>
            Te ayudamos a elegir la planta correcta segun tu luz, tu espacio y tu tiempo de cuidado.
          </p>
          <div className="title-underline"></div>
        </div>
      </section>

      <section className="advice-services section-padding--sm" style={{background: 'var(--blanco-calido)'}}>
        <div className="container">
          <div className="text-center mb-8">
            <span className="section-label">Servicios</span>
            <h2 className="section-title">Te asesoramos en minutos</h2>
          </div>
          <div className="advice-services-grid">
            <a href={generateWaLink(WA_MESSAGES.ayudaElegir)} target="_blank" rel="noreferrer" className="advice-service-card">
              <h3>Te ayudo a elegir tu planta</h3>
              <p>Contanos tu espacio y te recomendamos opciones concretas.</p>
            </a>
            <a href={generateWaLink(WA_MESSAGES.diagnostico)} target="_blank" rel="noreferrer" className="advice-service-card">
              <h3>Diagnóstico inicial de planta</h3>
              <p>Si la ves decaída, mandanos foto y te guiamos paso a paso.</p>
            </a>
            <a href={generateWaLink(WA_MESSAGES.regaloRapido)} target="_blank" rel="noreferrer" className="advice-service-card">
              <h3>Regalo armado</h3>
              <p>Te recomendamos opciones segun ocasion y presupuesto.</p>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          FAQ SECTION
      ══════════════════════════ */}
      <section className="faq-section section-padding" style={{backgroundColor: 'var(--blanco-calido)', position: 'relative'}}>
        <div className="leaf-deco leaf-deco--faq-left" style={{left: '-30px', top: '100px', color: 'var(--verde-salvia)'}}>
          <LeafSVG />
        </div>
        <div className="container">
          <div className="faq-grid">
            <div className="faq-text-col">
              <span className="section-label">Preguntas comunes</span>
              <h2 className="section-title">Lo que más nos preguntan</h2>
              <p className="mb-8">Respuestas rápidas a los problemas más comunes que vemos todos los días en el vivero.</p>
              
              <div className="expert-tip card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{fontFamily: 'var(--font-base)', fontWeight: 800, color: 'var(--verde-profundo)'}}>🌱 Sabiduría Botánica</h4>
                  <div className="tip-indicators">
                    {TIPS.map((_, idx) => (<span key={idx} className={`dot ${idx === tipIndex ? 'active' : ''}`}></span>))}
                  </div>
                </div>
                <p className="tip-text" style={{ opacity: fade ? 0 : 1, transition: 'opacity 0.5s ease', minHeight: '80px', fontStyle: 'italic', color: 'var(--texto-medio)' }}>
                  {TIPS[tipIndex]}
                </p>
              </div>
            </div>
            
            <div className="faq-accordion-col">
              <FAQItem icon={Droplets} question="¿Cómo sé cuándo tengo que regar?" answer="No te guíes por los días ('regar cada 3 días' es un mito). Meté el dedo en la tierra unos 3 centímetros. Si está seca, regá profundo hasta que salga agua por abajo. Si está húmeda, esperá." />
              <FAQItem icon={Sun} question="Mi casa es muy oscura, ¿puedo tener plantas?" answer="¡Sí! Existen plantas guerreras como la Sansevieria o el Potus que sobreviven casi sin luz natural. Ninguna planta vive en oscuridad total, pero se adaptan muy bien a la sombra." />
              <FAQItem icon={AlertTriangle} question="¿Qué pasa si las hojas se ponen amarillas?" answer="En el 90% de los casos, es por exceso de agua o mal drenaje. Revisá que la maceta tenga agujeros abajo y que la tierra no sea un barro permanente." />
              <FAQItem icon={HelpCircle} question="Tengo gatos/perros, ¿qué me recomiendan?" answer="Muchas plantas populares (como Monstera o Ficus) son tóxicas. Escribinos por WhatsApp y te mostramos las opciones Pet Friendly (como Calateas o Helechos)." />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          DIAGNÓSTICO INTERACTIVO
      ══════════════════════════ */}
      <section className="quiz-section section-padding" style={{background: 'var(--crema)'}}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Interactivo</span>
            <h2 className="section-title">Diagnóstico de Espacio</h2>
            <p className="quiz-time-pill">Te lleva 1 minuto</p>
            <p className="mt-4" style={{color: 'var(--texto-suave)'}}>¿Aún no sabés qué llevar? Hacé este test de 3 pasos y te recomendamos la planta ideal.</p>
          </div>
          <div className="quiz-container card">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>
            <div className="quiz-content animate-fade-in">{renderQuizStep()}</div>
          </div>
        </div>
        <div className="leaf-deco leaf-deco--quiz-right" style={{right: '-30px', bottom: '50px', transform: 'rotate(180deg) scaleX(-1)', color: 'var(--terracota)', opacity: 0.1}}>
          <LeafSVG />
        </div>
      </section>

    </div>
  );
};

export default Advice;
