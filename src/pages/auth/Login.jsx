// src/pages/auth/Login.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validateRequired } from '../../utils/validators';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const from = location.state?.from?.pathname || '/dashboard/profile';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
  };

  const validate = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validateRequired(formData.password, 'Password'),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login(formData.email.trim(), formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue."
      footer={
        <>
          <span className="text-slate-500">Don't have an account? </span>
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {serverError && <Alert variant="error">{serverError}</Alert>}

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          autoComplete="email"
          error={errors.email}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="current-password"
          error={errors.password}
          required
        />

        <div className="flex items-center justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

    </AuthLayout>
  );
}