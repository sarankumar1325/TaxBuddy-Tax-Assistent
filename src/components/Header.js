import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaBars, FaTimes, FaBell, FaCog, FaUser, FaUsers } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/Header.css';

const Header = ({ theme, toggleTheme, isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo" onClick={closeMenu}>
          TaxBuddy
        </Link>
      </div>

      <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Toggle menu">
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`header-center ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/chat" className="nav-link" onClick={closeMenu}>
          Chat
        </Link>
        <Link to="/learn" className="nav-link" onClick={closeMenu}>
          Learn
        </Link>
        <Link to="/social" className="nav-link" onClick={closeMenu}>
          Social
        </Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>
          About
        </Link>
      </nav>

      <div className="header-right">
        <div className={`nav-items ${isMenuOpen ? 'active' : ''}`}>
          <div className="icon-group" style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <FaMoon size={16} /> : <FaSun size={16} />}
            </button>
            <Link to="/notifications" className="nav-link" onClick={closeMenu}>
              <FaBell size={16} />
            </Link>
            <Link to="/settings" className="nav-link" onClick={closeMenu}>
              <FaCog size={16} />
            </Link>
            <Link to="/profile" className="nav-link" onClick={closeMenu}>
              <FaUser size={16} />
            </Link>
          </div>
          <div className="auth-group" style={{ display: 'flex', gap: '0.5rem' }}>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="auth-link logout-btn">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="auth-link" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/signup" className="auth-link signup-btn" onClick={closeMenu}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
