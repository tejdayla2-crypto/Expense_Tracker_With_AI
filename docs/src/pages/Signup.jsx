// src/pages/Signup.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await signup(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-form-side fade-in">
        <Link to="/" className="auth-logo">Ledger</Link>
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">Free forever. No credit card needed.</p>

        {error && <div className="form-global-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="signup-email">Email</label>
            <input className="input" type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} required id="signup-email" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="signup-password">Password</label>
            <input className="input" type="password" placeholder="Min 6 characters"
              value={password} onChange={e => setPassword(e.target.value)} required id="signup-password" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
            <input className="input" type="password" placeholder="Repeat password"
              value={confirm} onChange={e => setConfirm(e.target.value)} required id="signup-confirm" />
          </div>
          <button type="submit" className="btn btn-primary auth-submit" disabled={loading} id="signup-submit">
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>

      <div className="auth-visual">
        <p className="auth-visual-quote">
          An AI that <em>acts on your behalf</em> — logs, categorises, answers — backed by real database operations, not chat.
        </p>
        <div className="auth-stats">
          <div className="auth-stat">
            <span className="auth-stat-value">10</span>
            <span className="auth-stat-label">built-in agent tools</span>
          </div>
          <div className="auth-stat">
            <span className="auth-stat-value">∞</span>
            <span className="auth-stat-label">expenses you can track</span>
          </div>
          <div className="auth-stat">
            <span className="auth-stat-value">1</span>
            <span className="auth-stat-label">source of truth — chat = dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
