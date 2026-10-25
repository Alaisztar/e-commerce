// src/pages/dashboard/Settings.jsx
export default function Settings() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Notifications, privacy, and account preferences.
        </p>
      </div>

      <div className="rounded-xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-white p-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
          ⚙️
        </div>
        <h2 className="text-lg font-semibold text-slate-900">
          Settings coming soon
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Configure notifications, theme, and account preferences here.
        </p>
      </div>
    </div>
  );
}