import { ROLES } from 'src/client-base/auth/types';

export function getColors(role: ROLES) {
  switch (role) {
    case 'analysts':
      return {
        checmark: 'stroke-user-analyst',
        title: 'text-user-analyst',
        gradient: 'bg-analyst-vertical-gr',
      };
    case 'experts':
      return {
        checmark: 'stroke-user-expert',
        title: 'text-user-expert',
        gradient: 'bg-expert-vertical-gr',
      };
    case 'investors':
      return {
        checmark: 'stroke-user-investor',
        title: 'text-user-investor',
        gradient: 'bg-investor-vertical-gr',
      };
  }
}
