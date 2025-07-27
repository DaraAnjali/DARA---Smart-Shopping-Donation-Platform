// src/pages/OrderSuccess.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/OrderSuccess.css'; // reuse same styles if you want

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    items = [],
    subtotal = 0,
    discount = 0,
    total = 0,
    discountApplied = false,
    discountCode = ''
  } = location.state || {};

  return (
    <div className="order-success-container">
      <h2>✅ Order Successful!</h2>
      <p>Your order has been placed successfully.</p>

      <h4>Order Summary</h4>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>

      <p>Subtotal: ₹{subtotal}</p>
      {discountApplied && (
        <>
          <p>Discount (10%) with code <strong>{discountCode}</strong>: -₹{discount}</p>
          <p className="donation-msg">🎁 Your donation will be picked up <strong>1 day before delivery</strong>.</p>
        </>
      )}
      <h3>Total Paid: ₹{total}</h3>

      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default OrderSuccess;
