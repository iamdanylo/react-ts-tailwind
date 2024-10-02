import { Navigate } from 'react-router-dom';
import { useIsAuthenticated } from '../hooks';
import { PropsWithChildren } from 'react';

export function PublicRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useIsAuthenticated();

  return isAuthenticated ? <Navigate to="/" /> : children;
}
