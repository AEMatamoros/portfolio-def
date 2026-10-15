import { useTranslation } from "react-i18next";
import { toLocale } from "@/lib/localize";
import type { Locale } from "@/types/localized";

/** The active supported locale; re-renders on every language change. */
export function useLocale(): Locale {
  const { i18n } = useTranslation();
  return toLocale(i18n.resolvedLanguage);
}
