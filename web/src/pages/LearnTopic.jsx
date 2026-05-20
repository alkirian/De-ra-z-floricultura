import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { generateWaLink } from '../data/mockData';
import { getLearnTopicBySlug, LEARN_TOPICS } from '../data/learnTopics';
import SEO from '../components/SEO';
import BotanicaLuzUruguay from '../components/BotanicaLuzUruguay';
import DefinitiveGuideArticle from '../components/DefinitiveGuideArticle';
import './LearnTopic.css';

const LearnTopic = () => {
  const { topicSlug } = useParams();
  const topic = getLearnTopicBySlug(topicSlug || '');

  if (!topic) {
    return (
      <div className="learn-topic-page">
        <section className="section-padding" style={{ paddingTop: '150px' }}>
          <div className="container">
            <div className="learn-topic-not-found card">
              <h1>Tema no encontrado</h1>
              <p>Volve a Aprende de Raiz para elegir otro tema.</p>
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

  const isCustomTopic = topic.slug === 'luz-y-ubicacion' || topic.slug === 'guia-ficus-lyrata';

  return (
    <div className="learn-topic-page">
      <SEO
        title={`${topic.title} | Guia De Raiz Floricultura`}
        description={`${topic.summary} - Aprende consejos practicos adaptados al clima de Uruguay de la mano de De Raiz.`}
        path={`/aprende-de-raiz/${topic.slug}`}
        jsonLd={articleJsonLd}
      />
      {isCustomTopic ? (
        <header className="learn-topic-minimal-header container" style={{ paddingTop: '110px', paddingBottom: '10px' }}>
          <Link to="/aprende-de-raiz" className="learn-topic-back">
            <ArrowLeft size={14} /> Volver a Aprende de Raiz
          </Link>
        </header>
      ) : (
        <section className="learn-topic-hero section-padding--sm" style={{ paddingTop: '140px' }}>
          <div className="container learn-topic-hero-grid">
            <div>
              <Link to="/aprende-de-raiz" className="learn-topic-back">
                <ArrowLeft size={14} /> Volver a Aprende de Raiz
              </Link>
              <span className="badge badge-terra">{topic.tag}</span>
              <h1>{topic.title}</h1>
              <p>{topic.intro}</p>
              <div className="learn-topic-bullets">
                {topic.highlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="learn-topic-cover-wrap card">
              <img src={topic.image} alt={topic.title} className="learn-topic-cover" />
              <p>Tiempo de lectura estimado: <strong>{topic.readTime}</strong></p>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding" style={{ background: 'var(--crema)', paddingTop: isCustomTopic ? '10px' : undefined }}>
        <div className="container">
          {isCustomTopic ? (
            <div className="learn-topic-custom-container">
              {topic.slug === 'luz-y-ubicacion' ? (
                <BotanicaLuzUruguay />
              ) : (
                <DefinitiveGuideArticle topic={topic} />
              )}
            </div>
          ) : (
            <div className="learn-topic-layout">
              <div className="learn-topic-main">
                {topic.sections.map((section) => (
                  <article key={section.id} id={section.id} className="learn-topic-section card">
                    <h2>{section.title}</h2>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets && (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}

                {topic.seasonNotes && (
                  <article id="ajustes-estacion" className="learn-topic-section card">
                    <h2>Ajustes por estacion</h2>
                    <div className="learn-season-grid">
                      {topic.seasonNotes.map((season) => (
                        <div key={season.season} className="learn-season-card">
                          <h3>{season.season}</h3>
                          <ul>
                            {season.notes.map((note) => (
                              <li key={note}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </article>
                )}
              </div>

              <aside className="learn-topic-side card">
                <h3>Indice rapido</h3>
                <ul>
                  {topic.sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>{section.title}</a>
                    </li>
                  ))}
                  {topic.seasonNotes && (
                    <li>
                      <a href="#ajustes-estacion">Ajustes por estacion</a>
                    </li>
                  )}
                </ul>

                <div className="learn-topic-side-block">
                  <h4>Relacionado en catalogo</h4>
                  {topic.relatedCatalog.map((linkItem) => (
                    <Link key={linkItem.to} to={linkItem.to} className="learn-topic-side-link">
                      {linkItem.label} <ArrowRight size={14} />
                    </Link>
                  ))}
                </div>

                <a href={generateWaLink(waMessage)} target="_blank" rel="noreferrer" className="btn btn-primary w-full">
                  <MessageCircle size={18} />
                  Quiero ayuda con este tema
                </a>
              </aside>
            </div>
          )}
        </div>

        {nextTopic && (
          <div className="learn-next-card card">
            <span className="section-label">Siguiente lectura recomendada</span>
            <div className="learn-next-grid">
              <div>
                <h3>{nextTopic.title}</h3>
                <p>{nextTopic.summary}</p>
                <Link to={`/aprende-de-raiz/${nextTopic.slug}`} className="btn btn-secondary">
                  Leer siguiente guia <ArrowRight size={16} />
                </Link>
              </div>
              <img src={nextTopic.image} alt={nextTopic.title} loading="lazy" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default LearnTopic;
