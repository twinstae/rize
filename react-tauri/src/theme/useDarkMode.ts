import { useDependencies } from '../hooks/Dependencies';

function useDarkMode(){
  const { useColorMode } = useDependencies();
  const { colorMode, toggleColorMode } = useColorMode();

  return {
    isDark: colorMode === 'dark',
    toggleDark: toggleColorMode,
  };
}

export default useDarkMode;