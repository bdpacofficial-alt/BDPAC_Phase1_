import React from 'react';

export function Badge({ children, variant = 'default', className = '' }: {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'gold';
  className?: string;
}) {
  const variantClasses = {
    default: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    gold: 'bg-amber-400/20 text-amber-700 dark:text-amber-300 border-amber-400/30 font-bold',
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}
