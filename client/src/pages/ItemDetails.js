import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { useCart } from '../context/CartContext';

import './styles/ItemDetails.css';

const getNumericPrice = (priceStr) => parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;

const allItems = [
  { id: 1, name: 'T-Shirt', price: '₹499', rating: 4.5, brand: 'Roadster', desc: 'Cool cotton T-shirt', image: '/assets/Features/f1.jpg', sizes: ['S', 'M', 'L'] },
  { id: 2, name: 'Jeans', price: '₹999', rating: 4.0, brand: 'Levis', desc: 'Slim fit denim jeans', image: '/assets/Features/f2.jpg', sizes: ['M', 'L', 'XL'] },
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

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  const item = allItems.find((i) => i.id === parseInt(id));
  const related = allItems.filter(i => i.id !== parseInt(id)).slice(0, 8);

  const [added, setAdded] = useState(false);

  useEffect(() => {
    const already = cartItems.some(cartItem => cartItem.id === item?.id);
    setAdded(already);
  }, [id, item, cartItems]);

  if (!item) return <p>Item not found</p>;

  const handleAddToCart = () => {
    const updatedItem = {
      ...item,
      priceNum: item.priceNum || getNumericPrice(item.price),
    };
    addToCart(updatedItem);
    setAdded(true);
  };

  return (
    <div className="item-detail-container">
      <div className="item-main">
        <img src={item.image} alt={item.name} className="main-image" />
        <div className="item-info">
          <h2>{item.name}</h2>
          {item.brand && <p><strong>Brand:</strong> {item.brand}</p>}
          <p><strong>Price:</strong> {item.price}</p>
          <p><strong>Rating:</strong> ⭐ {item.rating}</p>
          {item.desc && <p>{item.desc}</p>}

          {Array.isArray(item.sizes) && item.sizes.length > 0 && (
            <div className="sizes">
              <strong>Sizes:</strong>
              {item.sizes.map((s) => (
                <span key={s} className="size-badge">{s}</span>
              ))}
            </div>
          )}

          <button onClick={handleAddToCart} className="add-btn" disabled={added}>
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>

      <h3>Related Items</h3>
      <div className="related-items">
        {related.map((rel) => {
          const isAdded = cartItems.some(cartItem => cartItem.id === rel.id);
          const handleRelatedAddToCart = () => {
            if (!isAdded) {
              const updatedRel = {
                ...rel,
                priceNum: rel.priceNum || getNumericPrice(rel.price),
              };
              addToCart(updatedRel);
            }
          };

          return (
            <ItemCard
              key={rel.id}
              item={rel}
              onClick={() => navigate(`/item/${rel.id}`)}
              onAddToCart={handleRelatedAddToCart}
              added={isAdded}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ItemDetails;
