import { useTranslation } from 'react-i18next';

import useConfig from './useConfig';

const langList = [
  'ko',
  'en',
  'jp',
] as const;

const defaultLang = langList[0];

function isLang(value: unknown){
  return langList.includes(value as 'ko');
}

function useLang() {
  const config = useConfig();
  const { i18n } = useTranslation();

  const lang = (config.get('lang') ?? defaultLang) as string;

  const setLang = (value: string) => {
    if(! isLang(value)) throw Error(value + '는 지원하지 않는 언어 입니다.');
    config.set('lang', value);
    i18n.changeLanguage(value);
  };

  return {
    lang,
    setLang,
    langList
  };
}

export default useLang;