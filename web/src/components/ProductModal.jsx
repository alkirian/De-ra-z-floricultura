import React, { useEffect } from 'react';
import { X, Sun, Droplets, Leaf, MessageCircle } from 'lucide-react';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.documentElement.classList.add('scroll-locked');
    document.body.classList.add('scroll-locked');
    return () => {
      document.documentElement.classList.remove('scroll-locked');
      document.body.classList.remove('scroll-locked');
    };
  }, []);

  if (!product) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const light = product.light || product.attributes?.find(a => a.type === 'luz')?.value || "N/A";
  const water = product.water || product.attributes?.find(a => a.type === 'riego')?.value || "N/A";
  const difficulty = product.difficulty || product.attributes?.find(a => a.type === 'dificultad')?.value || "N/A";
  const isPetFriendly = product.isPetFriendly;

  return (
    <div className="modal-backdrop animate-fade-in" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">
          <X size={24} />
        </button>
        
        <div className="modal-grid">
          <div className="modal-image-col">
            <img src={product.image} alt={product.name} className="modal-image" />
          </div>
          
          <div className="modal-info-col">
            <span className="badge">{product.category}</span>
            <h2 className="modal-title">{product.name}</h2>
            
            <p className="modal-description">{product.description}</p>
            
            <div className="modal-attributes-list">
              {light !== "N/A" && (
                <div className="modal-attribute">
                  <div className="modal-icon-wrapper"><Sun size={20} color="var(--color-primary)"/></div>
                  <div>
                    <strong>Luz</strong>
                    <p>{light}</p>
                  </div>
                </div>
              )}
              {water !== "N/A" && (
                <div className="modal-attribute">
                  <div className="modal-icon-wrapper"><Droplets size={20} color="var(--color-primary)"/></div>
                  <div>
                    <strong>Riego</strong>
                    <p>{water}</p>
                  </div>
                </div>
              )}
              {difficulty !== "N/A" && (
                <div className="modal-attribute">
                  <div className="modal-icon-wrapper"><Leaf size={20} color="var(--color-primary)"/></div>
                  <div>
                    <strong>Dificultad</strong>
                    <p>{difficulty}</p>
                  </div>
                </div>
              )}
              {isPetFriendly && (
                <div className="modal-attribute pet-friendly-attr">
                  <div className="modal-icon-wrapper pet-friendly-icon-wrapper">
                    <span className="pet-icon">🐾</span>
                  </div>
                  <div>
                    <strong>Mascotas</strong>
                    <p className="pet-friendly-text">Seguro para perros y gatos</p>
                  </div>
                </div>
              )}
            </div>

            {(product.careTips || product.pests) && (
              <div className="modal-extra-info">
                {product.careTips && (
                  <div className="info-block">
                    <h4 className="info-title">✨ Tips de Cuidado</h4>
                    <p className="info-text">{product.careTips}</p>
                  </div>
                )}
                {product.pests && (
                  <div className="info-block pests-block">
                    <h4 className="info-title">🐛 Posibles Plagas</h4>
                    <p className="info-text">{product.pests}</p>
                  </div>
                )}
              </div>
            )}

            <div className="modal-actions">
              <a 
                href={generateWaLink(WA_MESSAGES.producto(product.name))} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary w-full"
              >
                <MessageCircle size={20} style={{marginRight: '8px'}} />
                Consultar por este producto
              </a>
              <p className="modal-hint">Abre WhatsApp con un mensaje automático</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
