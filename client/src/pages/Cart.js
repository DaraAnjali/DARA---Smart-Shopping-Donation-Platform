import React, { useContext, useState } from 'react';
import './styles/Cart.css';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => selectedIds.includes(item.id));
    if (selectedItems.length === 0) {
      alert('Please select at least one item to proceed.');
      return;
    }
    localStorage.setItem('dara_selected_checkout', JSON.stringify(selectedItems));
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-select-wrapper">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  className="cart-select-checkbox"
                />
                <CartItem item={item} />
              </div>
            ))}
          </div>

          <div className="cart-actions">
            <CartSummary selectedIds={selectedIds} />
            <button
              onClick={handleCheckout}
              className={`checkout-btn ${selectedIds.length === 0 ? 'disabled' : ''}`}
              disabled={selectedIds.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

