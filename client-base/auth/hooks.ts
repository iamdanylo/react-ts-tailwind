import { useContext } from 'react';
import { AuthContext } from './components/auth-provider';
import { ROLES } from './types';
import logger from 'src/client-base/logger';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useIsAuthenticated = () => {
  const { user, loading } = useAuth();
  return { isAuthenticated: !!user, loading };
};

/**
 * Checks if current user is authenticated and has required role(s)
 * @param roles Optional role or array of roles to guard the current user against
 * @param actionName If set, all fails will be logged with this action name
 * @returns Whether user is authenticated (boolean) and has required role(s); undefined if still loading
 */
export const useAuthGuard = (roles?: ROLES | ROLES[] | null, actionName?: string) => {
  const { user, loading } = useAuth();

  if (user === undefined || loading) {
    return undefined;
  }

  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    if (actionName) {
      logger.warn(`[useAuthGuard>${actionName}] User is not authenticated`);
    }
    return false;
  }

  if (roles) {
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    const hasRole = user.role && allowedRoles.includes(user.role);
    if (!hasRole) {
      if (actionName) {
        logger.warn(`[useAuthGuard>${actionName}] User does not have required role`, {
          required: roles,
          actual: user.role,
        });
      }
      return false;
    }
  }

  return true;
};
