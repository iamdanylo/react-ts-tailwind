import { CognitoUserPoolConfig } from '@aws-amplify/core';

export const LinkedinProvider = {
  custom: 'Linkedin',
};

export const buildOauthConfig: (domain: string) => CognitoUserPoolConfig['loginWith'] = (domain) => ({
  oauth: {
    redirectSignIn: [window.location.origin + '/'],
    redirectSignOut: [window.location.origin + '/'],
    scopes: ['email', 'profile', 'openid'],
    providers: [LinkedinProvider],
    responseType: 'code',
    domain,
  },
});

export enum AuthEvents {
  signedOut = 'signedOut',
  signedIn = 'signedIn',
  customOAuthState = 'customOAuthState',
  tokenRefresh = 'tokenRefresh',
}
