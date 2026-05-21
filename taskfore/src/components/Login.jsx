import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { validateName, validateEmail, validatePassword } from '../utils/validation';
import usersData from '../data/users.json';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    general: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      general: ''
    };

    // Validate name
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
    }

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if user exists in the database
    const user = usersData.find(
      (u) =>
        u.name === formData.name &&
        u.email === formData.email &&
        u.password === formData.password
    );

    if (user) {
      // Login successful
      login({
        id: user.id,
        name: user.name,
        email: user.email
      });
      navigate('/home');
    } else {
      // Invalid credentials
      setErrors((prev) => ({
        ...prev,
        general: 'Invalid name, email, or password. Please try again.'
      }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo and Title */}
        <div className="login-header">
          <div className="logo">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 2L33 9.5L33 24.5L20 32L7 24.5L7 9.5Z"
                stroke="#6366f1"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1>TaskFlow</h1>
          <p className="login-subtitle">Sign in to manage your tasks</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {errors.general && (
            <div className="error-message general-error">{errors.general}</div>
          )}

          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">FULL NAME</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Deepak Kumar"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">PASSWORD</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Min 6 chars, 1 uppercase, 1 number"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'input-error' : ''}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  // Open Eye Icon
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#000"/>
                  </svg>
                ) : (
                  // Closed Eye Icon
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.81-2.94 3.69-4.95-2.5-4.5-7.04-7.5-11.25-7.5-1.33 0-2.61.19-3.83.53l2.4 2.4c.67-.23 1.38-.36 2.12-.36m9.89 1.38l-9.08 9.02c-.26.2-.56.32-.9.32-1.66 0-3-1.34-3-3 0-.34.12-.65.32-.9l9.66-9.66c2.12 1.69 3.91 3.94 5.02 6.59M2.1 2.1c-.39.39-.39 1.02 0 1.41l2.85 2.85C3.12 7.97 1.64 10.37 1 13c2.5 4.5 7.04 7.5 11.25 7.5 1.66 0 3.26-.25 4.75-.75l2.82 2.82c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L3.51 2.1c-.39-.39-1.02-.39-1.41 0z" fill="#000"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {/* Sign In Button */}
          <button type="submit" className="signin-button">
            Sign In →
          </button>

          {/* Password Requirements */}
          <p className="password-hint">
            Password must be 6+ characters with an uppercase letter and a number.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
