import { createContext, useContext, useEffect, useState } from 'react';
import { MOCK_PRODUCTS } from '../data/mockData';

const CatalogContext = createContext(null);
const LOCAL_STORAGE_KEY = 'deraiz_catalog_products';

export const getAbsoluteImageUrl = (imagePath) => {
  if (!imagePath) return `${import.meta.env.BASE_URL}images/placeholder_white.webp`;
  if (imagePath.startsWith('data:') || imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Remove leading slash if any
  let cleanPath = imagePath;
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }
  
  // Strip double base URL if it's already there
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.replace(/^\/|\/$/g, ''); // e.g. "De-ra-z-floricultura"
  
  if (cleanBase && cleanPath.startsWith(cleanBase + '/')) {
    cleanPath = cleanPath.slice(cleanBase.length + 1);
  }
  
  return `${base}${cleanPath}`;
};

const resolveProducts = (productsList) => {
  if (!Array.isArray(productsList)) return [];
  return productsList.map(prod => ({
    ...prod,
    image: getAbsoluteImageUrl(prod.image)
  }));
};

export const CatalogProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      const catalogVer = localStorage.getItem('deraiz_catalog_version');
      const CURRENT_VERSION = '3.0';

      if (localData && catalogVer === CURRENT_VERSION) {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed)) return resolveProducts(parsed);
      }
    } catch (err) {
      console.error('Error loading initial data from localStorage sync:', err);
    }
    // Fallback: mock products written to localStorage to ensure version consistency
    try {
      const CURRENT_VERSION = '3.0';
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MOCK_PRODUCTS));
      localStorage.setItem('deraiz_catalog_version', CURRENT_VERSION);
    } catch (err) {
      console.error('Failed to write mock products to localStorage:', err);
    }
    return resolveProducts(MOCK_PRODUCTS);
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBackendActive, setIsBackendActive] = useState(false);

  // Sync with backend API if available, keeping cached data loaded synchronously
  useEffect(() => {
    const syncCatalogWithBackend = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiBase}/api/catalog`);
        if (response.ok) {
          const backendData = await response.json();
          if (Array.isArray(backendData) && backendData.length > 0) {
            const resolved = resolveProducts(backendData);
            setProducts(resolved);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resolved));
            setIsBackendActive(true);
            console.log('Catálogo cargado exitosamente desde el backend.');
          }
        }
      } catch (err) {
        // Backend not available - perfectly normal in static environments
        console.log('Corriendo en modo estático sin backend (se usará localStorage).');
      } finally {
        setLoading(false);
      }
    };

    syncCatalogWithBackend();
  }, []);

  // Save full product catalog
  const saveCatalog = async (updatedProducts) => {
    const resolved = resolveProducts(updatedProducts);
    setProducts(resolved);
    
    // Always persist to localStorage for static resilience
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resolved));
    } catch (err) {
      console.error('Error saving catalog to localStorage:', err);
    }

    // Try to persist to backend if active or if we can reach it
    if (isBackendActive || !isBackendActive) {
      try {
        const apiBase = import.meta.env.VITE_API_URL || '';
        const password = sessionStorage.getItem('deraiz_admin_password') || '';
        const response = await fetch(`${apiBase}/api/catalog`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${password}`,
          },
          body: JSON.stringify(resolved),
        });
        if (response.ok) {
          setIsBackendActive(true);
        }
      } catch (err) {
        // Soft fail if backend is unreachable
        if (isBackendActive) {
          console.warn('Backend se desconectó, guardando cambios localmente.', err);
          setIsBackendActive(false);
        }
      }
    }
  };

  const createProduct = async (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(), // Generate a unique numeric ID
      slug: slugify(productData.name),
      active: productData.active !== undefined ? productData.active : true,
      stock: productData.stock || 'disponible',
    };

    const updated = [...products, newProduct];
    await saveCatalog(updated);
    return newProduct;
  };

  const updateProduct = async (id, updatedData) => {
    const updated = products.map((prod) => {
      if (prod.id === id) {
        return {
          ...prod,
          ...updatedData,
          slug: updatedData.name ? slugify(updatedData.name) : prod.slug,
        };
      }
      return prod;
    });
    await saveCatalog(updated);
  };

  const deleteProduct = async (id) => {
    const updated = products.filter((prod) => prod.id !== id);
    await saveCatalog(updated);
  };

  const toggleProductActive = async (id) => {
    const updated = products.map((prod) => {
      if (prod.id === id) {
        return { ...prod, active: !prod.active };
      }
      return prod;
    });
    await saveCatalog(updated);
  };

  const resetCatalog = async () => {
    if (window.confirm('¿Estás seguro de que quieres restablecer el catálogo al estado de fábrica? Perderás todos tus cambios.')) {
      await saveCatalog(MOCK_PRODUCTS);
      // If backend is active, tell backend to clear its overrides
      try {
        const apiBase = import.meta.env.VITE_API_URL || '';
        const password = sessionStorage.getItem('deraiz_admin_password') || '';
        await fetch(`${apiBase}/api/catalog/reset`, { 
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${password}`,
          }
        });
      } catch (e) {
        // Ignore errors
      }
    }
  };

  // Helper to upload images to backend (falls back to base64 on client)
  const uploadImage = async (file) => {
    // 1. If backend is running, try physical file upload
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const password = sessionStorage.getItem('deraiz_admin_password') || '';
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${apiBase}/api/catalog/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${password}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.imageUrl) {
          return data.imageUrl; // Return the relative physical server path
        }
      }
    } catch (err) {
      console.log('Subida al backend no disponible, procesando como Base64 local.');
    }

    // 2. Client-side Base64 reader fallback (works 100% on static sites)
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result); // Base64 DataURL
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <CatalogContext.Provider
      value={{
        products,
        loading,
        error,
        isBackendActive,
        createProduct,
        updateProduct,
        deleteProduct,
        toggleProductActive,
        resetCatalog,
        uploadImage,
        saveCatalog,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error('useCatalog must be used inside a CatalogProvider');
  }
  return ctx;
};

// Internal slugify helper
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
