// src/pages/auth/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { validateEmail } from '../../utils/validators';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setLoading(true);
    setError('');

    // Simulate network request — replace with real API call in Phase 2
    await new Promise((res) => setTimeout(res, 800));

    setLoading(false);
    setSent(true);
  };

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to sign in
        </Link>
      }
    >
      {sent ? (
        <Alert variant="success">
          <p className="font-medium">Check your email</p>
          <p className="mt-1 text-xs">
            If an account exists for <strong>{email}</strong>, you'll receive a
            password reset link shortly.
          </p>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="Email Address"
            autoComplete="email"
            error={error}
            required
          />

          <Button type="submit" fullWidth size="lg" loading={loading}>
            {loading ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}