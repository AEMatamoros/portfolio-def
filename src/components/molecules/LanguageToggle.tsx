import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";

export function LanguageToggle() {
  const { t, i18n } = useTranslation();
  const locale = useLocale();

  const toggleLanguage = () => {
    void i18n.changeLanguage(locale === "es" ? "en" : "es");
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t("language.toggle")}
      className="cursor-pointer font-semibold px-8 text-gray-400 transform hover:scale-110"
    >
      {locale === "es" ? "ES" : "EN"}
    </button>
  );
}
