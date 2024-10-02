import { Amplify } from 'aws-amplify';
import {
  signIn,
  signOut,
  signInWithRedirect,
  signUp,
  fetchAuthSession,
  getCurrentUser,
  confirmSignUp,
  updateUserAttribute,
  updatePassword,
  confirmUserAttribute,
} from 'aws-amplify/auth';
import { buildOauthConfig, LinkedinProvider } from './constants';
import {
  AuthUser,
  Credentials,
  ROLES,
  SignupOptions,
  ConfirmSignUpOptions,
  ChangePasswordOptions,
  ChangeEmailOptions,
} from './types';
import { AxiosError, AxiosInstance } from 'axios';
import { createPrivateAPI } from '../transport/api';

const authContext: { api?: AxiosInstance } = {
  api: undefined,
};

export function initAuth(userPoolClientId: string, userPoolId: string, authDomain: string, authBaseUrl: string) {
  const config = Amplify.getConfig();

  if (config.Auth) {
    return;
  }

  authContext.api = createPrivateAPI({
    baseURL: authBaseUrl,
  });

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
        loginWith: buildOauthConfig(authDomain),
      },
    },
  });
}

export interface AuthResult {
  success: boolean;
  error?: string;
}

export async function signInWithEmail({ email, password }: Credentials): Promise<AuthResult> {
  try {
    const signinResponse = await signIn({
      username: email,
      password,
    });

    const result: AuthResult = {
      success: signinResponse.isSignedIn,
    };

    if (signinResponse.nextStep.signInStep === 'CONFIRM_SIGN_UP') {
      result.error = 'User is not confirmed.';
    }

    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message!,
    };
  }
}

export interface SignupResult extends AuthResult {
  message?: string;
}

export async function signup({ email, password, role }: SignupOptions): Promise<SignupResult> {
  try {
    const signupResponse = await signUp({
      username: email,
      password,

      options: {
        userAttributes: {
          'custom:role': role,
        },
      },
    });

    const result: SignupResult = {
      success: signupResponse.isSignUpComplete,
    };

    if (signupResponse?.nextStep?.signUpStep === 'CONFIRM_SIGN_UP') {
      result.message = "We've sent you a verification email. Please, check your inbox.";
    }

    return result;
  } catch (err: any) {
    return {
      success: false,
      error: err.message!,
    };
  }
}

export function logout() {
  return signOut({ global: false });
}

export async function loginWithLinkedin(role?: string) {
  await signInWithRedirect({
    provider: LinkedinProvider,
    customState: typeof role === 'string' ? role : undefined,
  });
}

export async function getAccessToken() {
  const session = await fetchAuthSession();
  return session?.tokens?.accessToken.toString();
}

export async function exchangeToken() {
  const session = await fetchAuthSession({ forceRefresh: true });
  return session?.tokens?.accessToken.toString();
}

export async function updateRole(role: ROLES): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!authContext.api) {
    throw new Error('Auth API is not configured.');
  }

  try {
    const res = await authContext.api.post('/choose-role', { role });

    return { success: res.status === 200 };
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return { success: false, error: error.response?.data.message };
  }
}

async function getRole(): Promise<ROLES | null> {
  const session = await fetchAuthSession();
  const token = session.tokens?.accessToken;

  if (token) {
    const { payload } = token;

    const cognitoGroups = payload['cognito:groups'] as any[];
    return cognitoGroups?.find((g) => Object.values(ROLES).includes(g)) || null;
  }

  return null;
}

export async function getUser(): Promise<AuthUser> {
  const [user, role, session] = await Promise.all([getCurrentUser(), getRole(), fetchAuthSession()]);

  const email = session?.tokens?.idToken?.payload?.email?.toString() || null;
  return { ...user, role, email };
}

export async function confirmUserSignUp(options: ConfirmSignUpOptions): Promise<void> {
  await confirmSignUp(options);
}

export async function confirmUsersEmailAttribute(confirmationCode: string): Promise<void> {
  await confirmUserAttribute({
    userAttributeKey: 'email',
    confirmationCode,
  });
  await exchangeToken();
}

export async function updateEmail({ email }: ChangeEmailOptions): Promise<{ success: boolean; error?: string }> {
  try {
    await updateUserAttribute({
      userAttribute: {
        attributeKey: 'email',
        value: email,
      },
    });
    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message,
    };
  }
}

export async function changePassword({
  oldPassword,
  newPassword,
}: ChangePasswordOptions): Promise<{ success: boolean; error?: string }> {
  try {
    await updatePassword({ oldPassword, newPassword });
    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message,
    };
  }
}
