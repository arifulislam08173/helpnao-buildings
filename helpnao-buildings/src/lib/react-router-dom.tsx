'use client';

import * as React from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter, useParams as useNextParams } from 'next/navigation';

type To = string;

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: To;
  replace?: boolean;
  state?: unknown;
};

type NavLinkClassName =
  | string
  | ((state: { isActive: boolean; isPending: boolean }) => string | undefined);

export type NavLinkProps = Omit<LinkProps, 'className'> & {
  className?: NavLinkClassName;
};

export function Link({ to, children, replace, onClick, ...props }: LinkProps) {
  return (
    <NextLink href={to} replace={replace} onClick={onClick} {...props}>
      {children}
    </NextLink>
  );
}

export function NavLink({
  to,
  children,
  className,
  replace,
  onClick,
  ...props
}: NavLinkProps) {
  const pathname = usePathname() ?? '';
  const isActive = pathname === to || (to !== '/' && pathname.startsWith(to));
  const resolvedClassName =
    typeof className === 'function'
      ? className({ isActive, isPending: false })
      : className;

  return (
    <NextLink
      href={to}
      replace={replace}
      onClick={onClick}
      className={resolvedClassName}
      {...props}
    >
      {children}
    </NextLink>
  );
}

function getCurrentSearch() {
  if (typeof window === 'undefined') return '';
  return window.location.search || '';
}

export function useLocation() {
  const pathname = usePathname() ?? '';
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setSearch(getCurrentSearch());
  }, [pathname]);

  return {
    pathname,
    search,
    hash: '',
    state: null,
    key: 'default',
  };
}

export function useNavigate() {
  const router = useRouter();

  return (to: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
}

export function useParams<
  T extends Record<string, string | string[] | undefined> = Record<
    string,
    string | string[] | undefined
  >
>() {
  return useNextParams() as T;
}

type SearchParamsInit =
  | string
  | string[][]
  | Record<string, string | number | boolean | null | undefined>
  | URLSearchParams;

type SetSearchParams =
  | SearchParamsInit
  | ((prev: URLSearchParams) => SearchParamsInit);

function toURLSearchParams(init: SearchParamsInit): URLSearchParams {
  if (init instanceof URLSearchParams) {
    return new URLSearchParams(init);
  }

  if (typeof init === 'string') {
    return new URLSearchParams(init);
  }

  if (Array.isArray(init)) {
    return new URLSearchParams(init.map(([key, value]) => [key, String(value)]));
  }

  const params = new URLSearchParams();

  Object.entries(init).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.set(key, String(value));
    }
  });

  return params;
}

export function useSearchParams(): [
  URLSearchParams,
  (nextInit: SetSearchParams, options?: { replace?: boolean }) => void
] {
  const pathname = usePathname() ?? '';
  const router = useRouter();

  const [searchParams, setSearchParamsState] = React.useState<URLSearchParams>(
    () => new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search)
  );

  React.useEffect(() => {
    setSearchParamsState(new URLSearchParams(getCurrentSearch()));
  }, [pathname]);

  const setSearchParams = React.useCallback(
    (nextInit: SetSearchParams, options?: { replace?: boolean }) => {
      const newParams =
        typeof nextInit === 'function'
          ? toURLSearchParams(nextInit(new URLSearchParams(searchParams)))
          : toURLSearchParams(nextInit);

      const query = newParams.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      setSearchParamsState(new URLSearchParams(query));

      if (options?.replace) {
        router.replace(url);
      } else {
        router.push(url);
      }
    },
    [pathname, router, searchParams]
  );

  return [searchParams, setSearchParams];
}