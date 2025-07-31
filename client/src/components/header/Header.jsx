import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="header-container">
      <div className="logo">
        <Link to={user ? '/home' : '/'}>KN</Link>
      </div>
      
      <div className="links">
        <ul>
          <li><Link to="/products">Home</Link></li>
          {/* Add other navigation links */}
        </ul>
      </div>
      
      <div className="user-section">
        {user ? (
          <>
            <span className="welcome-message">
              Welcome, {user.name.split(' ')[0]} {/* Show first name */}
            </span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-link">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;