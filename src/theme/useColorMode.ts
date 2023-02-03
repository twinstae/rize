import { useEffect } from 'react';
import useConfig from '../config/useConfig';

export function useColorMode() {
	const [darkMode, setDarkMode] = useConfig<boolean>('colorMode', true);
	useEffect(() => {
		document.getElementsByTagName('html')[0].setAttribute('data-theme', darkMode ? 'dark' : 'izone');
	}, [darkMode]);
	return {
		colorMode: (darkMode ? 'dark' : 'light') as 'dark' | 'light',
		toggleColorMode: () => {
			setDarkMode((old) => !old);
		},
	};
}