import { useCallback, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import Button from '../components/Button';
import './Auth.css';

const inputClass =
  'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500';

function SignUp() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [passwordError, setPasswordError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const name = formData.get('name') ?? '';
      const email = formData.get('email') ?? '';
      const password = formData.get('password') ?? '';
      const confirmPassword = formData.get('confirmPassword') ?? '';

      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }
      setPasswordError('');
      // TODO: wire to auth API / RTK Query
      console.log('Sign up', { name, email, password });
      navigate('/');
    },
    [navigate]
  );

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Sign up</h1>
        <p className="auth-subtitle">Create a new account</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="signup-name" className="auth-label">
              Name
            </label>
            <input
              id="signup-name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className={inputClass}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="signup-email" className="auth-label">
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="signup-password" className="auth-label">
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="signup-confirm-password" className="auth-label">
              Confirm password
            </label>
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className={inputClass}
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? 'signup-password-error' : undefined}
            />
            {passwordError && (
              <p id="signup-password-error" className="auth-error" role="alert">
                {passwordError}
              </p>
            )}
          </div>
          <Button type="submit" variant="primary" className="auth-submit">
            Sign up
          </Button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
