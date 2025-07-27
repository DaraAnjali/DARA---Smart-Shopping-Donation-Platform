// src/pages/Donate.js
import React, { useState } from 'react';
import './styles/Donate.css';
import axios from 'axios';

const Donate = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [desc, setDesc] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [offerCode, setOfferCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed || !desc || !imageFile) {
      alert('Please fill in all fields and agree to the terms.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('dara_user')); // Must be set during login
    const userId = user?.email || 'guest';

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('description', desc);
    formData.append('userId', userId);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/upload-donation', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const code = response.data.code;
      setOfferCode(code);
      localStorage.setItem('dara_offer_code', code);
      localStorage.setItem('dara_offer_used', 'false');
      setSubmitted(true);

      // Clear form after submission (optional)
      setImageFile(null);
      setImagePreview('');
      setDesc('');
      setAgreed(false);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donate-container">
      <h2>Donate Clothes & Get a Discount</h2>

      {!submitted ? (
        <form className="donate-form" onSubmit={handleSubmit}>
          <label>
            Upload Item Image:
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          <label>
            Item Description:
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g. Used jeans, good condition..."
              required
            />
          </label>

          <div className="agreement">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>
              I agree that my donated item will be collected <strong>1 day before</strong> the delivery of my order.
            </span>
          </div>

          <button type="submit" className="submit-btn" disabled={!agreed || loading}>
            {loading ? 'Uploading...' : 'Donate Now'}
          </button>
        </form>
      ) : (
        <div className="thank-you">
          <h3>🎉 Thank you for donating!</h3>
          <p>Your one-time offer code is:</p>
          <p className="offer-code"><strong>{offerCode}</strong></p>
          <p>Use it at checkout to get <strong>10% OFF</strong>. Valid for 1 order only.</p>
        </div>
      )}
    </div>
  );
};

export default Donate;
