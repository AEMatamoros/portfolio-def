import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { t, i18n } = useTranslation();
  const locale = useLocale();

  const toggleLanguage = () => {
    void i18n.changeLanguage(locale === "es" ? "en" : "es");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "px-3 font-semibold text-current hover:bg-current/10 hover:text-current dark:hover:bg-current/10",
        className,
      )}
      aria-label={t("language.toggle")}
      onClick={toggleLanguage}
    >
      {locale === "es" ? "ES" : "EN"}
    </Button>
  );
}
