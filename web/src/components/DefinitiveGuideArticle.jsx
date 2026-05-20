import { AlertCircle, CheckCircle2, Leaf, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import './DefinitiveGuideArticle.css';

const DefinitiveGuideArticle = ({ topic }) => {
  const tocItems = [
    { id: 'luz', label: '1. Luz' },
    { id: 'riego', label: '2. Riego' },
    { id: 'suelo', label: '3. Suelo y drenaje' },
    { id: 'problemas', label: '4. Problemas frecuentes' },
    { id: 'cta-final', label: '5. Asesoramiento final' },
  ];

  return (
    <article className="def-guide" itemScope itemType="https://schema.org/Article">
      {/* Schema hook: Article / FAQPage JSON-LD can be injected from parent */}
      <header className="def-guide-hero card">
        <div className="def-guide-hero-copy">
          <h1>{topic.heroTitle || topic.title.toUpperCase()}</h1>
          <h2>{topic.heroSubtitle || 'Soluciones a problemas comunes'}</h2>
          <p>{topic.intro}</p>
        </div>
        <div className="def-guide-hero-image" aria-hidden="true">
          <img src={topic.image} alt={topic.heroImageAlt || topic.title} loading="lazy" />
        </div>
      </header>

      <div className="def-guide-layout">
        <details className="def-guide-toc-mobile card">
          <summary>TABLA DE CONTENIDOS</summary>
          <ul>
            {tocItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </details>

        <aside className="def-guide-sidebar" aria-label="Barra lateral de navegacion">
          <nav className="def-guide-toc card" aria-label="Tabla de contenidos">
            <h3>TABLA DE CONTENIDOS</h3>
            <ul>
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="def-guide-main" aria-label="Contenido principal de la guia">
          {topic.sections.map((section) => (
            <section key={section.id} id={section.id} className="def-guide-section card" aria-labelledby={`heading-${section.id}`}>
              <h2 id={`heading-${section.id}`}>{section.title.toUpperCase()}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.id === 'luz' && topic.showLightDiagram !== false && (
                <div className="def-guide-diagram" role="img" aria-label="Espacio para infografia de luz ideal en interiores">
                  <Sun size={20} />
                  <span>Placeholder de infografia: mapa visual de luz (ideal / aceptable / no recomendado)</span>
                </div>
              )}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section id="problemas" className="def-guide-section card" aria-labelledby="heading-problemas">
            <h2 id="heading-problemas">4. PROBLEMAS FRECUENTES Y SOLUCIONES</h2>
            <div className="def-problem-grid">
              {topic.problems.map((problem) => (
                <article key={problem.title} className="def-problem-card">
                  <Leaf size={16} />
                  <h3>{problem.title.toUpperCase()}</h3>
                  <p>{problem.text || problem.description}</p>
                  {problem.solution && <p><strong>Solucion:</strong> {problem.solution}</p>}
                </article>
              ))}
            </div>
          </section>

          <section id="cta-final" className="def-guide-section card" aria-labelledby="heading-cta-final">
            <h2 id="heading-cta-final">5. ASESORAMIENTO FINAL</h2>
            <p>{topic.ctaText}</p>
            <a href={generateWaLink(topic.ctaWaMessage || WA_MESSAGES.general)} target="_blank" rel="noreferrer" className="btn btn-primary">
              <MessageCircle size={18} />
              {topic.ctaButton}
            </a>
          </section>

          {topic.faqs?.length > 0 && (
            <section id="faqs" className="def-guide-section card" aria-labelledby="heading-faqs">
              <h2 id="heading-faqs">PREGUNTAS FRECUENTES</h2>
              <div className="def-faq-list">
                {topic.faqs.map((faq) => (
                  <article key={faq.question} className="def-faq-item">
                    <h3><AlertCircle size={16} /> {faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {topic.relatedGuides?.length > 0 && (
            <section className="def-guide-section card" aria-labelledby="heading-related">
              <h2 id="heading-related">GUIAS RELACIONADAS</h2>
              <div className="def-related-grid">
                {topic.relatedGuides.map((guide) => (
                  <Link key={guide.slug} to={`/aprende-de-raiz/${guide.slug}`} className="def-related-card">
                    <div className="def-related-image" aria-hidden="true"></div>
                    <div className="def-related-content">
                      <h4>{guide.title}</h4>
                      <p>{guide.summary}</p>
                      <span><CheckCircle2 size={14} /> Ver guia</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </article>
  );
};

export default DefinitiveGuideArticle;
