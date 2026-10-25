// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Dashboard pages
import Profile from '../pages/dashboard/Profile';
import Orders from '../pages/dashboard/Orders';
import Wishlist from '../pages/dashboard/Wishlist';
import Addresses from '../pages/dashboard/Addresses';
import Settings from '../pages/dashboard/Settings';

// Misc
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root redirects to login for now */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public auth routes */}
      <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
      <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
      <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />

      {/* Protected dashboard routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Navigate to="/dashboard/profile" replace />} />
        <Route path="/dashboard/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/dashboard/orders" element={<PageTransition><Orders /></PageTransition>} />
        <Route path="/dashboard/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
        <Route path="/dashboard/addresses" element={<PageTransition><Addresses /></PageTransition>} />
        <Route path="/dashboard/settings" element={<PageTransition><Settings /></PageTransition>} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}