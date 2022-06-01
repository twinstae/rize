import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ko from "./ko.json";
import en from "./en.json";

const resources = {
  ko,
  en,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  fallbackLng: "ko",
  interpolation: {
    escapeValue: false,
  },
});

export type TranslationProps = {
  t: (text: string) => string;
};

export const strs = ko.translation;

export default i18n;
