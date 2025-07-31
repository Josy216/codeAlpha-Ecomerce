import React from 'react';
import './home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1562813733-b31f71025d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTg1NjB8MHwxfHNlYXJjaHwxMHx8Y29kaW5nfGVufDB8fHx8MTc1Mzk2MDgwOHww&ixlib=rb-4.1.0&q=80&w=1080')`
      }}>
        <div className="hero-content">
          <h1>Welcome to Jocode Product Center</h1>
          <p className="slogan">Everything is for sale</p>
          <button className="cta-button">Explore Our Products</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>What We Provide</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Web Development Made Easy</h3>
            <p>Professional web development services tailored to your needs. From simple websites to complex web applications.</p>
          </div>
          <div className="service-card">
            <h3>Free Web Resources</h3>
            <p>Check out our <a href="https://jocode-dev-tool.example.com" target="_blank" rel="noopener noreferrer">Jocode Dev Tool</a> - A powerful all-in-one platform that curates 500+ essential developer tools.</p>
            <p>Built to help beginners avoid confusion and professionals save time, Jocode Dev Tool simplifies your dev journey with speed, clarity, and zero guesswork.</p>
          </div>
          <div className="service-card">
            <h3>Custom Solutions</h3>
            <p>We create custom software solutions that fit your business requirements perfectly.</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-methods">
          <a href="https://youtube.com/jocode" target="_blank" rel="noopener noreferrer" className="contact-link">
            <i className="fab fa-youtube"></i> YouTube
          </a>
          <a href="https://t.me/jocode" target="_blank" rel="noopener noreferrer" className="contact-link">
            <i className="fab fa-telegram"></i> Telegram
          </a>
          <a href="mailto:contact@jocode.com" className="contact-link">
            <i className="fas fa-envelope"></i> Email
          </a>
          <a href="tel:+1234567890" className="contact-link">
            <i className="fas fa-phone"></i> +1 (234) 567-890
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;