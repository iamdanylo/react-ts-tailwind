import { fontSize as ConfigFontSizes } from 'src/ui-tailwind/tailwind.typography';
import { colors as ConfigColors } from 'src/ui-tailwind/tailwind.colors';

export const twmConfig = {
  override: {
    classGroups: {
      'font-size': Object.keys(ConfigFontSizes).map((key) => `text-${key}`),
      'text-color': Object.keys(ConfigColors).map((key) => `text-${key}`),
    },
  },
};
