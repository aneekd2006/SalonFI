import React from 'react';

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-dark active:bg-brand-dark shadow-sm',
  secondary: 'bg-white text-text-primary border border-border hover:border-border-strong active:bg-surface-elevated',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-elevated',
  danger: 'bg-status-busy-bg text-status-busy hover:bg-error-bg',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  children,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-semibold rounded-xl
        transition-all duration-150 ease-out
        active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{ minHeight: '44px' }}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {children}
        </span>
      ) : children}
    </button>
  );
}