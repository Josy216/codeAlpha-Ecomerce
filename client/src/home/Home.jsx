import React from 'react';
import './home.css';

function Home() {
  
  const categories = [
    {
      id: 1,
      title: "Web Development",
      description: "Master HTML, CSS, JavaScript, React, and backend technologies with our comprehensive courses.",
      image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-4.1.0&auto=format&fit=crop&w=1080&q=80",
      link: "/products?category=web-development"
    },
    {
      id: 2,
      title: "App Development",
      description: "Build mobile apps with React Native, Flutter, and Swift. From beginner to advanced levels.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.1.0&auto=format&fit=crop&w=1080&q=80",
      link: "/products?category=app-development"
    },
    {
      id: 3,
      title: "Machine Learning",
      description: "Learn AI fundamentals, neural networks, and data science with Python and TensorFlow.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.1.0&auto=format&fit=crop&w=1080&q=80",
      link: "/products?category=machine-learning"
    },
    {
      id: 4,
      title: "Prompt Engineering",
      description: "Master AI interaction techniques and optimize your prompts for ChatGPT and other LLMs.",
      image: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?ixlib=rb-4.1.0&auto=format&fit=crop&w=1080&q=80",
      link: "/products?category=prompt-engineering"
    },
    {
      id: 5,
      title: "DevOps & Cloud",
      description: "Learn Docker, Kubernetes, AWS, and CI/CD pipelines to deploy applications at scale.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.1.0&auto=format&fit=crop&w=1080&q=80",
      link: "/products?category=devops"
    },
    {
      id: 6,
      title: "Free Dev Resources",
      description: "Access our curated collection of free tools and resources for developers at all levels.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.1.0&auto=format&fit=crop&w=1080&q=80",
      link: "https://jocode.devs.josephteka.com",
      external: true
    }
  ];
  return (
    <div className="home-container">
      
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1562813733-b31f71025d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTg1NjB8MHwxfHNlYXJjaHwxMHx8Y29kaW5nfGVufDB8fHx8MTc1Mzk2MDgwOHww&ixlib=rb-4.1.0&q=80&w=1080')`
      }}>
        <div className="hero-content">
          <h1>Welcome to Jocode Product Center</h1>
          <p className="slogan">Nothing is for sale — only what empowers your growth and scales your learning is worth offering.</p>

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
            <p>Check out our <a href="https://jocode-devtools.netlify.app/" target="_blank" rel="noopener noreferrer">Jocode Dev Tools</a> - A powerful all-in-one platform that curates 500+ essential developer tools.</p>
            <p>Built to help beginners avoid confusion and professionals save time, Jocode Dev Tools simplifies your dev journey with speed, clarity, and zero guesswork.</p>
          </div>
          <div className="service-card">
            <h3>Custom Solutions</h3>
            <p>We create custom software solutions that fit your business requirements perfectly.</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Explore Our Categories</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <div className="category-card" key={category.id}>
              <div 
                className="category-image" 
                style={{ backgroundImage: `url(${category.image})` }}
              ></div>
              <div className="category-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                {category.external ? (
                  <a 
                    href={category.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="explore-link"
                  >
                    Explore Resources
                  </a>
                ) : (
                  <a href={category.link} className="explore-link">
                    Explore Courses
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>

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
            <p>Check out our <a href="https://jocode.devs.josephteka.com" target="_blank" rel="noopener noreferrer">Jocode Dev Tool</a> - A powerful all-in-one platform that curates 500+ essential developer tools.</p>
            <p>Built to help beginners avoid confusion and professionals save time, Jocode Dev Tool simplifies your dev journey with speed, clarity, and zero guesswork.</p>
          </div>
          <div className="service-card">
            <h3>Custom Solutions</h3>
            <p>We create custom software solutions that fit your business requirements perfectly.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;