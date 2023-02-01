import { useEffect } from 'react';
import { useTranslation } from '../i18n/i18n';

import useConfig from './useConfig';

const langList = [
	'ko',
	'en',
	// 'jp',
] as const;

const defaultLang = langList[0];

function useLang() {
	const [lang, setLang] = useConfig<string>('lang', defaultLang);
	const { i18n } = useTranslation();

	useEffect(() => {
		if(i18n.language !== lang){
			i18n.changeLanguage(lang);
		}
	}, [lang]);

	return {
		lang,
		setLang,
		langList,
	};
}

export default useLang;
