import { PropsWithChildren } from 'react';
import { useAuthGuard } from '../hooks';
import { ROLES } from '../types';

type Props = PropsWithChildren<{
  /** specify one or few roles to allow users only with such role to see the content (children)  */
  roles?: ROLES | ROLES[];

  /** Renders instead of `children` when user is not authenticated or profile doesn't have required role (if specified) */
  fallback?: React.ReactNode;

  /** When loading, still use fallback; it may not be always relevant in such cases. */
  isFallbackOnLoading?: boolean;
}>;

export const AuthGuard = ({ children, roles, fallback, isFallbackOnLoading }: Props) => {
  const allowed = useAuthGuard(roles);
  if (allowed === undefined) {
    return isFallbackOnLoading ? fallback : null;
  }

  return allowed ? children : fallback || null;
};
