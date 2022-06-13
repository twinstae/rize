import { useDependencies } from '../hooks/Dependencies';

function useDarkMode(){
  const { colorMode, toggleColorMode } = useDependencies().useColorMode();

  return {
    isDark: colorMode === 'dark',
    toggleDark: toggleColorMode,
  };
}

export default useDarkMode;