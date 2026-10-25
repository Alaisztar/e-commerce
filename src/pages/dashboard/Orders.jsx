// src/pages/dashboard/Orders.jsx
import { Link } from 'react-router-dom';

export default function Orders() {
  return (
    <PlaceholderPage
      title="My Orders"
      description="Your order history will appear here."
      icon="📦"
      hint=""
    />
  );
}

function PlaceholderPage({ title, description, icon, hint }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <div className="rounded-xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-white p-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
          {icon}
        </div>
        <h2 className="text-lg font-semibold text-slate-900">
          Nothing here yet
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{hint}</p>
        <Link
          to="/dashboard/profile"
          className="mt-5 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to profile
        </Link>
      </div>
    </div>
  );
}