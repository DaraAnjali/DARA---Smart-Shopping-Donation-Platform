import React from 'react';
import './styles/EmptyCart.css';

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <h3>Your cart is empty!</h3>
      <p>Looks like you haven't added anything yet.</p>
    </div>
  );
};

export default EmptyCart;
