import React from 'react';
import './Howitwork.css';
import { Link } from 'react-router-dom';

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How Jocode Course Store Works</h2>
          <p className="subtitle">Your complete guide to exploring, learning, and managing your account</p>
          <div className="divider"></div>
        </div>

        <div className="steps-container">
          {/* Step 1 - Browsing */}
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Browse Freely</h3>
              <p>
                Start by exploring our <Link to="/">homepage</Link> to see featured content. 
                Check out our <Link to="/products">products</Link> and <Link to="/course">courses</Link> pages 
                to discover all available learning resources. Learn more about us on the 
                <Link to="/about"> About page</Link>.
              </p>
            </div>
          </div>

          {/* Step 2 - Account Creation */}
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Create Your Account</h3>
              <p>
                To save items or make purchases, <Link to="/register">register</Link> with your name, 
                email, and password. Your email must be unique to our system. Already have an account? 
                Simply <Link to="/login">log in</Link> with your credentials.
              </p>
            </div>
          </div>

          {/* Step 3 - Adding to Cart */}
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Build Your Learning Plan</h3>
              <p>
                Add courses and products to your cart directly from their pages. 
                You can review all selected items in your <Link to="/cart">cart</Link>, 
                adjust quantities, or remove items before checkout.
              </p>
            </div>
          </div>

          {/* Step 4 - Checkout */}
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Secure Checkout</h3>
              <p>
                When ready, proceed to checkout from your cart. 
                Protected routes ensure your transaction is secure. 
                After purchase, you'll get lifetime access to all enrolled content.
              </p>
            </div>
          </div>

          {/* Step 5 - Account Management */}
          <div className="step-card">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>Manage Your Account</h3>
              <p>
                Forgot your password? Use our <Link to="/forgotpassword">password reset</Link> feature. 
                Access your enrolled courses and order history through your account dashboard.
              </p>
            </div>
          </div>

          {/* Step 6 - Security */}
          <div className="step-card">
            <div className="step-number">6</div>
            <div className="step-content">
              <h3>Secure Logout</h3>
              <p>
                Always remember to log out after your session, especially on shared devices. 
                Your security is important to us. The logout option is available in the header navigation.
              </p>
            </div>
          </div>

          {/* Admin Note */}
          <div className="step-card admin-note">
            <div className="step-number"><i className="fas fa-lock"></i></div>
            <div className="step-content">
              <h3>For Administrators</h3>
              <p>
                Admin users have additional privileges to add, edit, or remove courses through 
                protected admin dashboards. Regular users can only purchase and access content.
              </p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <p>Ready to start your learning journey with Jocode?</p>
          <Link to="/products" className="cta-button">Browse All products</Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;