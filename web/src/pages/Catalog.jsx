import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES, generateWaLink, WA_MESSAGES } from '../data/mockData';
import { Search, X, MessageCircle } from 'lucide-react';
import './Catalog.css';

const MAIN_FILTERS = [
  { id: 'plantas', label: '🌱 Plantas' },
  { id: 'macetas', label: '🪴 Macetas' },
  { id: 'insumos', label: '🛠️ Insumos' },
];

const INSUMOS_SUBCATEGORIES = CATEGORIES.insumos.filter((cat) => cat !== 'Macetas');

const getCategoriesByMainFilter = (filter) => {
  if (filter === 'plantas') return CATEGORIES.plantas;
  if (filter === 'macetas') return ['Todas'];
  return INSUMOS_SUBCATEGORIES;
};

const Catalog = () => {
  const location = useLocation();
  const [activeMainFilter, setActiveMainFilter] = useState('plantas');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Parse category from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('cat');
    if (catParam) {
      if (CATEGORIES.plantas.includes(catParam)) {
        setActiveMainFilter('plantas');
        setActiveCategory(catParam);
      } else if (catParam === 'Macetas') {
        setActiveMainFilter('macetas');
        setActiveCategory('Todas');
      } else if (INSUMOS_SUBCATEGORIES.includes(catParam)) {
        setActiveMainFilter('insumos');
        setActiveCategory(catParam);
      }
    }
  }, [location]);

  const handleMainFilterChange = (filterId) => {
    setActiveMainFilter(filterId);
    setActiveCategory(filterId === 'plantas' ? 'Todas' : 'Todos');
    if (filterId === 'macetas') {
      setActiveCategory('Todas');
    }
  };

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const isAllCategory = activeCategory === 'Todas' || activeCategory === 'Todos';

    if (activeMainFilter === 'plantas') {
      const sectionMatch = product.section === 'plantas';
      const catMatch = isAllCategory ? true : product.category === activeCategory;
      return sectionMatch && catMatch;
    }

    if (activeMainFilter === 'macetas') {
      return product.section === 'insumos' && product.category === 'Macetas';
    }

    const isInsumo = product.section === 'insumos' && product.category !== 'Macetas';
    if (!isInsumo) return false;
    return isAllCategory ? true : product.category === activeCategory;
  });

  const activeCategoriesList = getCategoriesByMainFilter(activeMainFilter);

  return (
    <div className="catalog-page catalog-page--fade">
      <div className="container">
        
        <div className="catalog-header text-center mb-8">
          <span className="section-label">Tienda</span>
          <h1>Nuestro Catálogo</h1>
          <p style={{marginTop: '8px', color: 'var(--texto-suave)'}}>Explorá todo lo que necesitás para darle vida a tu espacio.</p>
        </div>

        {/* Main Toggle (Plantas / Macetas / Insumos) */}
        <div className="section-toggle-container mb-8">
          <div className="section-toggle">
            {MAIN_FILTERS.map(filter => (
              <button 
                key={filter.id}
                className={`section-btn ${activeMainFilter === filter.id ? 'active' : ''}`}
                onClick={() => handleMainFilterChange(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-Categories Scroll */}
        <div className="category-filters-container mb-12">
          <div className="category-filters">
            {activeCategoriesList.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={(p) => setSelectedProduct(p)} 
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center mt-12" style={{color: 'var(--color-text-light)'}}>
            <Search size={48} className="mx-auto mb-4" opacity={0.5} />
            <h2>No encontramos productos</h2>
            <p>Pronto agregaremos más opciones a esta categoría.</p>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>
              <X size={24} />
            </button>
            
            <div className="modal-grid">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              
              <div className="modal-info">
                <span className="badge mb-4">{selectedProduct.category}</span>
                <h2 className="modal-title">{selectedProduct.name}</h2>
                {selectedProduct.price !== "Consultar" && (
                  <p className="modal-price">{selectedProduct.price}</p>
                )}
                <p className="modal-description">{selectedProduct.description}</p>
                
                <div className="modal-specs">
                  {selectedProduct.attributes.map((attr, idx) => (
                    <div key={idx} className="spec-item">
                      <strong>{attr.type.toUpperCase()}</strong>
                      <span>{attr.value}</span>
                    </div>
                  ))}
                </div>

                {/* Extra info (Tips y Plagas) */}
                {(selectedProduct.careTips || selectedProduct.pests) && (
                  <div className="modal-extra-info">
                    {selectedProduct.careTips && (
                      <div className="info-block">
                        <h4 className="info-title">✨ Tips de Cuidado</h4>
                        <p className="info-text">{selectedProduct.careTips}</p>
                      </div>
                    )}
                    {selectedProduct.pests && (
                      <div className="info-block pests-block">
                        <h4 className="info-title">🐛 Posibles Plagas</h4>
                        <p className="info-text">{selectedProduct.pests}</p>
                      </div>
                    )}
                  </div>
                )}


                <a 
                  href={generateWaLink(WA_MESSAGES.producto(selectedProduct.name))} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-primary w-full"
                >
                  <MessageCircle size={20} style={{marginRight: '8px'}} /> Consultar stock
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
