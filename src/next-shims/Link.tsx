import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export default function Link({ href, children, onClick, className, ...props }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && href && href.startsWith('/')) {
      e.preventDefault();
      window.location.hash = href;
    }
  };

  const hashHref = href && href.startsWith('/') ?  : href;

  return (
    <a href={hashHref} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
