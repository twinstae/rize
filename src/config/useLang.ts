import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useConfig from './useConfig';

const langList = [
  'ko',
  'en',
  'jp',
] as const;

const defaultLang = langList[0];

function useLang() {
  const config = useConfig();
  const { i18n } = useTranslation();

  const lang = (config.get('lang') ?? defaultLang) as string;
  const setLang = (value: string) => {
    config.set('lang', value);
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return {
    lang,
    setLang,
    langList
  };
}

export default useLang;