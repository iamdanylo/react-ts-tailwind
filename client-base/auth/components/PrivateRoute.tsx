import { Navigate } from 'react-router-dom';
import { Routes } from 'src/client-base/constants/Routes';
import { PropsWithChildren } from 'react';
import { useAuthGuard } from '../hooks';
import { ROLES } from '../types';

type Props = PropsWithChildren<{
  roles?: ROLES | ROLES[];
}>;

export function PrivateRoute({ children, roles }: Props) {
  const allowed = useAuthGuard(roles, 'PrivateRoute');

  if (allowed === undefined) {
    return null;
  }

  if (!allowed) {
    return <Navigate to={Routes.login} />;
  }

  return children;
}
