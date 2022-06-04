import i18n from 'i18next';
import { initReactI18next, useTranslation as useNextTranslation } from 'react-i18next';

import en from './en.json';
import ko from './ko.json';

const resources = {
  ko,
  en,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ko',
  fallbackLng: 'ko',
  interpolation: {
    escapeValue: false,
  },
});


export type TranslationProps = {
  t: (text: string) => string;
};

type TranslationKeys = Record<keyof typeof ko.translation, keyof typeof ko.translation>

export const strs = Object.fromEntries(Object.keys(ko.translation).map(key => [key, key])) as TranslationKeys;

export const useTranslation = useNextTranslation;

export default i18n;
