// src/utils/validators.js

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!regex.test(email)) return 'Please enter a valid email address';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return '';
};

export const validateRequired = (value, fieldName) => {
  if (!value || !value.trim()) return `${fieldName} is required`;
  return '';
};

export const validateName = (name, fieldName) => {
  if (!name || !name.trim()) return `${fieldName} is required`;
  if (name.trim().length < 2) return `${fieldName} must be at least 2 characters`;
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return `${fieldName} contains invalid characters`;
  return '';
};

export const validatePhone = (phone) => {
  if (!phone) return ''; // optional field
  const regex = /^[\d\s+()-]{7,20}$/;
  if (!regex.test(phone)) return 'Please enter a valid phone number';
  return '';
};

// Runs a set of validators and returns the first error found (or '')
export const runValidators = (validators) => {
  for (const validator of validators) {
    const error = validator();
    if (error) return error;
  }
  return '';
};