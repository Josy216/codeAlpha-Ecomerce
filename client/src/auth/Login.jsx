import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { ScaleLoader } from "react-spinners";


function Login() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      }, {
        timeout: 5000
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/order');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
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
          <img src="/logo.jpg" alt="Company Logo" className="logo-img" />
          <figcaption className="logo-caption">Welcome Back</figcaption>
        </figure>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
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
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Enter password"
              className="form-input"
              required
              minLength="6"
            />
          </div>
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="forgot-password" onClick={() => navigate('/forgotpassword')}>
              Forgot password?
            </div>
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
                  <ScaleLoader />
                </>
              ) : 'Login'}
            </button>
          </div>
          <div className="register-redirect">
            Don't have an account? <span onClick={() => navigate('/register')}>Register</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;