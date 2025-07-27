import React, { useContext } from 'react';
import './styles/CartSummary.css';
import { CartContext } from '../context/CartContext';

const CartSummary = () => {
  const { cartItems } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.priceNum, 0);

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      <p>Total Items: {cartItems.length}</p>
      <p>Total Price: ₹{total}</p>
    </div>
  );
};

export default CartSummary;
