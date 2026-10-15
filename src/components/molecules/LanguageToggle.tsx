import { useTranslation } from "react-i18next";

export default function LangToogle() {
  const { i18n } = useTranslation();

  const toogleLang = () => {
    i18n.changeLanguage(i18n.language.includes("es") ? "en" : "es");
  };

  return (
    <button
      onClick={toogleLang}
      className="cursor-pointer font-semibold px-8 text-gray-400 transform hover:scale-110"
    >
      {i18n.language === "es" ? "ES" : "EN"}
    </button>
  );
}
