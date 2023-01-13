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
    if (typeof lang === 'string'){
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return {
    lang,
    setLang,
    langList
  };
}

export default useLang;