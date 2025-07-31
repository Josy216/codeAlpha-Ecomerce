import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // reuse same CSS

function ResetPassword() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    const email = emailRef.current.value;
    const name = nameRef.current.value;

    if (!email || !name) {
      setError('Email and name are required');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.delete('http://localhost:5000/api/login/id', {
        data: { email, name }, // DELETE uses `data` field
        timeout: 5000
      });

      if (response.data.success) {
        setSuccess(response.data.message);
        setTimeout(() => navigate('/register'), 2500);
      } else {
        setError(response.data.message || 'Reset failed');
      }
    } catch (err) {
      console.error('Reset error:', err);
      if (err.response) {
        setError(err.response.data?.message || 'Server error occurred');
      } else if (err.request) {
        setError('No response from server. Please try again.');
      } else {
        setError('Request failed. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <figure className="logo-figure">
          <img src="/logo.jpg" alt="Logo" className="logo-img" />
          <figcaption className="logo-caption">Reset Account</figcaption>
        </figure>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              placeholder="Enter your email"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              placeholder="Confirm your full name"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Resetting...
                </>
              ) : 'Confirm & Reset'}
            </button>
          </div>

          <div className="register-redirect">
            Changed your mind? <span onClick={() => navigate('/login')}>Back to Login</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
