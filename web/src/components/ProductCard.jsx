import { memo } from 'react';
import { Sun, Droplets, Ruler, Package, Sprout, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const getAttributeIcon = (type) => {
  switch (type) {
    case 'luz':          return <Sun size={15} />;
    case 'riego':        return <Droplets size={15} />;
    case 'tamano':       return <Ruler size={15} />;
    case 'material':     return <Package size={15} />;
    case 'presentacion': return <Package size={15} />;
    case 'uso':          return <Sprout size={15} />;
    default:             return <Sprout size={15} />;
  }
};

const ProductCard = ({ product, onClick }) => {
  const { name, category, image, attributes, price, isPetFriendly, section } = product;
  const { addToCart } = useCart();
  const difficulty = attributes.find((attr) => attr.type === 'dificultad')?.value;
  const difficultyTone = difficulty?.toLowerCase() || 'media';

  // Extract main attributes for the 2-column grid
  const mainAttrs = section === 'plantas'
    ? [
        attributes.find(a => a.type === 'luz'),
        attributes.find(a => a.type === 'riego')
      ].filter(Boolean)
    : attributes.filter(a => a.type !== 'dificultad').slice(0, 2);

  return (
    <article className="product-card" onClick={() => onClick(product)}>
      {/* Category badge */}
      <span className="product-cat-badge">{category}</span>

      {/* Arched image wrap */}
      <div className="product-image-wrap">
        <img
          src={image}
          alt={`Planta ${name} de categoria ${category} en De Raiz`}
          className="product-image"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </div>

      {/* Tags row */}
      <div className="product-tags">
        {difficulty && (
          <span className={`product-tag difficulty is-${difficultyTone}`}>
            {difficulty}
          </span>
        )}
        {isPetFriendly && (
          <span className="product-tag pet-friendly">
            🐾 Apto Mascotas
          </span>
        )}
      </div>

      {/* Info Body */}
      <div className="product-body">
        {/* Title and Price */}
        <div className="product-header-row">
          <h3 className="product-name" title={name}>{name}</h3>
          {price && price !== "Consultar" && (
            <span className="product-price">{price}</span>
          )}
        </div>

        <p className="product-subtitle">
          {section === 'plantas' ? 'Vivero De Raíz' : 'Cuidado & Insumos'}
        </p>

        <hr className="product-divider" />

        {/* 2-Column Attributes Grid */}
        <div className="product-attributes-grid">
          {mainAttrs.map((attr, idx) => (
            <div key={idx} className="product-attribute-item">
              {getAttributeIcon(attr.type)}
              <div className="product-attribute-info">
                <span className="product-attribute-label">
                  {attr.type === 'luz' ? 'Luz' : attr.type === 'riego' ? 'Riego' : attr.type === 'presentacion' ? 'Envase' : 'Uso'}
                </span>
                <span className="product-attribute-value" title={attr.value}>
                  {attr.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with full button */}
        <div className="product-footer">
          <button
            className="product-add-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            aria-label={`Agregar ${name} a mi consulta`}
          >
            <ShoppingCart size={15} /> Agregar
          </button>
        </div>
      </div>
    </article>
  );
};

export default memo(ProductCard);
