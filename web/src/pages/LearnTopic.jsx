import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronRight, 
  Sun, 
  Droplet, 
  Sprout, 
  Thermometer, 
  AlertTriangle, 
  HeartCrack, 
  Clock, 
  User, 
  Compass, 
  Bookmark, 
  ArrowUpRight, 
  CheckCircle, 
  Activity, 
  Info,
  MessageCircle
} from 'lucide-react';
import { generateWaLink } from '../data/mockData';
import { getLearnTopicBySlug, LEARN_TOPICS } from '../data/learnTopics';
import SEO from '../components/SEO';
import './LearnTopic.css';

// Plant Technical Specs Mapper
const getTechSpecs = (slug) => {
  if (slug === 'guia-ficus-lyrata') {
    return {
      light: 'Luz indirecta brillante',
      water: 'Moderado (dejar secar sustrato)',
      humidity: 'Alta (>60% de humedad)',
      temp: '18°C - 24°C (proteger de heladas)',
      toxicity: 'Tóxica para mascotas (látex irritante)'
    };
  }
  if (slug === 'guia-espada-de-san-jorge') {
    return {
      light: 'Adaptable (prefiere indirecta brillante)',
      water: 'Escaso (dejar secar 100% de la tierra)',
      humidity: 'Baja-Media (muy tolerante)',
      temp: '10°C - 35°C (de las más resistentes)',
      toxicity: 'Tóxica para mascotas (oxalato de calcio)'
    };
  }
  if (slug === 'guia-monstera-deliciosa') {
    return {
      light: 'Luz indirecta brillante',
      water: 'Moderado (dejar secar sustrato al 50%)',
      humidity: 'Alta (>50% de humedad)',
      temp: '15°C - 30°C',
      toxicity: 'Tóxica para mascotas (oxalato de calcio)'
    };
  }
  return null;
};

const LearnTopic = () => {
  const { topicSlug } = useParams();
  const topic = getLearnTopicBySlug(topicSlug || '');

  // Tech Specs & Symptoms Widget State
  const techSpecs = topic ? getTechSpecs(topic.slug) : null;
  const symptoms = topic && topic.problems ? topic.problems.map((p, idx) => ({
    id: String(idx),
    label: p.title,
    symptom: p.title,
    cause: p.description || p.text || 'Desequilibrio de cultivo',
    solution: p.solution || 'Ajustar frecuencia de riego y ubicación'
  })) : null;

  const [activeSymptom, setActiveSymptom] = useState(null);
  const [activeSection, setActiveSection] = useState('');

  // Update active symptom whenever topic change
  useEffect(() => {
    if (symptoms && symptoms.length > 0) {
      setActiveSymptom(symptoms[0]);
    } else {
      setActiveSymptom(null);
    }
  }, [topicSlug]);

  // Scroll spy to highlight Table of Contents active link using performance-optimized IntersectionObserver
  useEffect(() => {
    if (!topic) return;

    const sections = [
      ...topic.sections.map((s) => s.id),
      topic.seasonNotes ? 'temporada' : '',
      symptoms ? 'diagnostico' : '',
      topic.relatedCatalog?.length > 0 ? 'productos' : ''
    ].filter(Boolean);

    const observerOptions = {
      root: null,
      rootMargin: '-110px 0px -50% 0px',
      threshold: 0
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [topic, symptoms]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 110;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  if (!topic) {
    return (
      <div className="learn-topic-page">
        <section className="section-padding" style={{ paddingTop: '150px' }}>
          <div className="container">
            <div className="learn-topic-not-found card">
              <h1>Tema no encontrado</h1>
              <p>Volvé a Aprender de Raíz para elegir otro tema.</p>
              <Link to="/aprende-de-raiz" className="btn btn-primary">
                <ArrowLeft size={16} /> Volver a temas
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const waMessage = [
    'Hola De Raiz, estuve leyendo Aprende de Raiz.',
    `Tema: ${topic.title}`,
    'Quiero ayuda para aplicar estos consejos a mi planta.',
  ].join('\n');

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: topic.title,
    description: topic.summary,
    image: `https://alkirian.github.io/De-ra-z-floricultura${topic.image}`,
    author: {
      '@type': 'Organization',
      name: 'De Raiz Floricultura',
    },
    publisher: {
      '@type': 'Organization',
      name: 'De Raiz Floricultura',
    },
    mainEntityOfPage: `https://alkirian.github.io/De-ra-z-floricultura/aprende-de-raiz/${topic.slug}`,
  };

  const visibleTopics = LEARN_TOPICS.filter((item) => item.isVisible);
  const topicIndex = visibleTopics.findIndex((item) => item.slug === topic.slug);
  const nextTopic = topicIndex >= 0 && visibleTopics.length > 1
    ? visibleTopics[(topicIndex + 1) % visibleTopics.length]
    : null;

  return (
    <div className="guide-reader-page">
      <SEO
        title={topic.seoTitle || `${topic.title} | Guía De Raíz Floricultura`}
        description={topic.seoDescription || `${topic.summary} - Consejos prácticos adaptados a Uruguay.`}
        path={`/aprende-de-raiz/${topic.slug}`}
        jsonLd={articleJsonLd}
      />

      {/* Guide Header / Hero */}
      <header className="guide-header">
        <div className="container guide-header-container">
          <div className="guide-breadcrumb">
            <Link to="/aprende-de-raiz">Aprende de Raíz</Link>
            <ChevronRight size={12} />
            <span>Fichas Botánicas</span>
            <ChevronRight size={12} />
            <span className="current">{topic.title}</span>
          </div>

          <div className="guide-title-area">
            <span className="badge badge-green mb-3">{topic.tag} • Guía de Cultivo</span>
            <h1 className="guide-title">{topic.title}</h1>
            <p className="guide-subtitle">
              {topic.intro || topic.summary}
            </p>
          </div>

          <div className="guide-meta">
            <div className="meta-item">
              <User size={16} />
              <span>Por <strong>De Raíz Botánica</strong></span>
            </div>
            <div className="meta-item">
              <Clock size={16} />
              <span>{topic.readTime} de lectura</span>
            </div>
            <div className="meta-item">
              <Compass size={16} />
              <span>Clima de Uruguay</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Cover Image */}
      <section className="guide-cover-section container">
        <div className="guide-cover-wrap">
          <img src={topic.image} alt={topic.title} className="guide-cover-img" />
          <div className="guide-cover-overlay">
            <div className="botanical-name">
              <span>Temática:</span>
              <strong>{topic.tag}</strong>
            </div>
            <div className="botanical-family">
              <span>Área:</span>
              <strong>Biblioteca Viva</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Content Layout */}
      <section className="guide-content-layout container">
        {/* Main Text Content */}
        <article className="guide-main-article">
          
          {topic.sections.map((section) => (
            <section key={section.id} id={section.id} className="guide-section">
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Seasons Care Grid (if available) */}
          {topic.seasonNotes && (
            <section id="temporada" className="guide-section">
              <h2>Ajustes y cuidados por estación</h2>
              <div className="seasons-care-grid">
                {topic.seasonNotes.map((season, idx) => (
                  <div 
                    key={idx} 
                    className={`season-care-card ${
                      season.season.toLowerCase().includes('verano') || 
                      season.season.toLowerCase().includes('cálida') || 
                      season.season.toLowerCase().includes('primavera') 
                        ? 'summer' : 'winter'
                    }`}
                  >
                    <div className="season-badge">{season.season}</div>
                    <ul>
                      {season.notes?.map((note, noteIdx) => (
                        <li key={noteIdx}>{note}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interactive Widget: Symptom Diagnosis */}
          {symptoms && symptoms.length > 0 && activeSymptom && (
            <section id="diagnostico" className="guide-section diagnostic-widget card">
              <div className="widget-header">
                <Activity className="widget-icon" />
                <div>
                  <h3>Widget Interactivo: Diagnóstico de Problemas</h3>
                  <p>Identificá los síntomas visuales en tu planta y aplicá la solución recomendada por De Raíz.</p>
                </div>
              </div>

              <div className="widget-content">
                <div className="symptoms-list">
                  {symptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      type="button"
                      className={`symptom-btn ${activeSymptom.id === symptom.id ? 'is-active' : ''}`}
                      onClick={() => setActiveSymptom(symptom)}
                    >
                      <span>{symptom.label}</span>
                      <ChevronRight size={14} />
                    </button>
                  ))}
                </div>

                <div className="diagnosis-result-card">
                  <div className="result-section">
                    <span className="result-label text-warning">
                      <AlertTriangle size={14} /> Síntoma observado:
                    </span>
                    <p className="result-text symptom-desc">{activeSymptom.symptom}</p>
                  </div>

                  <div className="result-section">
                    <span className="result-label text-danger">
                      <Info size={14} /> Causa probable:
                    </span>
                    <p className="result-text cause-desc">{activeSymptom.cause}</p>
                  </div>

                  <div className="result-section solution-section">
                    <span className="result-label text-success">
                      <CheckCircle size={14} /> Solución recomendada:
                    </span>
                    <p className="result-text solution-desc">{activeSymptom.solution}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Related Catalog Items (Cards style) */}
          {topic.relatedCatalog && topic.relatedCatalog.length > 0 && (
            <section id="productos" className="guide-section products-integration">
              <div className="section-header-inline">
                <h2>Insumos Recomendados en Catálogo</h2>
                <p>Encontrá plantas, macetas y tierra recomendada para este tema en nuestra tienda online.</p>
              </div>
              <div className="catalog-links-grid">
                {topic.relatedCatalog.map((linkItem, idx) => (
                  <a key={idx} href={linkItem.to} className="catalog-link-card card">
                    <div className="catalog-link-copy">
                      <h4>{linkItem.label}</h4>
                      <p>Explorar opciones en la tienda de De Raíz</p>
                    </div>
                    <ArrowUpRight size={20} className="arrow-icon" />
                  </a>
                ))}
              </div>
            </section>
          )}

        </article>

        {/* Sidebar Column */}
        <aside className="guide-sidebar">
          {/* Plant technical sheet (Ficha Técnica) */}
          {techSpecs && (
            <div className="sidebar-widget technical-sheet card">
              <h3><Bookmark size={16} /> Ficha Técnica</h3>
              <div className="tech-grid">
                <div className="tech-item">
                  <Sun size={20} />
                  <div>
                    <strong>Iluminación</strong>
                    <span>{techSpecs.light}</span>
                  </div>
                </div>

                <div className="tech-item">
                  <Droplet size={20} />
                  <div>
                    <strong>Riego</strong>
                    <span>{techSpecs.water}</span>
                  </div>
                </div>

                <div className="tech-item">
                  <Sprout size={20} />
                  <div>
                    <strong>Humedad</strong>
                    <span>{techSpecs.humidity}</span>
                  </div>
                </div>

                <div className="tech-item">
                  <Thermometer size={20} />
                  <div>
                    <strong>Temperatura</strong>
                    <span>{techSpecs.temp}</span>
                  </div>
                </div>
              </div>

              <div className="toxicity-warning">
                <HeartCrack size={18} />
                <div>
                  <strong>Tóxica para mascotas</strong>
                  <span>{techSpecs.toxicity}</span>
                </div>
              </div>
            </div>
          )}

          {/* Table of Contents */}
          <div className="sidebar-widget toc-widget card">
            <h3>Índice de la Guía</h3>
            <ul className="toc-list">
              {topic.sections.map((section) => (
                <li key={section.id}>
                  <button 
                    type="button" 
                    className={activeSection === section.id ? 'is-active' : ''}
                    onClick={() => handleScrollTo(section.id)}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
              {topic.seasonNotes && (
                <li>
                  <button 
                    type="button" 
                    className={activeSection === 'temporada' ? 'is-active' : ''}
                    onClick={() => handleScrollTo('temporada')}
                  >
                    Cuidado por Estación
                  </button>
                </li>
              )}
              {symptoms && symptoms.length > 0 && (
                <li>
                  <button 
                    type="button" 
                    className={activeSection === 'diagnostico' ? 'is-active' : ''}
                    onClick={() => handleScrollTo('diagnostico')}
                  >
                    Diagnóstico de Problemas
                  </button>
                </li>
              )}
              {topic.relatedCatalog && topic.relatedCatalog.length > 0 && (
                <li>
                  <button 
                    type="button" 
                    className={activeSection === 'productos' ? 'is-active' : ''}
                    onClick={() => handleScrollTo('productos')}
                  >
                    Insumos Recomendados
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Direct WhatsApp Advice */}
          <div className="sidebar-widget card chat-advice-widget">
            <h4>¿Necesitás ayuda personalizada?</h4>
            <p>Escribinos por WhatsApp enviando una foto de tu planta y te asesoramos gratis.</p>
            <a href={generateWaLink(waMessage)} target="_blank" rel="noreferrer" className="btn btn-primary w-full">
              <MessageCircle size={16} />
              Hablar con un experto
            </a>
          </div>
        </aside>
      </section>

      {/* Next Guide Recommendation */}
      {nextTopic && (
        <section className="guide-next-read container">
          <div className="next-read-card card">
            <span className="section-label">Siguiente lectura recomendada</span>
            <div className="next-read-grid">
              <div className="next-read-copy">
                <h3>{nextTopic.title}</h3>
                <p>{nextTopic.summary}</p>
                <Link to={`/aprende-de-raiz/${nextTopic.slug}`} className="btn btn-secondary">
                  Leer siguiente guía <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="next-read-img-wrap">
                <img src={nextTopic.image} alt={nextTopic.title} loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back to Biblioteca */}
      <section className="guide-bottom-nav container">
        <Link to="/aprende-de-raiz" className="btn btn-secondary">
          <ArrowLeft size={16} />
          Volver a Aprende de Raíz
        </Link>
      </section>
    </div>
  );
};

export default LearnTopic;
