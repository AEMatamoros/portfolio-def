import en from "@/i18n/EN";
import es from "@/i18n/ES";

export default {
  resources: { es, en },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  backend: {
    loadPath: "/i18n/{{lng}}.json",
  },
};
