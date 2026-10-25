// src/components/ui/PageTransition.jsx
export default function PageTransition({ children }) {
  return (
    <div className="animate-fadeInUp">{children}</div>
  );
}