import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartFloatButton.css';

const CartFloatButton = () => {
  const { totalItems, setIsCartOpen } = useCart();
  if (totalItems <= 0) return null;

  return (
    <button type="button" className="cart-float-btn" onClick={() => setIsCartOpen(true)} aria-label="Abrir lista de consulta">
      <ShoppingCart size={20} />
      <span>Mi lista</span>
      <span className="cart-float-badge">{totalItems}</span>
    </button>
  );
};

export default CartFloatButton;
