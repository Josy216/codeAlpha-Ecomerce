import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Jocode Store</h1>
        <div className="header-accent"></div>
      </div>
      
      <div className="about-section intro">
        <p>
          <strong>Jocode Store</strong> is a specialized e-commerce platform focused on providing high-quality, beginner-friendly, and practical tech courses. 
          While most e-commerce platforms focus on physical products, Jocode Store delivers digital learning resources, making it a unique and modern 
          learning destination for aspiring developers and tech enthusiasts.
        </p>
      </div>

      <div className="about-section mission">
        <div className="section-header">
          <span className="icon">🎯</span>
          <h2>Our Mission</h2>
        </div>
        <p>
          At Jocode, our mission is simple: <strong>“To simplify tech learning for everyone.”</strong> We do this by providing premium and free courses, tools, 
          and curated resources in a centralized store-like platform. This enables learners to pick what they need, when they need it, without getting overwhelmed.
        </p>
      </div>

      <div className="about-section offer">
        <div className="section-header">
          <span className="icon">📚</span>
          <h2>What We Offer</h2>
        </div>
        <ul>
          <li><strong>Web Development Courses:</strong> HTML, CSS, JavaScript, React, and backend stacks.</li>
          <li><strong>App Development:</strong> Mobile-first learning using modern frameworks like React Native and Flutter.</li>
          <li><strong>Machine Learning & AI:</strong> Entry-level to intermediate courses on AI, ML, and Prompt Engineering.</li>
          <li><strong>Free Certificate Platforms:</strong> Hand-picked external platforms where users can earn recognized certificates.</li>
          <li><strong>Jocode Dev Tool:</strong> Our all-in-one resource hub with over 500+ handpicked tools, code snippets, and roadmaps.</li>
        </ul>
      </div>

      <div className="about-section difference">
        <div className="section-header">
          <span className="icon">🧠</span>
          <h2>Why Jocode is Different</h2>
        </div>
        <p>
          Unlike traditional learning platforms, Jocode is built by learners, for learners. We focus on:
        </p>
        <ul>
          <li>Affordability — low cost or free access to high-quality resources.</li>
          <li>Practicality — hands-on coding projects and examples.</li>
          <li>Transparency — clear course outcomes and future skill maps.</li>
          <li>Scalability — instructors (like you in the future) can add new courses dynamically.</li>
        </ul>
      </div>

      <div className="about-section ecommerce">
        <div className="section-header">
          <span className="icon">🛒</span>
          <h2>Ecommerce? Yes, But Reimagined.</h2>
        </div>
        <p>
          While this project is labeled as an "ecommerce site," we've reimagined it to sell digital knowledge instead of physical items. Every course has
          a price (even if it's free), a checkout experience, a student dashboard, and access to community support. This aligns perfectly with ecommerce concepts while
          serving long-term educational value.
        </p>
      </div>

      <div className="about-section vision">
        <div className="section-header">
          <span className="icon">🌱</span>
          <h2>Future Vision</h2>
        </div>
        <p>
          Jocode will expand to include:
        </p>
        <ul>
          <li>User dashboards to track progress.</li>
          <li>Instructor accounts for uploading courses.</li>
          <li>Certificate generation after course completion.</li>
          <li>Community Q&A and mentorship features.</li>
        </ul>
      </div>

      <div className="about-quote">
        <p>“Don't just build an ecommerce site — build a platform that teaches, empowers, and scales with its users.”</p>
      </div>
    </div>
  );
};

export default About;