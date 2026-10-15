import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { detectLocale, persistLocale } from "@/i18n/detect-locale";
import { en } from "@/i18n/locales/en";
import { es } from "@/i18n/locales/es";
import { toLocale } from "@/lib/localize";

export const i18n = i18next.createInstance();

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, es: { translation: es } },
  lng: detectLocale(), // stored choice, then browser languages; always "en" or "es"
  supportedLngs: ["en", "es"],
  nonExplicitSupportedLngs: true, // a regional code such as "es-MX" resolves to "es"
  load: "languageOnly",
  fallbackLng: "en",
  initAsync: false, // resources are inline, so i18n is ready before the first render
  interpolation: { escapeValue: false }, // React escapes output; user input never goes through t()
});

const syncHtmlLang = () => {
  document.documentElement.lang = toLocale(i18n.resolvedLanguage);
};

syncHtmlLang();
i18n.on("languageChanged", (language) => {
  syncHtmlLang();
  persistLocale(language);
});
