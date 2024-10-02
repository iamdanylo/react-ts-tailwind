export namespace Routes {
  export const home = '/';
  export const login = '/login';
  export const signup = '/signup';

  export function Profile(tab?: Profile.Tabs | string) {
    return tab ? `/profile/${tab}` : '/profile';
  }

  export namespace Profile {
    export enum Tabs {
      Me = 'me',
      Account = 'account',
      Payment = 'payment',
      Privacy = 'privacy',
    }
    export const ProfileId = 'profile/:id';
    export const Root = Profile();
    export const Create = '/create-profile';
  }
}