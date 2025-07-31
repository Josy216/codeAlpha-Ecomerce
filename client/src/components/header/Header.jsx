import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <Link to={user ? '/home' : '/'} className="logo-link">
            <img src="/logo.jpg" alt="Company Logo" className="logo-img" />
            <span className="logo-text">Jocode</span>
          </Link>
        </div>

        {isMobile ? (
          <>
            <button 
              className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
              <nav className="nav-links">
                <ul>
                  <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                  <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
                  <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                  <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                </ul>
              </nav>
              
              <div className="user-actions">
                {user ? (
                  <div className="user-info">
                    <span className="welcome-message">
                      Welcome, <span className="user-name">{user.name.split(' ')[0]}</span>
                    </span>
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="auth-links">
                    <Link to="/login" className="login-link" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                    <Link to="/register" className="register-link" onClick={() => setIsMenuOpen(false)}>
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <nav className="nav-links">
              <ul>
                <li><Link to="/products">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </nav>
            
            <div className="user-actions">
              {user ? (
                <div className="user-info">
                  <span className="welcome-message">
                    Welcome, <span className="user-name">{user.name.split(' ')[0]}</span>
                  </span>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="auth-links">
                  <Link to="/login" className="login-link">
                    Sign In
                  </Link>
                  <Link to="/register" className="register-link">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;