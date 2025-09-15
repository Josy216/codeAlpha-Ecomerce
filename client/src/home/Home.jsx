import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const carouselImages = [
    {
      id: 1,
      image: "/jocode.jpg"
    },
    {
      id: 2,
      image: "/1.jpg",
    },
    {
      id: 3,
      image: "/2.jpg",
    },
    {
      id: 4,
      image: "/store.jpg",
    },
    {
      id: 5,
      image: "/fast.jpg",
    },
    {
      id: 6,
      image: "/programming.jpg",
    },
    {
      id: 7,
      image: "/1.jpg",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 60000); // Change slide every minute

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="home-container">
      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-container">
          {carouselImages.map((item, index) => (
            <div 
              key={item.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${item.image})` }}
            >
            
            </div>
          ))}
          <button className="carousel-control prev" onClick={prevSlide}>&#10094;</button>
          <button className="carousel-control next" onClick={nextSlide}>&#10095;</button>
          <div className="carousel-dots">
            {carouselImages.map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section - 100vh */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h2>Welcome to <span className="jocode-highlight">Jocode</span> Store</h2>
          <p className="slogan">
  Empowering your tech journey — whether you're writing your first line of code, launching a passion project, or searching for the right tools to build your future.  
  <strong>Jocode is where learning meets doing.</strong>


          </p>
          <div className="scrolling-indicator">
            <span>Scroll to explore</span>
            <div className="arrow-down"></div>
          </div>
        </div>
        <div className="welcome-gradient"></div>
      </section>

      {/* Mission Section - 40vh */}
      <section className="mission-section">
        <div className="mission-container">
          <h3>Our Mission</h3>
          <div className="mission-card">
            <div className="mission-icon">✨</div>
            <p>
              "To simplify tech learning and access to tools for everyone." 
              Whether you're learning to code, building your first project, 
              or looking for developer gear, Jocode is your one-stop store.
            </p>
          </div>
        </div>
      </section>

      {/* Offerings Section - 65vh */}
      <section className="offerings-section">
        <div className="offerings-container">
          <h3>What We Offer</h3>
          <div className="offerings-grid">
            <div className="offering-card">
              <div className="offering-icon">🎓</div>
              <h4>Tech Courses</h4>
              <p>Premium & Free courses in Web Dev and  App Development</p>
              <Link to="/course" 
              style={{color:'blue', textDecoration:'none'}}
            >Course</Link>
            </div>
            <div className="offering-card">
              <div className="offering-icon">📚</div>
              <h4>Learning Tools</h4>
              <p>EBooks, cheat sheets, roadmaps, and templates</p>
              <a href="https://t.me/jocode216" 
              style={{color:'blue', textDecoration:'none'}}
              target='_blank'>Jocode</a>
            </div>
            <div className="offering-card">
              <div className="offering-icon">💻</div>
              <h4>Tech Products</h4>
              <p>Curated electronics, developer gear and accessories</p>
              <Link to="/products" 
              style={{color:'blue', textDecoration:'none'}}
              >products</Link>
            </div>
            <div className="offering-card">
              <div className="offering-icon">🧰</div>
              <h4>Dev Resources</h4>
              <p>500+ curated code snippets and boilerplates</p>
              <a href="https://jocode.devs.josephteka.com" 
              style={{color:'blue', textDecoration:'none'}}
              target='_blank'>Jocode dev tool</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;