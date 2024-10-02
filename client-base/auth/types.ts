import { AuthUser as AuthUserBase } from 'aws-amplify/auth';

export type AccessToken = {
  accessToken: string;
  expiresIn: number; // ms
};

export enum ROLES {
  EXPERTS = 'experts',
  ANALYSTS = 'analysts',
  INVESTORS = 'investors',
}

export type AuthUser = AuthUserBase & {
  role: ROLES | null;
  email: string | null;
};

type RoleOption = {
  role: ROLES;
};

export type Credentials = {
  email: string;
  password: string;
};

export type SignupOptions = Credentials & RoleOption;

export type HubPayload = {
  event: string;
  data?: any;
  message?: string;
};

export type ConfirmSignUpOptions = {
  username: string;
  confirmationCode: string;
};

export type ChangePasswordOptions = {
  oldPassword: string;
  newPassword: string;
};

export type ChangeEmailOptions = {
  email: string;
};
