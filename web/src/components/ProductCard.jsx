import { memo } from 'react';
import { Sun, Droplets, Ruler, Package, Sprout, ArrowRight } from 'lucide-react';
import './ProductCard.css';

const getAttributeIcon = (type) => {
  switch (type) {
    case 'luz':      return <Sun size={15} />;
    case 'riego':    return <Droplets size={15} />;
    case 'tamano':   return <Ruler size={15} />;
    case 'material': return <Package size={15} />;
    default:         return <Sprout size={15} />;
  }
};

const ProductCard = ({ product, onClick }) => {
  const { name, category, image, attributes, price } = product;

  return (
    <article className="product-card" onClick={() => onClick(product)}>
      {/* Imagen con arco editorial */}
      <div className="product-image-wrap">
        <span className="product-cat-badge">{category}</span>
        <img src={image} alt={name} className="product-image" loading="lazy" decoding="async" fetchPriority="low" />
      </div>

      {/* Info */}
      <div className="product-body">
        <h3 className="product-name">{name}</h3>
        
        {price !== "Consultar" && (
          <div className="product-price-wrap">
            <span className="product-price">{price}</span>
          </div>
        )}

        <div className="product-attrs">
          {attributes.slice(0, 2).map((attr, idx) => (
            <span key={idx} className="product-attr">
              {getAttributeIcon(attr.type)}
              {attr.value}
            </span>
          ))}
        </div>

        <button className="product-btn">
          Ver detalle <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
};

export default memo(ProductCard);
