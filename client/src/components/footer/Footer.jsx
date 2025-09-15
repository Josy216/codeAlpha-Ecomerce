import React from 'react';
import './footer.css';
import { FaYoutube, FaTelegram, FaEnvelope, FaPhone, FaInfoCircle, FaCog, FaBox, FaQuestionCircle, FaHome, FaShoppingCart, FaUserPlus, FaSignInAlt, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-column brand-column">
          <Link to="#" className="brand-link">
            <img src="/logo.jpg" alt="Jocode Logo" className="footer-logo" />
            <div className="brand-name">Jocode</div>
          </Link>
          <p className="brand-slogan">Nothing is for sale but to serve</p>
          <p className="copyright">
            © {new Date().getFullYear()} Jocode. All rights reserved.
          </p>
        </div>

        {/* Contact Column */}
        <div className="footer-column contact-column">
          <h3 className="footer-heading">Contact Us</h3>
          <div className="footer-links">
            <a
              href="https://youtube.com/@jocode216"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <FaYoutube /> YouTube
            </a>
            <a
              href="https://t.me/jocode216"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <FaTelegram /> Telegram
            </a>
            <a href="mailto:josyabteka@gmail.com" className="footer-link">
              <FaEnvelope /> Email
            </a>
            <a href="tel:+251962561350" className="footer-link">
              <FaPhone /> +251 962 561 350
            </a>
          </div>
        </div>
        {/* Links Column */}
        <div className="footer-column links-column">
          <h3 className="footer-heading">Useful Links</h3>
          <div className="footer-links">
            <Link to="/" className="footer-link">
              <FaHome /> Home
            </Link>
            <Link to="/products" className="footer-link">
              <FaBox /> Products
            </Link>
            <Link to="/howitwork" className="footer-link">
              <FaQuestionCircle /> How It Works
            </Link>
            <Link to="/register" className="footer-link">
              <FaUserPlus /> Register
            </Link>
            <Link to="/courseAdmin" className="footer-link">
              <FaInfoCircle /> Admin
            </Link>
            <Link to="/userslist" className="footer-link">
              <FaInfoCircle /> users
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;