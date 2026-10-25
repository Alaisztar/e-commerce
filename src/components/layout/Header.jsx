// src/components/layout/Header.jsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : '?';

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Left: mobile menu button + brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <span className="text-lg font-bold text-blue-600 lg:hidden">
          EcommerceApp
        </span>
      </div>

      {/* Right: user menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setMenuOpen((s) => !s)}
          className="flex items-center gap-3 rounded-lg p-1.5 pr-3 transition-colors hover:bg-slate-100"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            {initials}
          </span>
          <span className="hidden text-sm font-medium text-slate-700 sm:block">
            {user?.firstName} {user?.lastName}
          </span>
          <svg className="hidden h-4 w-4 text-slate-400 sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="truncate text-sm font-medium text-slate-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate('/dashboard/profile');
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              My Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full border-t border-slate-100 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}