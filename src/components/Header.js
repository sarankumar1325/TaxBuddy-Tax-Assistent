import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaUser, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Header.css';

const Header = ({ isDarkTheme, toggleTheme, isLoggedIn, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`header ${isDarkTheme ? 'dark' : 'light'}`}>
      <nav>
        <div className="logo animate-bounce">
          <Link to="/">TaxBuddy</Link>
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link-animate">Home</Link>
          <Link to="/chat" className="nav-link-animate">Chat</Link>
          <Link to="/about" className="nav-link-animate">About</Link>
        </div>

        <div className="mobile-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className="nav-icons">
          <button onClick={toggleTheme} className="icon-animate">
            {isDarkTheme ? <FaSun /> : <FaMoon />}
          </button>
          <Link to="/settings" className="icon-animate"><FaCog /></Link>
          <Link to="/profile" className="icon-animate"><FaUser /></Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="auth-button">Logout</button>
          ) : (
            <Link to="/login" className="auth-button">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
