// src/pages/dashboard/Profile.jsx
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../../components/ui/Avatar';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
} from '../../utils/validators';

export default function Profile() {
  const { user, updateProfile, loading } = useAuth();

  // ------- Personal info form -------
  const [info, setInfo] = useState({
    firstName: user?.firstName || '',
    middleName: user?.middleName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [infoErrors, setInfoErrors] = useState({});
  const [infoSuccess, setInfoSuccess] = useState('');
  const [infoError, setInfoError] = useState('');

  // ------- Change password form -------
  const [pw, setPw] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [pwErrors, setPwErrors] = useState({});
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwError, setPwError] = useState('');

  // ---------- Handlers: personal info ----------
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
    if (infoErrors[name]) setInfoErrors((prev) => ({ ...prev, [name]: '' }));
    if (infoSuccess) setInfoSuccess('');
    if (infoError) setInfoError('');
  };

  const validateInfo = () => {
    const errs = {
      firstName: validateName(info.firstName, 'First name'),
      lastName: validateName(info.lastName, 'Last name'),
      email: validateEmail(info.email),
      phone: validatePhone(info.phone),
    };
    setInfoErrors(errs);
    return !Object.values(errs).some(Boolean);
  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    if (!validateInfo()) return;

    try {
      await updateProfile({
        firstName: info.firstName.trim(),
        middleName: info.middleName.trim(),
        lastName: info.lastName.trim(),
        email: info.email.trim(),
        phone: info.phone.trim(),
        address: info.address.trim(),
      });
      setInfoSuccess('Profile updated successfully.');
      setTimeout(() => setInfoSuccess(''), 3000);
    } catch (err) {
      setInfoError(err.message || 'Failed to update profile.');
    }
  };

  // ---------- Handlers: password ----------
  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPw((prev) => ({ ...prev, [name]: value }));
    if (pwErrors[name]) setPwErrors((prev) => ({ ...prev, [name]: '' }));
    if (pwSuccess) setPwSuccess('');
    if (pwError) setPwError('');
  };

  const validatePw = () => {
    const errs = {
      currentPassword: !pw.currentPassword ? 'Current password is required' : '',
      newPassword: validatePassword(pw.newPassword),
      confirmPassword: validateConfirmPassword(pw.newPassword, pw.confirmPassword),
    };
    setPwErrors(errs);
    return !Object.values(errs).some(Boolean);
  };

  const handlePwSubmit = async (e) => {
    e.preventDefault();
    if (!validatePw()) return;

    // Phase 1: fake success. Phase 2: call API endpoint.
    await new Promise((res) => setTimeout(res, 700));
    setPw({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPwSuccess('Password changed successfully.');
    setTimeout(() => setPwSuccess(''), 3000);
  };

  // ---------- Summary cards (placeholder numbers) ----------
  const stats = [
    { label: 'Orders', value: 0, accent: 'bg-blue-50 text-blue-700' },
    { label: 'Wishlist', value: 0, accent: 'bg-pink-50 text-pink-700' },
    { label: 'Addresses', value: info.address ? 1 : 0, accent: 'bg-emerald-50 text-emerald-700' },
    { label: 'Reviews', value: 0, accent: 'bg-amber-50 text-amber-700' },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information and account security.
        </p>
      </div>

      {/* Identity card */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 transition-shadow hover:shadow-md">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Avatar
            firstName={user?.firstName}
            lastName={user?.lastName}
            size="lg"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-900">
              {user?.firstName} {user?.middleName ? `${user.middleName} ` : ''}
              {user?.lastName}
            </h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <p className="mt-1 text-xs text-slate-400">
              Member since {user?.createdAt || 'today'}
            </p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-700">
            {user?.role}
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 transition-shadow hover:shadow-md"
          >
            <p className="text-xs font-medium text-slate-500">{s.label}</p>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">
                {s.value}
              </span>
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${s.accent}`}
              >
                total
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Personal information form */}
      <form
        onSubmit={handleInfoSubmit}
        noValidate
        className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 transition-shadow hover:shadow-md"
      >
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-900">
            Personal Information
          </h3>
          <p className="text-sm text-slate-500">
            Update your name, contact details, and shipping address.
          </p>
        </div>

        {infoSuccess && <Alert variant="success" className="mb-4">{infoSuccess}</Alert>}
        {infoError && <Alert variant="error" className="mb-4">{infoError}</Alert>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="First name"
            name="firstName"
            value={info.firstName}
            onChange={handleInfoChange}
            error={infoErrors.firstName}
            required
          />
          <Input
            label="Last name"
            name="lastName"
            value={info.lastName}
            onChange={handleInfoChange}
            error={infoErrors.lastName}
            required
          />
        </div>

        <div className="mt-4">
          <Input
            label="Middle name"
            name="middleName"
            value={info.middleName}
            onChange={handleInfoChange}
            placeholder="Optional"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Email"
            name="email"
            type="email"
            value={info.email}
            onChange={handleInfoChange}
            error={infoErrors.email}
            required
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={info.phone}
            onChange={handleInfoChange}
            placeholder="+63 912 345 6789"
            error={infoErrors.phone}
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="address"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Shipping address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            value={info.address}
            onChange={handleInfoChange}
            placeholder="House number, street, city, province, ZIP"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="mt-5 flex justify-end">
          <Button type="submit" loading={loading}>
            {loading ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </form>

      {/* Change password form */}
      <form
        onSubmit={handlePwSubmit}
        noValidate
        className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 transition-shadow hover:shadow-md"
      >
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-900">
            Change Password
          </h3>
          <p className="text-sm text-slate-500">
            Use a strong password you don't reuse on other sites.
          </p>
        </div>

        {pwSuccess && <Alert variant="success" className="mb-4">{pwSuccess}</Alert>}
        {pwError && <Alert variant="error" className="mb-4">{pwError}</Alert>}

        <div className="space-y-4">
          <Input
            label="Current password"
            name="currentPassword"
            type="password"
            value={pw.currentPassword}
            onChange={handlePwChange}
            error={pwErrors.currentPassword}
            autoComplete="current-password"
            required
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="New password"
              name="newPassword"
              type="password"
              value={pw.newPassword}
              onChange={handlePwChange}
              error={pwErrors.newPassword}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              required
            />
            <Input
              label="Confirm new password"
              name="confirmPassword"
              type="password"
              value={pw.confirmPassword}
              onChange={handlePwChange}
              error={pwErrors.confirmPassword}
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Button type="submit" variant="secondary">
            Update password
          </Button>
        </div>
      </form>
    </div>
  );
}