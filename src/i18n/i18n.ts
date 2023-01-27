import i18n from 'i18next';
import { initReactI18next, useTranslation as useNextTranslation } from 'react-i18next';

import _en from './en.json';
import _ko from './ko.json';

export const ko = _ko.translation;
export const en = _en.translation;

const resources = {
	ko: _ko,
	en: _en,
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

type TranslationKeys = Record<keyof typeof ko, keyof typeof ko>;

export const strs = Object.fromEntries(Object.keys(ko).map((key) => [key, key])) as TranslationKeys;

export const useTranslation = useNextTranslation as () => {
	i18n: typeof i18n;
	t: <K extends keyof typeof strs>(key: K) => typeof strs[K];
};

export default i18n;
