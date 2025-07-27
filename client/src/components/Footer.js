import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="/assets/logo.png" alt="DARA Logo" />
        <p>Fashion with a cause.</p>
      </div>

      <div className="footer-links">
        <div>
          <h4>About Us</h4>
          <p>We aim to make fashion affordable & responsible.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: support@dara.com</p>
          <p>Phone: +91-99999-99999</p>
        </div>
        <div>
          <h4>Follow Us</h4>
          <p>Instagram | Facebook | Twitter</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DARA. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
