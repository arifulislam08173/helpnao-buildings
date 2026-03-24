'use client';

import React, { forwardRef, useCallback, useMemo } from 'react';
import NextLink from 'next/link';
import {
  useRouter,
  usePathname,
  useParams as useNextParams,
  useSearchParams as useNextSearchParams,
} from 'next/navigation';

type To = string;

type ClassNameValue =
  | string
  | ((state: { isActive: boolean; isPending: boolean }) => string | undefined);

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: To;
}

export interface NavLinkProps extends LinkProps {
  className?: ClassNameValue;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, children, ...props },
  ref,
) {
  return (
    <NextLink href={to} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { to, children, className, ...props },
  ref,
) {
  const pathname = usePathname();
  const isActive = pathname === to;
  const resolvedClassName = typeof className === 'function'
    ? className({ isActive, isPending: false })
    : className;

  return (
    <NextLink href={to} ref={ref} className={resolvedClassName} {...props}>
      {children}
    </NextLink>
  );
});

export function useNavigate() {
  const router = useRouter();
  return useCallback(
    (to: string | number) => {
      if (typeof to === 'number') {
        if (to < 0) router.back();
        return;
      }
      router.push(to);
    },
    [router],
  );
}

export function useParams<T extends Record<string, string | string[] | undefined>>() {
  return useNextParams() as T;
}

export function useLocation() {
  const pathname = usePathname();
  const searchParams = useNextSearchParams();
  const searchString = searchParams?.toString();

  return useMemo(
    () => ({
      pathname,
      search: searchString ? `?${searchString}` : '',
      hash: '',
      state: null,
      key: `${pathname}${searchString ? `?${searchString}` : ''}`,
    }),
    [pathname, searchString],
  );
}

type SearchParamsInit =
  | string
  | URLSearchParams
  | Record<string, string | number | boolean | null | undefined>;

export function useSearchParams(): [URLSearchParams, (nextInit: SearchParamsInit) => void] {
  const nextSearchParams = useNextSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useMemo(
    () => new URLSearchParams(nextSearchParams?.toString() || ''),
    [nextSearchParams],
  );

  const setSearchParams = useCallback(
    (nextInit: SearchParamsInit) => {
      const params =
        typeof nextInit === 'string'
          ? new URLSearchParams(nextInit)
          : nextInit instanceof URLSearchParams
            ? new URLSearchParams(nextInit.toString())
            : new URLSearchParams(
                Object.entries(nextInit).flatMap(([key, value]) =>
                  value === undefined || value === null || value === '' ? [] : [[key, String(value)]],
                ),
              );

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router],
  );

  return [searchParams, setSearchParams];
}

export function BrowserRouter({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Routes({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Route(_props: Record<string, unknown>) {
  return null;
}
