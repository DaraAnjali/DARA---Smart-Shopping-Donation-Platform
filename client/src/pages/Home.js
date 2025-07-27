// src/pages/Home.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';

const allItems = [
  { id: 1, name: 'T-Shirt', price: '₹499', priceNum: 499, rating: 4.5, image: '/assets/Features/f1.jpg' },
  { id: 2, name: 'Jeans', price: '₹999', priceNum: 999, rating: 4.0, image: '/assets/Features/f2.jpg' },
  { id: 3, name: 'Jacket', price: '₹1299', priceNum: 1299, rating: 5.0, image: '/assets/Features/f3.jpg' },
  { id: 4, name: 'Sneakers', price: '₹1499', priceNum: 1499, rating: 4.2, image: '/assets/Features/f4.jpg' },
  { id: 5, name: 'Cap', price: '₹299', priceNum: 299, rating: 3.8, image: '/assets/Features/f5.jpg' },
  { id: 6, name: 'Dress', price: '₹899', priceNum: 899, rating: 4.7, image: '/assets/Features/f6.jpg' },
  { id: 7, name: 'Kurti', price: '₹799', priceNum: 799, rating: 4.1, image: '/assets/Features/f7.jpg' },
  { id: 8, name: 'Scarf', price: '₹249', priceNum: 249, rating: 4.4, image: '/assets/Features/f8.jpg' },
  { id: 9, name: 'Sweatpants', price: '₹699', priceNum: 699, rating: 4.2, image: '/assets/Features/f9.jpg' },
  { id: 10, name: 'Leggings', price: '₹499', priceNum: 499, rating: 4.3, image: '/assets/Features/f10.jpg' },
  { id: 11, name: 'Formal Shirt', price: '₹799', priceNum: 799, rating: 4.1, image: '/assets/Features/f11.jpg' },
  { id: 12, name: 'Palazzo Pants', price: '₹599', priceNum: 599, rating: 4.3, image: '/assets/Features/f12.jpg' },
  { id: 13, name: 'Leather Jacket', price: '₹1999', priceNum: 1999, rating: 4.7, image: '/assets/Features/f13.jpg' },
  { id: 14, name: 'Denim Skirt', price: '₹649', priceNum: 649, rating: 4.2, image: '/assets/Features/f14.jpg' },
  { id: 15, name: 'Chinos', price: '₹899', priceNum: 899, rating: 4.0, image: '/assets/Features/f15.jpg' },
  { id: 16, name: 'Graphic Tee', price: '₹349', priceNum: 349, rating: 4.5, image: '/assets/Features/f16.jpg' },
  { id: 17, name: 'Puffer Jacket', price: '₹1599', priceNum: 1599, rating: 4.6, image: '/assets/Features/f17.jpg' },
  { id: 18, name: 'Crop Top', price: '₹399', priceNum: 399, rating: 4.3, image: '/assets/Features/f18.jpg' },
  { id: 19, name: 'Cargo Pants', price: '₹999', priceNum: 999, rating: 4.4, image: '/assets/Features/f19.jpg' },
  { id: 20, name: 'Party Dress', price: '₹1299', priceNum: 1299, rating: 4.5, image: '/assets/Features/f20.jpg' },
  { id: 21, name: 'Anarkali Kurti', price: '₹899', priceNum: 899, rating: 4.3, image: '/assets/Features/f21.jpg' },
  { id: 22, name: 'Canvas Shoes', price: '₹799', priceNum: 799, rating: 4.1, image: '/assets/Features/f22.jpg' },
  { id: 23, name: 'Tank Top', price: '₹299', priceNum: 299, rating: 4.0, image: '/assets/Features/f23.jpg' },
  { id: 24, name: 'Blazer', price: '₹1799', priceNum: 1799, rating: 4.6, image: '/assets/Features/f24.jpg' }
];

const itemsPerPage = 8;

const Home = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart(); 
  const getNumericPrice = (priceStr) => parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);
  const placeholders = new Array(itemsPerPage - currentItems.length).fill(null);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="hero-text">
          <h1>Welcome to DARA</h1>
          <p>Shop with Purpose. Donate with Kindness.</p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/shop')}>Shop Now</button>
            <button className="donate" onClick={() => navigate('/donate')}>Donate Clothes</button>
          </div>
        </div>
      </div>

      <div className="home-features">
        <h2>Why DARA?</h2>
        <div className="feature-list">
          <div className="feature-card">
            <img src="/assets/Shop/shop.png" alt="Shop" />
            <h3>Shop Trendy</h3>
            <p>Explore the latest fashion at great prices.</p>
          </div>
          <div className="feature-card">
            <img src="/assets/Donate/donate.png" alt="Donate" />
            <h3>Donate Clothes</h3>
            <p>Give your clothes a second life and support others.</p>
          </div>
          <div className="feature-card">
            <img src="/assets/discount.png" alt="Discounts" />
            <h3>Earn Discounts</h3>
            <p>Get discounts when your donation is approved.</p>
          </div>
        </div>
      </div>

      <div className="item-section">
        <h2>Our Featured Items</h2>
        <div className="item-grid-wrapper">
          <div className="item-grid">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="item-card"
                onClick={() => navigate(`/item/${item.id}`)}
                style={{ cursor: 'pointer' }}
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
                    addToCart({ 
      ...item, 
      priceNum: item.priceNum || getNumericPrice(item.price) 
    });
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
    </div>
  );
};

export default Home;
