import React, { useEffect } from 'react';
import { X, Sun, Droplets, Leaf, MessageCircle } from 'lucide-react';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!product) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
              {product.light !== "N/A" && (
                <div className="modal-attribute">
                  <div className="modal-icon-wrapper"><Sun size={20} color="var(--color-primary)"/></div>
                  <div>
                    <strong>Luz</strong>
                    <p>{product.light}</p>
                  </div>
                </div>
              )}
              {product.water !== "N/A" && (
                <div className="modal-attribute">
                  <div className="modal-icon-wrapper"><Droplets size={20} color="var(--color-primary)"/></div>
                  <div>
                    <strong>Riego</strong>
                    <p>{product.water}</p>
                  </div>
                </div>
              )}
              {product.difficulty !== "N/A" && (
                <div className="modal-attribute">
                  <div className="modal-icon-wrapper"><Leaf size={20} color="var(--color-primary)"/></div>
                  <div>
                    <strong>Dificultad</strong>
                    <p>{product.difficulty}</p>
                  </div>
                </div>
              )}
            </div>

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
