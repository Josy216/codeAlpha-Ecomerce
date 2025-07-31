import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-column brand-column">
          <a href="#" className="brand-link">
            <img src="/logo.jpg" alt="Jocode Logo" className="footer-logo" />
            <div className="brand-name">Jocode</div>
          </a>
          <p className="brand-slogan">Everything is for sale</p>
          <p className="copyright">© {new Date().getFullYear()} Jocode. All rights reserved.</p>
        </div>

        {/* Contact Column */}
        <div className="footer-column contact-column">
          <h3 className="footer-heading">Contact Us</h3>
          <div className="footer-links">
            <a href="https://youtube.com/jocode" target="_blank" rel="noopener noreferrer" className="footer-link">
              <i className="fab fa-youtube"></i> YouTube
            </a>
            <a href="https://t.me/jocode" target="_blank" rel="noopener noreferrer" className="footer-link">
              <i className="fab fa-telegram"></i> Telegram
            </a>
            <a href="mailto:contact@jocode.com" className="footer-link">
              <i className="fas fa-envelope"></i> Email
            </a>
            <a href="tel:+1234567890" className="footer-link">
              <i className="fas fa-phone"></i> +1 (234) 567-890
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div className="footer-column links-column">
          <h3 className="footer-heading">Useful Links</h3>
          <div className="footer-links">
            <a href="/about" className="footer-link">
              <i className="fas fa-info-circle"></i> About Us
            </a>
            <a href="/services" className="footer-link">
              <i className="fas fa-cog"></i> Services
            </a>
            <a href="/products" className="footer-link">
              <i className="fas fa-box"></i> Products
            </a>
            <a href="/how-it-works" className="footer-link">
              <i className="fas fa-question-circle"></i> How It Works
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;