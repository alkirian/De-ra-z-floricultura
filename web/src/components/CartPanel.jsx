import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { generateWaLink } from '../data/mockData';
import { useCart } from '../context/CartContext';
import './CartPanel.css';

const buildCartMessage = (cart) => {
  const lines = [
    'Hola De Raiz! Quiero consultar estos productos:',
    '',
    ...cart.map((item, index) => `${index + 1}. ${item.name} (${item.category}) x${item.quantity}`),
    '',
    'Me confirman disponibilidad y precios, por favor?',
  ];
  return lines.join('\n');
};

const CartPanel = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  const handleSend = () => {
    const message = buildCartMessage(cart);
    window.open(generateWaLink(message), '_blank', 'noopener,noreferrer');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="cart-panel-backdrop" onClick={() => setIsCartOpen(false)}>
      <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <header className="cart-panel-head">
          <h3><ShoppingCart size={18} /> Mi consulta ({totalItems})</h3>
          <button type="button" onClick={() => setIsCartOpen(false)} aria-label="Cerrar panel">
            <X size={18} />
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Tu lista está vacía.</p>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <article key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <span>{item.category}</span>
                  <div className="cart-qty-row">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                    <button type="button" className="cart-delete" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <footer className="cart-panel-foot">
          <button type="button" className="btn btn-secondary w-full" onClick={clearCart} disabled={cart.length === 0}>
            Vaciar lista
          </button>
          <button type="button" className="btn btn-primary w-full" onClick={handleSend} disabled={cart.length === 0}>
            Enviar consulta por WhatsApp
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default CartPanel;
