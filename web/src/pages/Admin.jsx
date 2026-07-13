import { useState, useEffect } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { 
  Search, Plus, Edit2, Trash2, Eye, EyeOff, LogOut, Check, X, 
  Upload, Sparkles, AlertCircle, RefreshCw, LayoutGrid, List 
} from 'lucide-react';
import SEO from '../components/SEO';
import './Admin.css';

// Default password as fallback
const DEFAULT_PASSWORD = 'deraiz2026';

const PLANT_CATEGORIES = ['Interior', 'Exterior', 'Huerta', 'Suculentas'];
const INSUMO_CATEGORIES = ['Macetas', 'Sustratos y Tierra', 'Fertilizantes y Cuidado', 'Control de Plagas', 'Herramientas'];

const INITIAL_FORM_STATE = {
  name: '',
  section: 'plantas',
  category: 'Interior',
  price: 'Consultar',
  image: '',
  description: '',
  isPetFriendly: false,
  active: true,
  stock: 'disponible',
  careTips: '',
  pests: '',
  attributes: [
    { type: 'luz', value: 'Luz media indirecta' },
    { type: 'riego', value: 'Riego moderado (cuando seque la superficie)' },
    { type: 'dificultad', value: 'Media' }
  ]
};

const Admin = () => {
  const { 
    products, isBackendActive, 
    createProduct, updateProduct, deleteProduct, toggleProductActive, resetCatalog, uploadImage, saveCatalog 
  } = useCatalog();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [shakeLogin, setShakeLogin] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('all');

  // View mode state (list or grid)
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('deraiz_admin_view_mode') || 'list');
  
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem('deraiz_admin_view_mode', mode);
  };

  // Form State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [activeTab, setActiveTab] = useState('general');
  const [croppingImage, setCroppingImage] = useState(null);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  
  // Image Uploading Local State
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('deraiz_admin_logged_in') === 'true';
    if (loggedIn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
    }
  }, []);

  // Handle Login submission
  const handleLogin = (e) => {
    e.preventDefault();
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    const targetPassword = envPassword || DEFAULT_PASSWORD;

    if (passwordInput === targetPassword) {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('deraiz_admin_logged_in', 'true');
      sessionStorage.setItem('deraiz_admin_password', passwordInput);
    } else {
      setShakeLogin(true);
      setAuthError('Contraseña incorrecta. Intentá de nuevo.');
      setTimeout(() => setShakeLogin(false), 500);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    sessionStorage.removeItem('deraiz_admin_logged_in');
    sessionStorage.removeItem('deraiz_admin_password');
  };

  // Filter products based on query and section
  const filteredProducts = products.filter(prod => {
    const sectionMatch = activeSection === 'all' || prod.section === activeSection;
    const nameMatch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      (prod.category && prod.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return sectionMatch && nameMatch;
  });

  // Handle drawer opening for create
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormState(INITIAL_FORM_STATE);
    setImageFile(null);
    setActiveTab('general');
    setIsDrawerOpen(true);
  };

  // Handle drawer opening for edit
  const handleOpenEdit = (product) => {
    setEditingId(product.id);
    setImageFile(null);
    
    // Ensure attributes exist with correct format
    let productAttrs = product.attributes || [];
    if (product.section === 'plantas') {
      const luz = productAttrs.find(a => a.type === 'luz')?.value || 'Luz media indirecta';
      const riego = productAttrs.find(a => a.type === 'riego')?.value || 'Riego moderado';
      const dif = productAttrs.find(a => a.type === 'dificultad')?.value || 'Media';
      productAttrs = [
        { type: 'luz', value: luz },
        { type: 'riego', value: riego },
        { type: 'dificultad', value: dif }
      ];
    } else {
      // For insumos, load whatever they have
      if (productAttrs.length === 0) {
        productAttrs = [
          { type: 'presentacion', value: '' },
          { type: 'uso', value: '' }
        ];
      }
    }

    setFormState({
      name: product.name || '',
      section: product.section || 'plantas',
      category: product.category || 'Interior',
      price: product.price || 'Consultar',
      image: product.image || '',
      description: product.description || '',
      isPetFriendly: !!product.isPetFriendly,
      active: product.active !== undefined ? product.active : true,
      stock: product.stock || 'disponible',
      careTips: product.careTips || '',
      pests: product.pests || '',
      attributes: productAttrs
    });
    setActiveTab('general');
    setIsDrawerOpen(true);
  };

  // Handle Section Change in Form (updates default categories and attributes)
  const handleFormSectionChange = (section) => {
    const isPlant = section === 'plantas';
    setFormState(prev => ({
      ...prev,
      section,
      category: isPlant ? 'Interior' : 'Macetas',
      attributes: isPlant 
        ? [
            { type: 'luz', value: 'Luz media indirecta' },
            { type: 'riego', value: 'Riego moderado (cuando seque la superficie)' },
            { type: 'dificultad', value: 'Media' }
          ]
        : [
            { type: 'presentacion', value: 'Unidad' },
            { type: 'uso', value: 'Interior y Exterior' }
          ]
    }));
  };

  // Handle Form Change
  const handleInputChange = (field, value) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle Form Attribute Change
  const handleAttrChange = (type, value) => {
    setFormState(prev => {
      const updatedAttrs = prev.attributes.map(attr => 
        attr.type === type ? { ...attr, value } : attr
      );
      // If attribute doesn't exist, append it
      if (!updatedAttrs.some(attr => attr.type === type)) {
        updatedAttrs.push({ type, value });
      }
      return {
        ...prev,
        attributes: updatedAttrs
      };
    });
  };

  // Handle File Input Change (load to cropper first)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCroppingImage(reader.result);
        setCropZoom(1);
        setCropX(0);
        setCropY(0);
      };
      reader.readAsDataURL(file);
    }
  };

  // Process and apply the cropping using HTML5 Canvas
  const handleApplyCrop = () => {
    if (!croppingImage) return;

    const img = new Image();
    img.src = croppingImage;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 600; // Crisp square aspect ratio

      canvas.width = size;
      canvas.height = size;

      // Draw elegant white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      // Translate coordinates to center of canvas
      ctx.translate(size / 2, size / 2);

      // Scale and translate according to user's zoom & position
      const scaleMultiplier = 2.5; // Map 240px container space to 600px canvas space
      ctx.scale(cropZoom, cropZoom);
      ctx.translate(cropX * scaleMultiplier / cropZoom, cropY * scaleMultiplier / cropZoom);

      // Calculate sizes to maintain aspect ratio
      const aspect = img.width / img.height;
      let drawW, drawH;
      if (aspect >= 1) {
        drawH = size;
        drawW = size * aspect;
      } else {
        drawW = size;
        drawH = size / aspect;
      }

      // Draw centered
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

      // Export as Base64 JPEG
      const croppedBase = canvas.toDataURL('image/jpeg', 0.92);
      setFormState(prev => ({ ...prev, image: croppedBase }));
      setCroppingImage(null);
      setImageFile(null); // Clean selected file
    };
  };

  // Handle Form Submit (Save / Create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let finalImageUrl = formState.image;

      // If a physical file was selected, upload it first
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      const productPayload = {
        ...formState,
        image: finalImageUrl || `${import.meta.env.BASE_URL}images/placeholder_white.webp`
      };

      if (editingId) {
        await updateProduct(editingId, productPayload);
      } else {
        await createProduct(productPayload);
      }

      setIsDrawerOpen(false);
      setImageFile(null);
    } catch (err) {
      alert('Error al guardar el producto. Probá de nuevo.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Estás seguro de que querés eliminar "${name}" del catálogo?`)) {
      await deleteProduct(id);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <SEO title="Acceso de Administración | De Raíz" description="Iniciá sesión para administrar el catálogo de De Raíz." path="/admin" noindex={true} />
        <div className={`admin-login-card ${shakeLogin ? 'shake' : ''}`}>
          <img 
            src={`${import.meta.env.BASE_URL}images/logo-hero-white.webp`} 
            alt="De Raíz" 
            className="admin-login-logo"
          />
          <h1 className="admin-login-title">Acceso Panel</h1>
          <p className="admin-login-subtitle">Gestión del catálogo comercial</p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-login-group">
              <label htmlFor="adminPassword" className="admin-login-label">Contraseña de acceso</label>
              <input
                id="adminPassword"
                type="password"
                className="admin-login-input"
                placeholder="••••••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                required
              />
            </div>
            {authError && (
              <div className="admin-login-error">
                <AlertCircle size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                <span>{authError}</span>
              </div>
            )}
            <button type="submit" className="btn btn-primary w-full mt-4">
              Ingresar al Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Handle Export Catalog as JSON
  const handleExport = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "deraiz_catalogo_oficial.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch {
      alert('Error al exportar el catálogo.');
    }
  };

  // Handle Import Catalog from JSON
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          if (window.confirm(`¿Querés importar un catálogo con ${parsed.length} productos? Esto reemplazará todo tu listado actual.`)) {
            await saveCatalog(parsed);
            alert('¡Catálogo importado y cargado exitosamente!');
          }
        } else {
          alert('El archivo no tiene un formato de catálogo válido (debe ser un array de productos).');
        }
      } catch {
        alert('Error al procesar el archivo JSON.');
      }
    };
    reader.readAsText(file);
    // Reset file input value so same file can be imported again if needed
    e.target.value = '';
  };

  // Dashboard Screen
  return (
    <div className="admin-dashboard">
      <SEO title="Panel de Administración | De Raíz" description="Administrá los elementos del catálogo comercial." path="/admin" noindex={true} />
      <div className="container">
        
        {/* Header */}
        <header className="admin-header">
          <div className="admin-title-area">
            <h1>
              Panel del Catálogo
              <span className={`admin-mode-badge ${isBackendActive ? 'online' : 'offline'}`}>
                {isBackendActive ? 'Modo Servidor' : 'Modo Navegador'}
              </span>
            </h1>
            <p className="admin-subtitle">
              Administrá los elementos visibles, precios, stock y detalles técnicos.
            </p>
          </div>

          <div className="admin-actions-header">
            <button 
              type="button" 
              className="btn btn-secondary btn-outline-light" 
              onClick={() => document.getElementById('importCatalogFile').click()}
              title="Importar catálogo desde archivo JSON"
            >
              📥 Importar
            </button>
            <input
              id="importCatalogFile"
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleImport}
            />
            <button 
              type="button" 
              className="btn btn-secondary btn-outline-light" 
              onClick={handleExport}
              title="Exportar todo tu catálogo actual a un archivo JSON"
            >
              📤 Exportar
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-outline-light" 
              onClick={resetCatalog}
              title="Restablecer base de datos al estado inicial"
            >
              <RefreshCw size={14} /> Restaurar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleOpenCreate}>
              <Plus size={18} /> Nuevo Producto
            </button>
            <button type="button" className="admin-row-btn" onClick={handleLogout} title="Cerrar sesión">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Toolbar Controls */}
        <section className="admin-toolbar">
          <div className="admin-search-wrapper">
            <Search className="admin-search-icon" size={18} />
            <input
              type="text"
              className="admin-search-input"
              placeholder="Buscar por nombre o categoría..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div className="admin-filters-group">
              <button
                type="button"
                className={`admin-filter-pill ${activeSection === 'all' ? 'active' : ''}`}
                onClick={() => setActiveSection('all')}
              >
                Todos ({products.length})
              </button>
              <button
                type="button"
                className={`admin-filter-pill ${activeSection === 'plantas' ? 'active' : ''}`}
                onClick={() => setActiveSection('plantas')}
              >
                🌱 Plantas ({products.filter(p => p.section === 'plantas').length})
              </button>
              <button
                type="button"
                className={`admin-filter-pill ${activeSection === 'insumos' ? 'active' : ''}`}
                onClick={() => setActiveSection('insumos')}
              >
                🛠️ Insumos ({products.filter(p => p.section === 'insumos').length})
              </button>
            </div>

            <div className="admin-view-toggle">
              <button
                type="button"
                className={`admin-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => handleViewModeChange('list')}
                title="Vista de Lista"
              >
                <List size={18} />
              </button>
              <button
                type="button"
                className={`admin-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => handleViewModeChange('grid')}
                title="Vista de Cuadrícula"
              >
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Products Display Container */}
        {viewMode === 'list' ? (
          <section className="admin-table-container">
            <div className="admin-list-header">
              <div>Foto</div>
              <div>Nombre</div>
              <div>Categoría</div>
              <div>Precio</div>
              <div>Estado</div>
              <div style={{ textAlign: 'right' }}>Acciones</div>
            </div>

            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <div key={prod.id} className="admin-product-row">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="admin-row-thumb" 
                    onError={(e) => {
                      e.target.src = `${import.meta.env.BASE_URL}images/placeholder_white.webp`;
                    }}
                  />
                  
                  <div className="admin-row-name-wrap">
                    <span className="admin-row-name">{prod.name}</span>
                    <span className="admin-row-slug">id: {prod.id} | /{prod.slug}</span>
                  </div>

                  <div className="admin-row-cat-wrap">
                    <span className="admin-row-cat">{prod.category}</span>
                    <span className="admin-row-section">{prod.section === 'plantas' ? '🌱 Planta' : '🛠️ Insumo/Maceta'}</span>
                  </div>

                  <div className="admin-row-price">
                    {prod.price || 'Consultar'}
                  </div>

                  <div className="admin-row-status-wrap">
                    <span className={`admin-status-badge ${prod.active ? 'active' : 'inactive'}`}>
                      {prod.active ? 'Visible' : 'Oculto'}
                    </span>
                    <span className={`admin-status-badge ${prod.stock === 'disponible' ? 'instock' : 'outstock'}`}>
                      {prod.stock === 'disponible' ? 'En Stock' : 'Sin Stock'}
                    </span>
                  </div>

                  <div className="admin-row-actions">
                    <button 
                      type="button" 
                      className="admin-row-btn"
                      onClick={() => toggleProductActive(prod.id)}
                      title={prod.active ? 'Ocultar del catálogo' : 'Mostrar en catálogo'}
                    >
                      {prod.active ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button 
                      type="button" 
                      className="admin-row-btn"
                      onClick={() => handleOpenEdit(prod)}
                      title="Editar producto"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      type="button" 
                      className="admin-row-btn btn-delete"
                      onClick={() => handleDelete(prod.id, prod.name)}
                      title="Eliminar producto"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="admin-empty-state">
                <AlertCircle size={48} className="mx-auto" opacity={0.4} />
                <h3>No se encontraron productos</h3>
                <p>Probá cambiando los términos de búsqueda o filtros activos.</p>
              </div>
            )}
          </section>
        ) : (
          <section className="admin-grid-container">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <div key={prod.id} className="admin-grid-card">
                  <div className="admin-card-img-wrap">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="admin-card-img" 
                      onError={(e) => {
                        e.target.src = `${import.meta.env.BASE_URL}images/placeholder_white.webp`;
                      }}
                    />
                    <div className="admin-card-badges">
                      <span className={`admin-status-badge ${prod.active ? 'active' : 'inactive'}`}>
                        {prod.active ? 'Visible' : 'Oculto'}
                      </span>
                      <span className={`admin-status-badge ${prod.stock === 'disponible' ? 'instock' : 'outstock'}`}>
                        {prod.stock === 'disponible' ? 'En Stock' : 'Sin Stock'}
                      </span>
                    </div>
                  </div>

                  <div className="admin-card-info">
                    <div className="admin-card-header">
                      <span className="admin-card-title">{prod.name}</span>
                      <span className="admin-card-price">{prod.price || 'Consultar'}</span>
                    </div>

                    <div className="admin-card-meta">
                      <span>{prod.category}</span>
                      <span>{prod.section === 'plantas' ? '🌱 Planta' : '🛠️ Insumo/Maceta'}</span>
                    </div>
                  </div>

                  <div className="admin-card-actions">
                    <button 
                      type="button" 
                      className="admin-row-btn"
                      onClick={() => toggleProductActive(prod.id)}
                      title={prod.active ? 'Ocultar del catálogo' : 'Mostrar en catálogo'}
                    >
                      {prod.active ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button 
                      type="button" 
                      className="admin-row-btn"
                      onClick={() => handleOpenEdit(prod)}
                      title="Editar producto"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      type="button" 
                      className="admin-row-btn btn-delete"
                      onClick={() => handleDelete(prod.id, prod.name)}
                      title="Eliminar producto"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="admin-empty-state w-full" style={{ gridColumn: '1 / -1' }}>
                <AlertCircle size={48} className="mx-auto" opacity={0.4} />
                <h3>No se encontraron productos</h3>
                <p>Probá cambiando los términos de búsqueda o filtros activos.</p>
              </div>
            )}
          </section>
        )}
      </div>

      {/* Drawer Form Modal */}
      {isDrawerOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsDrawerOpen(false)}>
          <div className="admin-modal-drawer" onClick={(e) => e.stopPropagation()}>
            
            <header className="admin-drawer-header">
              <h2>{editingId ? 'Editar Elemento' : 'Nuevo Elemento'}</h2>
              <button type="button" className="admin-drawer-close" onClick={() => setIsDrawerOpen(false)}>
                <X size={20} />
              </button>
            </header>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-drawer-body">
                {/* Tabs Navigation */}
                <div className="admin-tabs-nav">
                  <button
                    type="button"
                    className={`admin-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                    onClick={() => setActiveTab('general')}
                  >
                    Datos Generales
                  </button>
                  <button
                    type="button"
                    className={`admin-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                    onClick={() => setActiveTab('details')}
                  >
                    {formState.section === 'plantas' ? 'Cuidados y Atributos' : 'Especificaciones'}
                  </button>
                </div>

                {/* Tab 1: General Info */}
                {activeTab === 'general' && (
                  <div className="admin-form">
                    
                    {/* Name */}
                    <div className="admin-form-group">
                      <label className="admin-form-label">Nombre Comercial *</label>
                      <input
                        type="text"
                        className="admin-form-input"
                        value={formState.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Ej: Monstera Deliciosa, Maceta Barro N18"
                        required
                      />
                    </div>

                    {/* Section Toggle */}
                    <div className="admin-form-row-2">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Sección del Catálogo</label>
                        <select
                          className="admin-form-select"
                          value={formState.section}
                          onChange={(e) => handleFormSectionChange(e.target.value)}
                        >
                          <option value="plantas">🌱 Plantas y Vida</option>
                          <option value="insumos">🛠️ Insumos y Macetas</option>
                        </select>
                      </div>

                      {/* Category Dropdown */}
                      <div className="admin-form-group">
                        <label className="admin-form-label">Categoría *</label>
                        <select
                          className="admin-form-select"
                          value={formState.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                        >
                          {formState.section === 'plantas' 
                            ? PLANT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)
                            : INSUMO_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)
                          }
                        </select>
                      </div>
                    </div>

                    {/* Price and Stock status */}
                    <div className="admin-form-row-2">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Precio</label>
                        <input
                          type="text"
                          className="admin-form-input"
                          value={formState.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          placeholder="Ej: Consultar, $ 420, $ 1.200"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-form-label">Stock</label>
                        <select
                          className="admin-form-select"
                          value={formState.stock}
                          onChange={(e) => handleInputChange('stock', e.target.value)}
                        >
                          <option value="disponible">En Stock / Disponible</option>
                          <option value="agotado">Agotado / Sin stock</option>
                        </select>
                      </div>
                    </div>

                    {/* Image Upload / Crop Widget */}
                    <div className="admin-form-group">
                      <label className="admin-form-label">Imagen del Producto</label>
                      
                      {croppingImage ? (
                        /* Dynamic Interactive Cropper Container */
                        <div className="admin-cropper-container" onClick={(e) => e.stopPropagation()}>
                          <div className="admin-crop-area">
                            <div className="admin-crop-guide"></div>
                            <img
                              src={croppingImage}
                              alt="Recortando"
                              className="admin-crop-img"
                              style={{
                                transform: `translate(-50%, -50%) translate(${cropX}px, ${cropY}px) scale(${cropZoom})`,
                              }}
                            />
                          </div>

                          <div className="admin-crop-controls">
                            <div className="admin-crop-slider-group">
                              <div className="admin-crop-slider-label">
                                <span>🔍 Zoom ({Math.round(cropZoom * 100)}%)</span>
                              </div>
                              <input
                                type="range"
                                min="1"
                                max="3"
                                step="0.05"
                                className="admin-crop-slider"
                                value={cropZoom}
                                onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                              />
                            </div>

                            <div className="admin-crop-slider-group">
                              <div className="admin-crop-slider-label">
                                <span>Horizontal (X)</span>
                                <span>{cropX}px</span>
                              </div>
                              <input
                                type="range"
                                min="-100"
                                max="100"
                                className="admin-crop-slider"
                                value={cropX}
                                onChange={(e) => setCropX(parseInt(e.target.value))}
                              />
                            </div>

                            <div className="admin-crop-slider-group">
                              <div className="admin-crop-slider-label">
                                <span>Vertical (Y)</span>
                                <span>{cropY}px</span>
                              </div>
                              <input
                                type="range"
                                min="-100"
                                max="100"
                                className="admin-crop-slider"
                                value={cropY}
                                onChange={(e) => setCropY(parseInt(e.target.value))}
                              />
                            </div>
                          </div>

                          <div className="admin-crop-actions">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                              onClick={() => setCroppingImage(null)}
                            >
                              Cancelar
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                              onClick={handleApplyCrop}
                            >
                              Recortar y Guardar
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Standard Upload zone & Preview */
                        <>
                          <div className="admin-upload-zone" onClick={() => document.getElementById('adminImageFile').click()}>
                            <Upload className="admin-upload-icon" size={24} />
                            <span className="admin-upload-text">Presioná para elegir una foto</span>
                            <span className="admin-upload-hint">JPG o PNG, recomendado 800x800 px</span>
                            <input
                              id="adminImageFile"
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={handleFileChange}
                            />
                          </div>

                          {/* Or URL input */}
                          <div style={{ marginTop: '12px' }}>
                            <label className="admin-form-label" style={{ fontSize: '0.75rem', opacity: 0.8 }}>O ingresá una URL directa de imagen:</label>
                            <input
                              type="text"
                              className="admin-form-input"
                              style={{ padding: '8px 12px', fontSize: '0.85rem', marginTop: '4px' }}
                              value={formState.image}
                              onChange={(e) => handleInputChange('image', e.target.value)}
                              placeholder="https://ejemplo.com/imagen.jpg"
                            />
                          </div>

                          {formState.image && (
                            <div className="admin-preview-wrap">
                              <img 
                                src={formState.image} 
                                alt="Previsualización" 
                                className="admin-preview-img"
                              />
                              <button
                                type="button"
                                className="admin-preview-remove"
                                onClick={() => handleInputChange('image', '')}
                                title="Remover imagen"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Description */}
                    <div className="admin-form-group">
                      <label className="admin-form-label">Descripción Comercial</label>
                      <textarea
                        className="admin-form-textarea"
                        value={formState.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Breve reseña del producto para encantar al comprador..."
                      />
                    </div>

                    {/* Active Toggle */}
                    <div className="admin-toggle-group">
                      <div className="admin-toggle-info">
                        <span className="admin-toggle-title">Mostrar en Catálogo</span>
                        <span className="admin-toggle-desc">Si está desactivado, se mantendrá oculto al público.</span>
                      </div>
                      <label className="admin-switch">
                        <input
                          type="checkbox"
                          checked={formState.active}
                          onChange={(e) => handleInputChange('active', e.target.checked)}
                        />
                        <span className="admin-slider"></span>
                      </label>
                    </div>

                  </div>
                )}

                {/* Tab 2: Technical/Care Details */}
                {activeTab === 'details' && (
                  <div className="admin-form">
                    {formState.section === 'plantas' ? (
                      <>
                        <h4 style={{ color: 'var(--verde-profundo)', fontSize: '0.95rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '6px', marginBottom: '12px' }}>🌱 Atributos Botánicos</h4>
                        
                        <div className="admin-form-group">
                          <label className="admin-form-label">Nivel de Luz</label>
                          <select
                            className="admin-form-select"
                            value={formState.attributes.find(a => a.type === 'luz')?.value || 'Luz media indirecta'}
                            onChange={(e) => handleAttrChange('luz', e.target.value)}
                          >
                            <option value="Sombra total / Adaptable">Sombra total / Adaptable</option>
                            <option value="Luz baja o media (sombra o semisombra)">Luz baja o media (Sombra/Semisombra)</option>
                            <option value="Luz media o brillante (sin sol directo)">Luz media o brillante (Sin sol directo)</option>
                            <option value="Mucha claridad sin sol directo">Mucha claridad sin sol directo</option>
                            <option value="Mucha luz (sol directo o semisombra)">Mucha luz (Sol directo o semisombra)</option>
                            <option value="Mucha luz (sol directo o pleno sol)">Mucha luz (Sol directo o pleno sol)</option>
                          </select>
                        </div>

                        <div className="admin-form-group">
                          <label className="admin-form-label">Frecuencia de Riego</label>
                          <select
                            className="admin-form-select"
                            value={formState.attributes.find(a => a.type === 'riego')?.value || 'Riego moderado'}
                            onChange={(e) => handleAttrChange('riego', e.target.value)}
                          >
                            <option value="Riego escaso (dejar secar por completo)">Escaso (dejar secar sustrato por completo)</option>
                            <option value="Riego moderado (cuando seque la superficie)">Moderado (dejar secar superficie)</option>
                            <option value="Riego frecuente (mantener húmedo)">Frecuente (mantener húmedo sin encharcar)</option>
                          </select>
                        </div>

                        <div className="admin-form-row-2">
                          <div className="admin-form-group">
                            <label className="admin-form-label">Dificultad de Cuidado</label>
                            <select
                              className="admin-form-select"
                              value={formState.attributes.find(a => a.type === 'dificultad')?.value || 'Media'}
                              onChange={(e) => handleAttrChange('dificultad', e.target.value)}
                            >
                              <option value="Baja">Baja (Ideal principiantes) 🌱</option>
                              <option value="Media">Media (Cuidado básico)</option>
                              <option value="Alta">Alta (Expertos exigente) 👑</option>
                            </select>
                          </div>

                          {/* Pet friendly toggle switch */}
                          <div className="admin-form-group" style={{ justifyContent: 'center' }}>
                            <label className="admin-form-label" style={{ marginBottom: '4px' }}>¿Apto Mascotas?</label>
                            <div className="admin-toggle-group" style={{ padding: '8px 12px' }}>
                              <span style={{ fontSize: '0.85rem' }}>🐾 Sí, seguro</span>
                              <label className="admin-switch">
                                <input
                                  type="checkbox"
                                  checked={formState.isPetFriendly}
                                  onChange={(e) => handleInputChange('isPetFriendly', e.target.checked)}
                                />
                                <span className="admin-slider"></span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="admin-form-group">
                          <label className="admin-form-label">✨ Tips de Cuidado Rápido</label>
                          <textarea
                            className="admin-form-textarea"
                            value={formState.careTips}
                            onChange={(e) => handleInputChange('careTips', e.target.value)}
                            placeholder="Ej: Limpiar las hojas con paño húmedo. Evitar corrientes de aire frío..."
                          />
                        </div>

                        <div className="admin-form-group">
                          <label className="admin-form-label">🐛 Posibles Plagas Frecuentes</label>
                          <input
                            type="text"
                            className="admin-form-input"
                            value={formState.pests}
                            onChange={(e) => handleInputChange('pests', e.target.value)}
                            placeholder="Ej: Cochinilla algodonosa, arañuela roja..."
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 style={{ color: 'var(--verde-profundo)', fontSize: '0.95rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '6px', marginBottom: '12px' }}>🛠️ Especificaciones de Insumo</h4>

                        <div className="admin-form-group">
                          <label className="admin-form-label">Presentación / Tamaño</label>
                          <input
                            type="text"
                            className="admin-form-input"
                            value={formState.attributes.find(a => a.type === 'presentacion')?.value || ''}
                            onChange={(e) => handleAttrChange('presentacion', e.target.value)}
                            placeholder="Ej: Bolsa de 10L, Unidad, Cerámica N14, Frasco 100ml"
                          />
                        </div>

                        <div className="admin-form-group">
                          <label className="admin-form-label">Uso Sugerido / Material</label>
                          <input
                            type="text"
                            className="admin-form-input"
                            value={formState.attributes.find(a => a.type === 'uso' || a.type === 'material')?.value || ''}
                            onChange={(e) => {
                              handleAttrChange('uso', e.target.value);
                              handleAttrChange('material', e.target.value);
                            }}
                            placeholder="Ej: Cactus y crasas, Barro cocido, Riego foliar"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <footer className="admin-drawer-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsDrawerOpen(false)}
                  disabled={isUploading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Sparkles className="page-loader-anim" size={16} /> Guardando...
                    </>
                  ) : (
                    <>
                      <Check size={16} /> Guardar Cambios
                    </>
                  )}
                </button>
              </footer>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
