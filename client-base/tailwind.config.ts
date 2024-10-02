import type { Config } from 'tailwindcss';
import { TailwindConfig } from 'src/ui-tailwind/tailwind.config';

// keeping this import for working HMR in Vite ??????
// import { TailwindConfig } from '../tailwind/tailwind.config';

export default {
  darkMode: TailwindConfig.darkMode,
  content: ['./**/*.{js,ts,jsx,tsx}'],
  theme: TailwindConfig.theme,
} satisfies Config;
