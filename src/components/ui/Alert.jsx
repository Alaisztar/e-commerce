// src/components/ui/Alert.jsx

const STYLES = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const ICONS = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i',
};

export default function Alert({ variant = 'info', children, className = '' }) {
  if (!children) return null;

  return (
    <div
      role="alert"
      className={[
        'flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm',
        STYLES[variant] || STYLES.info,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-current text-[10px] font-bold text-white"
        aria-hidden="true"
      >
        {ICONS[variant]}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  );
}