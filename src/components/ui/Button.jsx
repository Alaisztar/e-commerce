// src/components/ui/Button.jsx

const VARIANTS = {
  primary:
    'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md hover:shadow-blue-500/25 focus:ring-blue-500 disabled:bg-blue-300 disabled:shadow-none',
  secondary:
    'bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 hover:border-blue-300 shadow-sm hover:shadow focus:ring-blue-500 disabled:text-blue-300 disabled:border-blue-100 disabled:shadow-none',
  danger:
    'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md hover:shadow-red-500/25 focus:ring-red-500 disabled:bg-red-300 disabled:shadow-none',
  ghost:
    'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-400',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
        'disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100',
        VARIANTS[variant] || VARIANTS.primary,
        SIZES[size] || SIZES.md,
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading && (
        <span
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}