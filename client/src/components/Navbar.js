import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = ({ user, setUser }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const getLinkStyle = ({ isActive }) => ({
  color: '#53B6E8',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 'bold',
  paddingBottom: '4px',
  borderBottom: isActive ? '2px solid #53B6E8' : '2px solid transparent',
});


  const handleLogout = () => {
    localStorage.removeItem('dara_user');
    setUser(null);
    setShowDropdown(false);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <NavLink to="/"><img src="/assets/logo.png" alt="DARA Logo" style={styles.logoImage} /></NavLink>
        <NavLink to="/" style={getLinkStyle}>Home</NavLink>
        <NavLink to="/shop" style={getLinkStyle}>Shop</NavLink>
        <NavLink to="/donate" style={getLinkStyle}>Donate</NavLink>
        <NavLink to="/cart" style={getLinkStyle}>Cart</NavLink>
      </div>

      <div style={styles.center}>
        <input type="text" placeholder="Search products..." style={styles.searchInput} />
      </div>

      <div style={styles.right}>
        {!user ? (
          <>
            <NavLink to="/login" style={getLinkStyle}>Login</NavLink>
            <NavLink to="/register" style={getLinkStyle}>Register</NavLink>
          </>
        ) : (
          <div style={{ position: 'relative' }}>
            <div onClick={() => setShowDropdown(!showDropdown)} style={styles.profileIcon}>👤</div>
            {showDropdown && (
              <div style={styles.dropdown}>
                <p style={styles.dropdownItem}><strong>{user.name}</strong></p>
                <p style={styles.dropdownItem}>{user.email}</p>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: '#FAF2E8',
    color: '#333',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    boxShadow: '0 4px 12px rgba(83, 182, 232, 0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  center: {
    flex: 1,
    textAlign: 'center',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  logoImage: {
    height: '40px',
    width: 'auto',
  },
  searchInput: {
    padding: '0.5rem 1rem',
    width: '60%',
    maxWidth: '400px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    outline: 'none',
  },
  profileIcon: {
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  dropdown: {
    position: 'absolute',
    top: '35px',
    right: 0,
    background: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '5px',
    padding: '10px',
    width: '200px',
    zIndex: 999,
  },
  dropdownItem: {
    margin: '5px 0',
  },
  logoutBtn: {
    backgroundColor: '#53B6E8',
    color: 'white',
    border: 'none',
    padding: '8px',
    width: '100%',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};

export default Navbar;
