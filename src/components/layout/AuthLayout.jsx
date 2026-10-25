// src/components/layout/AuthLayout.jsx
import { Link } from 'react-router-dom';

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left: branding panel (hidden on mobile) */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 text-white lg:flex">
        <Link to="/" className="text-2xl font-bold">
          EcommerceApp
        </Link>

        <div className="max-w-md">
          <h2 className="mb-4 text-4xl font-bold leading-tight">
            Shop smarter, not harder.
          </h2>
          <p className="text-blue-100">
            Your one-stop shop for everything you need — delivered to your
            doorstep.
          </p>

          <div className="mt-10 space-y-3 text-sm text-blue-100">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                ✓
              </span>
              Secure account management
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                ✓
              </span>
              Track your orders in real time
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                ✓
              </span>
              Save your favorite items
            </div>
          </div>
        </div>

        <p className="text-xs text-blue-200">
          © {new Date().getFullYear()} EcommerceApp. All rights reserved.
        </p>
      </div>

      {/* Right: form area */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile brand */}
          <Link
            to="/"
            className="mb-8 block text-center text-2xl font-bold text-blue-600 lg:hidden"
          >
            EcommerceApp
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
            )}
          </div>

          {children}

          {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
        </div>
      </div>
    </div>
  );
}