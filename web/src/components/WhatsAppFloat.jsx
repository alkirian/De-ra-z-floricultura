import { MessageCircle } from 'lucide-react';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import './WhatsAppFloat.css';

const WhatsAppFloat = () => {
  return (
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
  );
};

export default WhatsAppFloat;
