import { useState, useEffect } from 'react';

export function usePathname(): string {
  const getPath = () => {
    const hash = window.location.hash;
    if (hash.startsWith('#')) {
      const cleanHash = hash.slice(1).split('?')[0];
      return cleanHash || '/';
    }
    return window.location.pathname || '/';
  };

  const [pathname, setPathname] = useState<string>(getPath());

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(getPath());
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return pathname;
}

export function useRouter() {
  return {
    push: (href: string) => {
      window.location.hash = href;
    },
    replace: (href: string) => {
      window.location.hash = href;
    },
    back: () => {
      window.history.back();
    },
    forward: () => {
      window.history.forward();
    },
    refresh: () => {
      window.location.reload();
    },
  };
}

export function useSearchParams() {
  const getParams = () => {
    const search = window.location.search || (window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '');
    return new URLSearchParams(search);
  };

  const [params, setParams] = useState(getParams());

  useEffect(() => {
    const handleLocationChange = () => {
      setParams(getParams());
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return params;
}
