import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import './Testimonials.css';

// Testimonios ficticios temporales. Reemplazar por reseñas reales cuando estén disponibles.
const FAKE_TESTIMONIALS = [
  {
    id: 1,
    name: "Mariana R.",
    location: "Las Piedras",
    text: "Me ayudaron a elegir una planta para mi apartamento con poca luz y me explicaron cómo cuidarla. Muy buena atención.",
    rating: 5
  },
  {
    id: 2,
    name: "Andrés P.",
    location: "Canelones",
    text: "Fui buscando un regalo y me recomendaron una planta con maceta preciosa. Quedó muy lindo y la atención fue súper amable.",
    rating: 5
  },
  {
    id: 3,
    name: "Laura M.",
    location: "Las Piedras",
    text: "Me gustó que no solo venden plantas, también te asesoran según el espacio que tengas. Volvería a comprar.",
    rating: 4
  },
  {
    id: 4,
    name: "Sofía G.",
    location: "Progreso",
    text: "Compré flores y una planta para regalar. Me ayudaron a armar algo simple pero muy lindo.",
    rating: 5
  },
  {
    id: 5,
    name: "Carla V.",
    location: "La Paz",
    text: "Tenían variedad de plantas y me explicaron cada cuánto regarlas. Para alguien que está empezando, eso ayuda un montón.",
    rating: 4
  },
  {
    id: 6,
    name: "Martín S.",
    location: "Las Piedras",
    text: "Muy buena atención y lindas opciones para jardín. Me orientaron con tierra, maceta y cuidados básicos.",
    rating: 5
  }
];

const AUTO_DELAY = 5000; // ms entre cambios automáticos

const StarRating = ({ rating }) => (
  <div className="testimonial-stars" aria-label={`${rating} de 5 estrellas`}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={15}
        fill={i < rating ? "var(--color-accent)" : "none"}
        color={i < rating ? "var(--color-accent)" : "var(--color-border)"}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const total = FAKE_TESTIMONIALS.length;

  const goTo = useCallback((index) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setActive((index + total) % total);
      setFading(false);
    }, 350); // match CSS fade duration
  }, [fading, total]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, AUTO_DELAY);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  // Progress bar reset on change
  const progressKey = `${active}-${paused}`;

  const t = FAKE_TESTIMONIALS[active];

  return (
    <section className="testimonials">
      <div className="container">

        <div className="testimonials-header">
          <h2 className="testimonials-title">Lo que dicen nuestros clientes</h2>
          <p className="testimonials-subtitle">
            Opiniones de quienes encontraron plantas, flores y asesoramiento en De Raíz.
          </p>
        </div>

        <div
          className="testimonials-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Card */}
          <div className={`testimonial-card glass-panel${fading ? ' is-fading' : ''}`}>
            <StarRating rating={t.rating} />
            <blockquote className="testimonial-text">
              "{t.text}"
            </blockquote>
            <div className="testimonial-author">
              <span className="author-name">{t.name}</span>
              <span className="author-sep">·</span>
              <span className="author-location">{t.location}</span>
            </div>
          </div>

          {/* Progress bar */}
          {!paused && (
            <div className="testimonial-progress">
              <div
                key={progressKey}
                className="testimonial-progress-bar"
                style={{ animationDuration: `${AUTO_DELAY}ms` }}
              />
            </div>
          )}

          {/* Controls */}
          <div className="testimonial-controls">
            <button
              className="carousel-btn"
              onClick={() => { setPaused(true); prev(); }}
              aria-label="Testimonio anterior"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="carousel-dots">
              {FAKE_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === active ? ' is-active' : ''}`}
                  onClick={() => { setPaused(true); goTo(i); }}
                  aria-label={`Ver testimonio ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="carousel-btn"
              onClick={() => { setPaused(true); next(); }}
              aria-label="Testimonio siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="testimonials-cta">
          <p>¿Querés que te ayudemos a elegir una planta?</p>
          <a
            href={generateWaLink(WA_MESSAGES.testimonios)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            <MessageCircle size={18} style={{ marginRight: '8px' }} />
            Consultar por WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
