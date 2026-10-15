import { LOCALES, type Locale } from "@/types/localized";

/** Same key the previous detector used, so stored choices carry over. */
const STORAGE_KEY = "i18nextLng";
const FALLBACK_LOCALE: Locale = "en";

/** Maps a language code such as `es-MX` to a supported locale, or `undefined`. */
function toSupportedLocale(code: string | null | undefined) {
  const primary = code?.toLowerCase().split(/[-_]/)[0];
  return LOCALES.find((locale) => locale === primary);
}

function readStoredLanguage(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage can be blocked (private mode, strict settings)
  }
}

/**
 * Picks the first supported language from the stored choice, then the browser
 * languages in order of preference, then English. Regional codes resolve to their
 * primary language (`es-MX` becomes `es`, `fr-FR` is skipped).
 */
export function detectLocale(): Locale {
  const candidates = [
    readStoredLanguage(),
    ...(navigator.languages?.length
      ? navigator.languages
      : [navigator.language]),
  ];
  for (const candidate of candidates) {
    const locale = toSupportedLocale(candidate);
    if (locale) return locale;
  }
  return FALLBACK_LOCALE;
}

/** Remembers the language chosen by the visitor for the next visit. */
export function persistLocale(language: string): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Persistence is best effort; the choice still applies to this visit.
  }
}
