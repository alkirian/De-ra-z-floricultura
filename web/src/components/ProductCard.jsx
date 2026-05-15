import { Sun, Droplets, Ruler, Package, Sprout, ArrowUpRight } from 'lucide-react';
import './ProductCard.css';

const getAttributeIcon = (type) => {
  switch (type) {
    case 'luz':      return <Sun size={13} />;
    case 'riego':    return <Droplets size={13} />;
    case 'tamano':   return <Ruler size={13} />;
    case 'material': return <Package size={13} />;
    default:         return <Sprout size={13} />;
  }
};

const ProductCard = ({ product, onClick }) => {
  const { name, category, image, attributes, price } = product;

  return (
    <article className="product-card" onClick={() => onClick(product)}>
      {/* Imagen */}
      <div className="product-image-wrap">
        <span className="product-section-glow" aria-hidden="true"></span>
        <span className="product-cat-badge">{category}</span>
        <img src={image} alt={name} className="product-image" loading="lazy" />
      </div>

      {/* Info */}
      <div className="product-body">
        <span className="product-price">{price}</span>
        <h3 className="product-name">{name}</h3>

        <div className="product-attrs">
          {attributes.slice(0, 2).map((attr, idx) => (
            <span key={idx} className="product-attr">
              {getAttributeIcon(attr.type)}
              {attr.value}
            </span>
          ))}
        </div>

        <button className="product-btn">
          Ver detalle <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
