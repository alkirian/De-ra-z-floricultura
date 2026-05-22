import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, MessageCircle } from 'lucide-react';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import { LEARN_TOPICS } from '../data/learnTopics';
import SEO from '../components/SEO';
import './LearnRoot.css';

const LearnRoot = () => {
  const visibleTopics = useMemo(
    () => LEARN_TOPICS.filter((topic) => topic.isVisible),
    [],
  );

  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('Todos');

  const tags = useMemo(
    () => ['Todos', ...Array.from(new Set(visibleTopics.map((topic) => topic.tag)))],
    [visibleTopics],
  );

  const filteredTopics = useMemo(() => {
    const cleanSearch = search.trim().toLowerCase();
    return visibleTopics.filter((topic) => {
      const matchTag = activeTag === 'Todos' || topic.tag === activeTag;
      const matchSearch =
        cleanSearch.length === 0
        || topic.title.toLowerCase().includes(cleanSearch)
        || topic.summary.toLowerCase().includes(cleanSearch);
      return matchTag && matchSearch;
    });
  }, [activeTag, search, visibleTopics]);

  return (
    <div className="learn-page">
      <SEO
        title="Guías de cuidado de plantas en Uruguay | Aprende de Raíz"
        description="Biblioteca botánica gratuita de De Raíz. Aprendé sobre riego por estación en Uruguay, sustratos recomendados, plagas comunes y macetas ideales."
        path="/aprende-de-raiz"
      />
      <section className="learn-hero section-padding--sm" style={{ paddingTop: '140px' }}>
        <div className="container text-center">
          <span className="section-label">Biblioteca viva</span>
          <h1 className="page-title">Aprende de Raiz</h1>
          <p className="page-subtitle mx-auto" style={{ maxWidth: '740px' }}>
            Elegi un tema y entra a la guia completa con imagenes, pasos claros y consejos
            adaptados al clima de Uruguay.
          </p>
          <div className="title-underline"></div>
        </div>
      </section>

      <section className="section-padding" style={{ background: 'var(--crema)' }}>
        <div className="container">
          <div className="learn-toolbar card">
            <div className="learn-search-wrap">
              <Search size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                type="text"
                placeholder="Buscar tema: riego, macetas, invierno..."
              />
            </div>
            <div className="learn-tag-row">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`learn-tag ${activeTag === tag ? 'is-active' : ''}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="learn-topic-grid">
            {filteredTopics.map((topic) => (
              <Link key={topic.slug} to={`/aprende-de-raiz/${topic.slug}`} className="learn-topic-card">
                <div className="learn-topic-image-wrap">
                  <img src={topic.image} alt={topic.title} className="learn-topic-image" loading="lazy" />
                  <span className="learn-topic-tag">{topic.tag}</span>
                </div>
                <div className="learn-topic-body">
                  <h3>{topic.title}</h3>
                  <p>{topic.summary}</p>
                  <span className="learn-topic-link">
                    Ver guia completa <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <div className="learn-empty card">
              <h3>No encontramos temas con esa busqueda</h3>
              <p>Proba otro termino o volve al filtro "Todos".</p>
            </div>
          )}

          <div className="learn-help card">
            <h3>No sabes por donde empezar?</h3>
            <p>Escribinos y te recomendamos un tema segun tu planta y tu espacio.</p>
            <a href={generateWaLink(WA_MESSAGES.ayudaElegir)} target="_blank" rel="noreferrer" className="btn btn-primary">
              <MessageCircle size={18} />
              Quiero ayuda por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnRoot;
