import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fakeStorageRepo from '../config/fakeStorageRepo';
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

fakeStorageRepo.getItem().then(config => {
  i18n.changeLanguage((config as { lang: string}).lang);
});

export type TranslationProps = {
  t: (text: string) => string;
};

type TranslationKeys = Record<keyof typeof ko.translation, keyof typeof ko.translation>

export const strs = Object.fromEntries(Object.keys(ko.translation).map(key => [key, key])) as TranslationKeys;

export default i18n;
