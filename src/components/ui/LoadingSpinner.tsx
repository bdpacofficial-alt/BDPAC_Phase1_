import React from 'react';

export function LoadingSpinner({ size = 'md', label = 'Loading...' }: { size?: 'sm' | 'md' | 'lg'; label?: string }) {
  const sizeClass = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  }[size];

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <div className={`${sizeClass} border-sky-500 border-t-transparent rounded-full animate-spin`} />
      {label && <p className="text-xs font-medium text-slate-500 dark:text-slate-400 animate-pulse">{label}</p>}
    </div>
  );
}
