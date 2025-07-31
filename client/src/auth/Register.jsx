import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

function Register() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const usernameRef = useRef();
  const useremailRef = useRef();
  const userpasswordRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const username = usernameRef.current.value;
    const email = useremailRef.current.value;
    const password = userpasswordRef.current.value;

    if (!username || !email || !password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sending registration request...');
      const response = await axios.post('http://localhost:5000/api/register', {
        name: username,
        email,
        password,
      }, {
        timeout: 5000 // 5 second timeout
      });

      console.log('Registration response:', response);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email
        }));
        
        setSuccess(response.data.message);
        usernameRef.current.value = '';
        useremailRef.current.value = '';
        userpasswordRef.current.value = '';
        navigate('/login');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
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
    <div className="register-container">
      <div className="register-card">
        <figure className="logo-figure">
          <img src="/logo.jpg" alt="Company Logo" className="logo-img" />
          <figcaption className="logo-caption">Create Your Account</figcaption>
        </figure>
        
        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-group">
            <label htmlFor="username" className="form-label">Full Name</label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              placeholder="Enter full name"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              ref={useremailRef}
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
              ref={userpasswordRef}
              placeholder="Enter password"
              className="form-input"
              required
              minLength="6"
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
                  Registering...
                </>
              ) : 'Register'}
            </button>
          </div>
          <div className="login-redirect">
            Already have an account? <span onClick={() => navigate('/login')}>Login</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;