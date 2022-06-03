import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    izone: {
      50: '#fff5f7',
      100: '#fed7e2',
      200: '#fed7e2',
      300: '#fbb6ce',
      400: '#fbb6ce',
      500: '#ed64a6',
      600: '#ed64a6',
      700: '#d53f8c',
      800: '#d53f8c',
      900: '#B83280',
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
});

export default theme;
