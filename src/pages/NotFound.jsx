// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <p className="text-7xl font-bold text-blue-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/">
          <Button variant="secondary">Go home</Button>
        </Link>
        <Link to="/dashboard/profile">
          <Button>Go to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}