// src/pages/auth/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../hooks/useAuth';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
} from '../../utils/validators';

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
  };

  const validate = () => {
    const newErrors = {
      firstName: validateName(formData.firstName, 'First name'),
      // middleName is optional — no validation
      lastName: validateName(formData.lastName, 'Last name'),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register({
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      navigate('/dashboard/profile', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join us and start shopping in seconds."
      footer={
        <>
          <span className="text-slate-500">Already have an account? </span>
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {serverError && <Alert variant="error">{serverError}</Alert>}

        {/* Name row: first + middle + last */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            autoComplete="given-name"
            error={errors.firstName}
            required
          />
          <Input
            label="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            autoComplete="family-name"
            error={errors.lastName}
            required
          />
        </div>

        <Input
          label="Middle name (Optional)"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          placeholder="Middle name"
          autoComplete="additional-name"
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
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
          placeholder="At least 8 characters"
          autoComplete="new-password"
          error={errors.password}
          required
        />

        <Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          error={errors.confirmPassword}
          required
        />

        <Button type="submit" fullWidth size="lg" loading={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </Button>

        <p className="text-center text-xs text-slate-500">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </form>
    </AuthLayout>
  );
}