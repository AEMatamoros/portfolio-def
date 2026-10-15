import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { en } from "@/i18n/locales/en";
import { es } from "@/i18n/locales/es";
import { toLocale } from "@/lib/localize";

export const i18n = i18next.createInstance();

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, es: { translation: es } },
    supportedLngs: ["en", "es"],
    nonExplicitSupportedLngs: true, // "es-MX" is accepted; resolvedLanguage is "es"
    load: "languageOnly",
    fallbackLng: "en",
    initAsync: false, // resources are inline, so i18n is ready before the first render
    interpolation: { escapeValue: false }, // React escapes output; user input never goes through t()
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"], // key `i18nextLng` is unchanged
    },
  });

const syncHtmlLang = () => {
  document.documentElement.lang = toLocale(i18n.resolvedLanguage);
};

syncHtmlLang();
i18n.on("languageChanged", syncHtmlLang);
