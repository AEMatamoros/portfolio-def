import type { Locale, Localized } from "@/types/localized";

/** Maps any language code (for example `es-MX`) to a supported locale. */
export function toLocale(language?: string): Locale {
  return language?.toLowerCase().startsWith("es") ? "es" : "en";
}

export function pickLocale<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
