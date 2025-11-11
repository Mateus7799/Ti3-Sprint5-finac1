import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const AppPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{sky.950}',
      100: '{sky.900}',
      200: '{sky.800}',
      300: '{sky.700}',
      400: '{sky.600}',
      500: '{sky.900}', // cor primária
      600: '{sky.400}',
      700: '{sky.300}',
      800: '{sky.200}',
      900: '{sky.100}',
      950: '{sky.50}',
    },
    colorScheme: {
      light: {
        primary: {
          hoverColor: '{sky.700}',
        },
      },
    },
  },
});

export { AppPreset };
