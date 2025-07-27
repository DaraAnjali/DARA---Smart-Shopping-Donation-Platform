// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Donate from './pages/Donate';
import Cart from './pages/Cart';
import ItemDetails from './pages/ItemDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import OrderSuccess from './pages/OrderSuccess';
import { CartProvider } from './context/CartContext';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('dara_user');
    try {
      if (saved && saved !== 'undefined') {
        setUser(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Error parsing user from localStorage:', err);
      localStorage.removeItem('dara_user');
    }
  }, []);

  return (
    <CartProvider>
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
