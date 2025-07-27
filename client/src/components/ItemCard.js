// ItemCard.js
import React from 'react';
import './ItemCard.css';

const ItemCard = ({ item, onClick, onAddToCart, added }) => {
  return (
    <div className="item-card" onClick={onClick}>
      <img src={item.image} alt={item.name} className="item-image" />
      <h3>{item.name}</h3>
      <p>{item.price}</p>
      <p>⭐ {item.rating}</p>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents navigating when clicking button
          onAddToCart();
        }}
        disabled={added}
      >
        {added ? '✓ Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ItemCard;



