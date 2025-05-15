// src/components/Auth/Auth.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import './Auth.css';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = location.pathname === '/signup';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '' // Only for signup
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (isSignup && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
        // Sign Up Logic
        const userCred = await createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        
        const uid = userCred.user.uid;
        const userRef = ref(db, `users/${uid}`);
        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
          await set(userRef, {
            email: formData.email,
            createdAt: new Date().toISOString(),
            timeSpent: 0,
            progress: {}
          });
        }
      } else {
        // Login Logic
        await signInWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
      }
      navigate('/home');
    } catch (err) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getFriendlyError = (code) => {
    switch (code) {
      case 'auth/invalid-credential':
        return 'Invalid email or password';
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/too-many-requests':
        return 'Account temporarily locked due to many failed attempts';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isSignup ? 'Get started with your account' : 'Sign in to continue'}</p>
        </div>

        {error && (
          <div className="auth-error">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder={isSignup ? "Create password (min 6 chars)" : "••••••••"}
                minLength={isSignup ? 6 : undefined}
                required
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {isSignup && (
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                minLength={6}
                required
              />
            </div>
          )}

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="auth-spinner"></span>
                {isSignup ? 'Creating account...' : 'Signing in...'}
              </span>
            ) : (
              isSignup ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        <div className="auth-footer">
          {isSignup ? (
            <>
              Already have an account?{' '}
              <a href="/login" className="auth-link">Sign in</a>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <a href="/signup" className="auth-link">Sign up</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}