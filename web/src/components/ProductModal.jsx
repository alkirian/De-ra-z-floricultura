import React, { useEffect } from 'react';
import { X, Sun, Droplets, Leaf, MessageCircle, Ruler, Package, Sprout } from 'lucide-react';
import { generateWaLink, WA_MESSAGES } from '../data/mockData';
import './ProductModal.css';

const getAttributeIcon = (type) => {
  switch (type) {
    case 'luz':          return <Sun size={20} color="var(--color-primary)" />;
    case 'riego':        return <Droplets size={20} color="var(--color-primary)" />;
    case 'dificultad':   return <Leaf size={20} color="var(--color-primary)" />;
    case 'tamano':       return <Ruler size={20} color="var(--color-primary)" />;
    case 'material':     return <Package size={20} color="var(--color-primary)" />;
    case 'presentacion': return <Package size={20} color="var(--color-primary)" />;
    case 'uso':          return <Sprout size={20} color="var(--color-primary)" />;
    default:             return <Sprout size={20} color="var(--color-primary)" />;
  }
};

const getAttributeLabel = (type) => {
  switch (type) {
    case 'luz':          return 'Luz';
    case 'riego':        return 'Riego';
    case 'dificultad':   return 'Dificultad';
    case 'tamano':       return 'Tamaño';
    case 'material':     return 'Material';
    case 'presentacion': return 'Envase';
    case 'uso':          return 'Uso';
    default:             return type.charAt(0).toUpperCase() + type.slice(1);
  }
};

const ProductModal = ({ product, onClose, actionButton }) => {
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

  const isPetFriendly = product.isPetFriendly;
  const attributes = product.attributes || [];

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
            {product.price && product.price !== "Consultar" && (
              <p className="modal-price">{product.price}</p>
            )}
            
            <p className="modal-description">{product.description}</p>
            
            {attributes.length > 0 && (
              <div className="modal-attributes-list">
                {attributes.map((attr, idx) => (
                  <div key={idx} className="modal-attribute">
                    <div className="modal-icon-wrapper">
                      {getAttributeIcon(attr.type)}
                    </div>
                    <div>
                      <strong>{getAttributeLabel(attr.type)}</strong>
                      <p>{attr.value}</p>
                    </div>
                  </div>
                ))}
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
            )}

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
              {actionButton ? (
                actionButton
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
