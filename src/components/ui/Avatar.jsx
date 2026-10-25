// src/components/ui/Avatar.jsx
export default function Avatar({ firstName = '', lastName = '', size = 'md' }) {
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || '?';

  const sizes = {
    sm: 'h-9 w-9 text-sm',
    md: 'h-12 w-12 text-base',
    lg: 'h-20 w-20 text-2xl',
    xl: 'h-28 w-28 text-4xl',
  };

  return (
    <span
      className={`flex flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700 ${
        sizes[size] || sizes.md
      }`}
    >
      {initials}
    </span>
  );
}