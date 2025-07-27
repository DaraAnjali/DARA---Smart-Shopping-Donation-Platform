// src/pages/Checkout.js
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import './styles/Checkout.css';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();

  const [selectedItems, setSelectedItems] = useState([]);
  const [enteredCode, setEnteredCode] = useState('');
  const [validDonationCode, setValidDonationCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [usedCodes, setUsedCodes] = useState([]);
  const [codeMessage, setCodeMessage] = useState('');

  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem('dara_selected_checkout')) || [];
    setSelectedItems(selected);

    const used = JSON.parse(localStorage.getItem('dara_used_codes')) || [];
    setUsedCodes(used);

    const donationCode = localStorage.getItem('dara_offer_code'); // ✅ key matches Donate.js
    if (donationCode) {
      setValidDonationCode(donationCode);
    }
  }, []);

  const subtotal = selectedItems.reduce((sum, item) => sum + (item.priceNum || 0), 0);
  const discount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const handleApplyCode = (e) => {
    e.preventDefault();

    if (enteredCode === validDonationCode && !usedCodes.includes(enteredCode)) {
      setDiscountApplied(true);
      setCodeMessage('✅ Discount code applied successfully!');
    } else if (usedCodes.includes(enteredCode)) {
      setCodeMessage('⚠️ This code has already been used.');
    } else {
      setCodeMessage('❌ Invalid code. Please try again.');
    }
  };

  const handleConfirmOrder = () => {
    const updatedCart = cartItems.filter(
      cartItem => !selectedItems.some(sel => sel.id === cartItem.id)
    );
    setCartItems(updatedCart);
    localStorage.setItem('dara_cart', JSON.stringify(updatedCart));

    // Save used code
    if (discountApplied && enteredCode && !usedCodes.includes(enteredCode)) {
      const updatedUsed = [...usedCodes, enteredCode];
      localStorage.setItem('dara_used_codes', JSON.stringify(updatedUsed));
    }

    // Cleanup
    localStorage.removeItem('dara_selected_checkout');
    localStorage.removeItem('dara_offer_code'); // ✅ remove correct key

    navigate('/order-success', {
      state: {
        items: selectedItems,
        subtotal,
        discount,
        total,
        discountApplied,
        discountCode: enteredCode,
      },
    });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {selectedItems.length === 0 ? (
        <p>No items selected for checkout.</p>
      ) : (
        <>
          <div className="checkout-items">
            {selectedItems.map(item => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div className="details">
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <p>Subtotal: ₹{subtotal}</p>

            <form onSubmit={handleApplyCode}>
              <div className="code-input">
                <input
                  type="text"
                  placeholder="Enter donation offer code"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                />
                <button type="submit">Apply Code</button>
              </div>
            </form>

            {codeMessage && <p className="code-message">{codeMessage}</p>}

            {discountApplied && (
              <>
                <p className="discount">
                  Discount (10%) using code <strong>{enteredCode}</strong>: -₹{discount}
                </p>
                <p className="donation-msg">
                  🎁 Your donation will be picked up <strong>1 day before delivery</strong>.
                </p>
              </>
            )}

            <h3>Total: ₹{total}</h3>

            <button className="confirm-btn" onClick={handleConfirmOrder}>
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
