import React from 'react';
import './Howitwork.css';

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How Jocode Course Store Works</h2>
          <p className="subtitle">Your roadmap to mastering tech skills</p>
          <div className="divider"></div>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Browse Courses by Category</h3>
              <p>
                Explore categories including Web Development, App Development, Machine Learning, 
                AI, and more. Each contains hand-picked courses for all skill levels.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>View Course Details</h3>
              <p>
                Every course includes detailed descriptions, video previews, downloadable 
                resources, and practical projects to help you decide.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Register and Log In</h3>
              <p>
                Create an account to track your progress. Our secure authentication protects 
                your purchased courses and learning data.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Purchase or Enroll</h3>
              <p>
                Choose from free or premium courses. Premium purchases grant lifetime access 
                to content and all future updates.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>Learn at Your Own Pace</h3>
              <p>
                Access video lessons, notes, and assignments anytime, from any device. 
                Learn without pressure at your preferred speed.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">6</div>
            <div className="step-content">
              <h3>Earn Certificates</h3>
              <p>
                Get verifiable certificates upon completion to showcase on LinkedIn, resumes, 
                or job applications.
              </p>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">7</div>
            <div className="step-content">
              <h3>Explore Developer Tools</h3>
              <p>
                Access the Jocode Dev Tool — a curated library of 500+ essential resources to 
                accelerate your real-world projects.
              </p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <p>Ready to start your learning journey?</p>
          <button className="cta-button">Browse Courses</button>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;