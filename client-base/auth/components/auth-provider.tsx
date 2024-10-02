import 'aws-amplify/auth/enable-oauth-listener';
import { Hub } from 'aws-amplify/utils';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import {
  exchangeToken,
  getAccessToken,
  logout,
  signInWithEmail,
  loginWithLinkedin,
  signup,
  updateRole as updateRoleBase,
  getUser,
  confirmUserSignUp,
  updateEmail,
  changePassword,
  confirmUsersEmailAttribute,
} from '../actions';
import {
  AuthUser,
  ConfirmSignUpOptions,
  Credentials,
  HubPayload,
  SignupOptions,
  ChangePasswordOptions,
  ChangeEmailOptions,
  ROLES,
} from '../types';
import { AuthEvents } from '../constants';

type AuthContextType = {
  user?: AuthUser | null;
  loading: boolean;
  updateRole?: (role: ROLES) => ReturnType<typeof updateRoleBase>;
  updateEmail: (options: ChangeEmailOptions) => ReturnType<typeof updateEmail>;
  login: (credentials: Credentials) => ReturnType<typeof signInWithEmail>;
  loginWithLinkedin: (role?: ROLES) => ReturnType<typeof loginWithLinkedin>;
  logout: () => ReturnType<typeof logout>;
  signup: (options: SignupOptions) => ReturnType<typeof signup>;
  changePassword: (options: ChangePasswordOptions) => ReturnType<typeof changePassword>;
  confirmUserSignUp: (options: ConfirmSignUpOptions) => ReturnType<typeof confirmUserSignUp>;
  confirmUsersEmailAttribute: (code: string) => ReturnType<typeof confirmUsersEmailAttribute>;
};

const contextActions = {
  login: signInWithEmail,
  loginWithLinkedin,
  logout,
  signup,
  confirmUserSignUp,
  changePassword,
  updateEmail,
  confirmUsersEmailAttribute,
};

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  loading: false,
  ...contextActions,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>();
  const [loading, setLoading] = useState<boolean>(true);

  async function refreshUser(withLoading = true) {
    withLoading && setLoading(true);
    try {
      setUser(await getUser());
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function updateRole(role: ROLES) {
    const updateRes = await updateRoleBase(role);
    await exchangeToken();

    return updateRes;
  }

  function subscribeToAuthEvents() {
    async function onAuthEvent({ payload }: { payload: HubPayload }) {
      const { data } = payload;

      switch (payload?.event) {
        case AuthEvents.signedIn:
          refreshUser();
          break;
        case AuthEvents.signedOut:
          setUser(null);
          break;
        case AuthEvents.tokenRefresh:
          await refreshUser(false);
          break;
        case AuthEvents.customOAuthState:
          if (data) {
            const token = await getAccessToken();

            if (token) {
              await updateRole(data);
              await refreshUser();
            }
          }
          break;
        default:
      }
    }

    return Hub.listen('auth', onAuthEvent);
  }

  useEffect(() => {
    refreshUser();
    return subscribeToAuthEvents();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        updateRole,
        loading,
        ...contextActions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
