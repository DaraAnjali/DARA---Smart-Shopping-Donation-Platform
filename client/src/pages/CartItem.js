import React, { useContext } from 'react';
import './styles/CartItem.css';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item, selected }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className={`cart-item ${selected ? 'selected-item' : ''}`}>
      <img src={item.image} alt={item.name} className="cart-img" />
      <div className="item-details">
        <h4>{item.name}</h4>
        <p>{item.price}</p>
        <p>⭐ {item.rating}</p>
        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
