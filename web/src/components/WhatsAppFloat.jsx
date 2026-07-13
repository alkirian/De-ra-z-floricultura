import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import './WhatsAppFloat.css';

const WhatsAppFloat = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return undefined;
    const timer = window.setTimeout(() => {
      setShowBubble(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [dismissed]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 120) {
        setShowBubble(prev => prev ? false : prev);
      } else {
        setShowBubble(prev => !prev ? true : prev);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {showBubble && !dismissed && (
        <div className="wa-bubble" role="status" aria-live="polite">
          <p>¿Buscás alguna planta para tu espacio? Consultanos por aquí.</p>
          <button type="button" onClick={() => { setShowBubble(false); setDismissed(true); }} aria-label="Cerrar globo">
            <X size={14} />
          </button>
        </div>
      )}
      <a
        href={generateWaLink(WA_MESSAGES.general)}
        target="_blank"
        rel="noreferrer"
        className="wa-float"
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </a>
    </>
  );
};

export default WhatsAppFloat;
