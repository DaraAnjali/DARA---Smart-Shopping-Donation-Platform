import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Shop.css';
import allItems from '../data/itemsData';
import { useCart } from '../context/CartContext';

const itemsPerPage = 8;

const Shop = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [minRating, setMinRating] = useState(0);

  // Prepare priceNum if not already
  const preparedItems = allItems.map(item => ({
    ...item,
    priceNum: item.priceNum || parseFloat(item.price.replace(/[^\d.]/g, '')),
  }));

  const filteredItems = preparedItems
    .filter(item => item.rating >= minRating)
    .sort((a, b) => {
      if (sortBy === 'low') return a.priceNum - b.priceNum;
      if (sortBy === 'high') return b.priceNum - a.priceNum;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  const placeholders = new Array(itemsPerPage - currentItems.length).fill(null);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="shop-container">
      <h2 className="shop-title">Explore Our Collection</h2>

      <div className="shop-filters">
        <div>
          <label>Sort By: </label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="low">Price Low to High</option>
            <option value="high">Price High to Low</option>
            <option value="rating">Rating High to Low</option>
          </select>
        </div>
        <div>
          <label>Min Rating: </label>
          <select value={minRating} onChange={e => setMinRating(Number(e.target.value))}>
            <option value="0">Any</option>
            <option value="3">⭐ 3+</option>
            <option value="4">⭐ 4+</option>
            <option value="4.5">⭐ 4.5+</option>
          </select>
        </div>
      </div>

      <div className="item-grid-wrapper">
        <div className="item-grid">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="item-card"
              onClick={() => navigate(`/item/${item.id}`)}
            >
              <div className="item-image-container">
                <img src={item.image} alt={item.name} />
              </div>
              <h3>{item.name}</h3>
              <p className="price">{item.price}</p>
              <p className="rating">⭐ {item.rating}</p>
              <button
                className="add-to-cart"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
          {placeholders.map((_, index) => (
            <div className="item-card placeholder" key={`empty-${index}`}></div>
          ))}
        </div>
      </div>

      <div className="pagination-buttons">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Shop;
