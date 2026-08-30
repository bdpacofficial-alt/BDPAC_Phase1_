import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({ children, className = '', hoverEffect = false, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/20 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xl transition-all duration-300 ${
        hoverEffect ? 'hover:shadow-2xl hover:-translate-y-1 hover:border-sky-500/50' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
