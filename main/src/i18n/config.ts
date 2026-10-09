import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import zh from "./locales/zh";

i18n.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

const updateDocumentLanguage = (language: string) => {
  document.documentElement.lang = language.startsWith("zh") ? "zh-CN" : "en";
};

updateDocumentLanguage(i18n.language);
i18n.on("languageChanged", updateDocumentLanguage);

export default i18n;
