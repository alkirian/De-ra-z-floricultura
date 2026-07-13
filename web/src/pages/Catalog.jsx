import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, generateWaLink, WA_MESSAGES } from '../data/mockData';
import { useCatalog } from '../context/CatalogContext';
import { Search, X, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { useCart } from '../context/CartContext';
import ProductModal from '../components/ProductModal';
import './Catalog.css';

const MAIN_FILTERS = [
  { id: 'plantas', label: 'Plantas' },
  { id: 'macetas', label: 'Macetas' },
  { id: 'insumos', label: 'Insumos' },
];

const INSUMOS_SUBCATEGORIES = CATEGORIES.insumos.filter((cat) => cat !== 'Macetas' && cat !== 'Todos');

const NEED_FILTERS = {
  'planta-facil': 'Plantas fáciles',
  'poca-luz': 'Poca luz',
  'mucha-luz': 'Mucha luz',
  'poco-riego': 'Poco riego',
  'pet-friendly': 'Pet friendly',
};

const normalizeText = (value = '') => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const getSearchTerms = (query = '') => query
  .split(/[|,]/)
  .map((term) => normalizeText(term).trim())
  .filter(Boolean);

const matchesNeed = (product, need) => {
  if (!need) return true;
  if (product.section !== 'plantas') return false;

  const light = normalizeText(product.attributes?.find((attr) => attr.type === 'luz')?.value || '');
  const water = normalizeText(product.attributes?.find((attr) => attr.type === 'riego')?.value || '');
  const name = normalizeText(product.name);

  if (need === 'poca-luz') return light.includes('poca') || light.includes('sombra');
  if (need === 'mucha-luz') return light.includes('mucha') || light.includes('pleno sol') || (light.includes('sol directo') && !light.includes('sin sol directo'));
  if (need === 'poco-riego') return water.includes('moderado') || water.includes('poca') || name.includes('sansevieria');
  if (need === 'planta-facil') {
    const easyNames = ['sansevieria', 'potus', 'peperomia', 'dracena', 'dracena', 'lavanda', 'gazania', 'hiedra', 'areca'];
    return easyNames.some((item) => name.includes(item));
  }
  if (need === 'pet-friendly') {
    return !!product.isPetFriendly;
  }

  return true;
};

const getCategoriesByMainFilter = (filter) => {
  if (filter === 'plantas') return CATEGORIES.plantas;
  if (filter === 'macetas') return ['Todas'];
  return ['Todos', ...INSUMOS_SUBCATEGORIES];
};

const Catalog = () => {
  const { products, loading } = useCatalog();
  const location = useLocation();
  const [activeMainFilter, setActiveMainFilter] = useState('plantas');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNeed, setActiveNeed] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const { addToCart, setIsCartOpen } = useCart();

  // Parse category from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('cat');
    const queryParam = params.get('q');
    const needParam = params.get('need');

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchQuery(queryParam || '');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveNeed(NEED_FILTERS[needParam] ? needParam : '');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(12);

    if (catParam) {
      const catLower = catParam.toLowerCase();
      if (catLower === 'plantas' || catParam === 'Todas') {
        setActiveMainFilter('plantas');
        setActiveCategory('Todas');
      } else if (catLower === 'macetas') {
        setActiveMainFilter('macetas');
        setActiveCategory('Todas');
      } else if (catLower === 'insumos' || catParam === 'Todos') {
        setActiveMainFilter('insumos');
        setActiveCategory('Todos');
      } else if (CATEGORIES.plantas.includes(catParam)) {
        setActiveMainFilter('plantas');
        setActiveCategory(catParam);
      } else if (INSUMOS_SUBCATEGORIES.includes(catParam)) {
        setActiveMainFilter('insumos');
        setActiveCategory(catParam);
      }
    }
  }, [location]);

  const handleClearFilters = () => {
    setActiveMainFilter('plantas');
    setActiveCategory('Todas');
    setSearchQuery('');
    setActiveNeed('');
    setVisibleCount(12);
  };

  const handleMainFilterChange = (filterId) => {
    setActiveMainFilter(filterId);
    setActiveCategory(filterId === 'plantas' ? 'Todas' : 'Todos');
    if (filterId === 'macetas') {
      setActiveCategory('Todas');
    }
    if (filterId !== 'plantas') {
      setActiveNeed('');
    }
    setVisibleCount(12);
  };

  const filteredProducts = useMemo(() => {
    if (loading) return [];
    return products.filter((product) => {
      if (product.active === false) return false;
      const isAllCategory = activeCategory === 'Todas' || activeCategory === 'Todos';
      const searchTerms = getSearchTerms(searchQuery);
      const productName = normalizeText(product.name);
      const searchMatch = searchTerms.length === 0 || searchTerms.some((term) => productName.includes(term));
      const needMatch = matchesNeed(product, activeNeed);

      if (activeMainFilter === 'plantas') {
        const sectionMatch = product.section === 'plantas';
        const catMatch = isAllCategory ? true : product.category === activeCategory;
        return sectionMatch && catMatch && searchMatch && needMatch;
      }

      if (activeMainFilter === 'macetas') {
        return product.section === 'insumos' && product.category === 'Macetas' && searchMatch;
      }

      const isInsumo = product.section === 'insumos' && product.category !== 'Macetas';
      if (!isInsumo) return false;
      const catMatch = isAllCategory ? true : product.category === activeCategory;
      return catMatch && searchMatch;
    });
  }, [activeCategory, activeMainFilter, searchQuery, activeNeed, products, loading]);

  const activeCategoriesList = getCategoriesByMainFilter(activeMainFilter);

  return (
    <div className="catalog-page catalog-page--fade">
      <SEO
        title="Catálogo de Plantas, Macetas e Insumos en Las Piedras | De Raíz"
        description="Explorá nuestra variedad de plantas de interior y exterior, tierra, sustratos y macetas modernas en Las Piedras, Canelones. Hacé tu consulta de stock hoy."
        path="/catalogo"
      />
      <div className="container">
        <h1 className="sr-only">Catálogo Botánico de Plantas, Macetas e Insumos — De Raíz</h1>

        {activeNeed && (
          <div className="catalog-need-chip mb-6">
            <span>Filtro activo: <strong>{NEED_FILTERS[activeNeed]}</strong></span>
            <button type="button" className="catalog-clear-btn" onClick={() => setActiveNeed('')}>Quitar filtro</button>
          </div>
        )}

        <div className="catalog-search-wrap mb-8">
          <div className="catalog-search">
            <Search size={18} className="catalog-search-icon" />
            <input
              type="text"
              className="catalog-search-input"
              placeholder="Buscar por nombre (ej: Monstera, Potus, Lavanda)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar productos"
            />
            {searchQuery.trim() && (
              <button
                type="button"
                className="catalog-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Borrar búsqueda"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button type="button" className="catalog-clear-btn" onClick={handleClearFilters}>
            Limpiar filtros
          </button>
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
          <p className="category-scroll-hint">Deslizá para ver más categorías</p>
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


        <div className="catalog-results-head mb-6">
          <p>
            Mostrando <strong>{filteredProducts.length}</strong> resultado{filteredProducts.length === 1 ? '' : 's'}
            {searchQuery.trim() ? <> para <strong>"{searchQuery.trim()}"</strong></> : null}
            {activeNeed ? <> en <strong>{NEED_FILTERS[activeNeed]}</strong></> : null}
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.slice(0, visibleCount).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={(p) => setSelectedProduct(p)} 
            />
          ))}
        </div>

        {visibleCount < filteredProducts.length && (
          <div className="catalog-load-more text-center mt-8 mb-10">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setVisibleCount((prev) => prev + 12)}
            >
              Mostrar más ({filteredProducts.length - visibleCount} restantes)
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center mt-12" style={{color: 'var(--color-text-light)'}}>
            <Search size={48} className="mx-auto mb-4" opacity={0.5} />
            <h2>No encontramos productos</h2>
            {searchQuery.trim() ? (
              <>
                <p>No hay resultados para "{searchQuery.trim()}" con los filtros actuales.</p>
                <button type="button" className="catalog-clear-btn mt-4" onClick={handleClearFilters}>
                  Limpiar y ver todo
                </button>
                <a href={generateWaLink(WA_MESSAGES.ayudaElegir)} target="_blank" rel="noreferrer" className="btn btn-primary mt-4">
                  <MessageCircle size={18} /> Pedir ayuda por WhatsApp
                </a>
              </>
            ) : (
              <p>Pronto agregaremos más opciones a esta categoría.</p>
            )}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          actionButton={
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={() => {
                addToCart(selectedProduct);
                setIsCartOpen(true);
                setSelectedProduct(null);
              }}
            >
              Agregar para consultar stock y precio
            </button>
          }
        />
      )}
    </div>
  );
};

export default Catalog;


