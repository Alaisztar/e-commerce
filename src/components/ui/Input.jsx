// src/components/ui/Input.jsx
import { useState } from 'react';

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error = '',
  placeholder = '',
  required = false,
  autoComplete,
  disabled = false,
  className = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={[
            'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900',
            'placeholder:text-slate-400',
            'transition-all duration-150 focus:outline-none',
            'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
              : 'border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-slate-400',
            isPassword ? 'pr-11' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-xs font-medium text-slate-500 hover:text-slate-700"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}