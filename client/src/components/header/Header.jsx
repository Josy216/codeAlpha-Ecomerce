import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './header.css';

function Header({ cartItems }) {
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

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <header className="header-renamed">
      <div className="header-renamed__content">
        <div className="header-renamed__logo-container">
          <Link to={user ? '/' : '/'} className="header-renamed__logo-link">
            <img src="/logo.jpg" alt="Company Logo" className="header-renamed__logo-img" />
            <span className="header-renamed__logo-text">JocodeStore</span>
          </Link>
        </div>

        {isMobile ? (
          <>
            <div className="header-renamed__mobile-right">
              <Link to="/cart" className="header-renamed__cart-icon-mobile">
                <FaShoppingCart />
                {getTotalItems() > 0 && (
                  <span className="header-renamed__cart-count">{getTotalItems()}</span>
                )}
              </Link>
              <button 
                className={`header-renamed__hamburger ${isMenuOpen ? 'open' : ''}`} 
                onClick={toggleMenu}
                aria-label="Menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            
            <div className={`header-renamed__mobile-menu ${isMenuOpen ? 'open' : ''}`}>
              <nav className="header-renamed__nav-links">
                <ul>
                  <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
                  <li><Link to="/order" onClick={() => setIsMenuOpen(false)}>Order</Link></li>
                  <li><Link to="/course" onClick={() => setIsMenuOpen(false)}>Course</Link></li>
                  <li><Link to="/howitwork" onClick={() => setIsMenuOpen(false)}>How It Works</Link></li>
                  <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                </ul>
              </nav>
              
              <div className="header-renamed__user-actions">
                {user ? (
                  <div className="header-renamed__user-info">
                    <span className="header-renamed__welcome-message">
                      Welcome, <span className="header-renamed__user-name">{user.name.split(' ')[0]}</span>
                    </span>
                    <button onClick={handleLogout} className="header-renamed__logout-btn">
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="header-renamed__auth-links">
                    <Link to="/login" className="header-renamed__login-link" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <nav className="header-renamed__nav-links">
              <ul>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/order">Order</Link></li>
                <li><Link to="/course">Course</Link></li>
                <li><Link to="/howitwork">How It Works</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </nav>
            
            <div className="header-renamed__user-actions">
              <Link to="/cart" className="header-renamed__cart-icon">
                <FaShoppingCart />
                {getTotalItems() > 0 && (
                  <span className="header-renamed__cart-count">{getTotalItems()}</span>
                )}
              </Link>
              {user ? (
                <div className="header-renamed__user-info">
                  <span className="header-renamed__welcome-message">
                    Welcome, <span className="header-renamed__user-name">{user.name.split(' ')[0]}</span>
                  </span>
                  <button onClick={handleLogout} className="header-renamed__logout-btn">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="header-renamed__auth-links">
                  <Link to="/login" className="header-renamed__login-link">
                    Sign In
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