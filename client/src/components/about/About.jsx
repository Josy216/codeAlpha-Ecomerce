import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Jocode Store</h1>
        <div className="header-accent"></div>
      </div>

      {/* Introduction */}
      <div className="about-section intro">
        <p>
          <strong>Jocode Store</strong> is a modern platform that redefines ecommerce and online education by combining the power of curated learning content with handpicked physical and digital tools. 
          While most platforms separate products from learning, Jocode Store unites them to empower future tech leaders, self-learners, and creators.
        </p>
      </div>

      {/* Mission */}
      <div className="about-section mission">
        <div className="section-header">
          <span className="icon">🎯</span>
          <h2>Our Mission</h2>
        </div>
        <p>
          At Jocode, our mission is simple: <strong>“To simplify tech learning and access to tools for everyone.”</strong> 
          Whether you're learning to code, building your first project, or looking for developer gear, Jocode is your one-stop store.
        </p>
      </div>

      {/* Offerings */}
      <div className="about-section offer">
        <div className="section-header">
          <span className="icon">📦</span>
          <h2>What We Offer</h2>
        </div>
        <ul>
          <li><strong>Premium & Free Tech Courses:</strong> Covering Web Dev (HTML, CSS, JavaScript, React, Node), AI, Prompt Engineering, and more.</li>
          <li><strong>Digital Learning Tools:</strong> Coding eBooks, cheat sheets, roadmaps, and templates from platforms like Google Books & IT Bookstore API.</li>
          <li><strong>Physical Tech Products:</strong> Curated electronics, developer clothing, accessories, gadgets, and workspace tools via APIs like DummyJSON.</li>
          <li><strong>Jocode Dev Tool:</strong> 500+ curated resources including code snippets, boilerplates, deployment kits, and more.</li>
          <li><strong>Certification & Job Readiness:</strong> Access to free certificate platforms and guided real-world project experience.</li>
        </ul>
      </div>

      {/* Why Jocode is Different */}
      <div className="about-section difference">
        <div className="section-header">
          <span className="icon">🚀</span>
          <h2>Why Jocode is Different</h2>
        </div>
        <p>
          Unlike other platforms that either sell products or offer courses, Jocode bridges both worlds. 
          It empowers users to learn and build — while also providing the necessary gear to support their journey.
        </p>
        <ul>
          <li>🧑‍💻 <strong>Built for Developers:</strong> By developers, for developers — the content, tools, and products all serve practical purposes.</li>
          <li>🛒 <strong>Smart Ecommerce:</strong> Users don’t just "buy" — they invest in tools that help them grow.</li>
          <li>🌍 <strong>Solves Real-World Problems:</strong> We equip learners with both skills and the physical tech essentials to succeed in today’s market.</li>
          <li>📈 <strong>Scalable Learning:</strong> As you grow, you can become a Jocode instructor and publish your own resources and courses.</li>
        </ul>
      </div>

      {/* Real-World Problem Solving */}
      <div className="about-section problems">
        <div className="section-header">
          <span className="icon">💡</span>
          <h2>Solving Real-World Problems</h2>
        </div>
        <p>
          Jocode is more than a store. It tackles key issues faced by learners and developers worldwide:
        </p>
        <ul>
          <li><strong>Lack of Structure:</strong> Roadmaps and guided projects ensure you always know your next step.</li>
          <li><strong>Overpriced Tools & Courses:</strong> Jocode offers affordable alternatives that maintain quality without breaking the bank.</li>
          <li><strong>Disconnected Ecosystems:</strong> You no longer need separate platforms for books, gear, and courses — Jocode centralizes it all.</li>
          <li><strong>Skill to Career:</strong> With real-world projects, certification, and a growing mentor network, users transition from students to professionals.</li>
        </ul>
      </div>

      {/* Vision */}
      <div className="about-section vision">
        <div className="section-header">
          <span className="icon">🌱</span>
          <h2>Vision for the Future</h2>
        </div>
        <p>
          As Jocode grows, we’re building:
        </p>
        <ul>
          <li>Student dashboards to track learning and purchases.</li>
          <li>Instructor portals for community-led course uploads.</li>
          <li>Gamified learning paths and certification flows.</li>
          <li>On-demand mentorship, community forums, and freelance gigs.</li>
        </ul>
      </div>

      {/* Final Quote */}
      <div className="about-quote">
        <p>“At Jocode, we're not just selling knowledge — we're building futures.”</p>
      </div>
    </div>
  );
};

export default About;
