// src/components/auth/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth();
  const location = useLocation();

  // While restoring session on refresh, don't redirect yet
  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-500 text-sm">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Remember where the user was trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}