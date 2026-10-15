export const LOCALES = ["en", "es"] as const;

export type Locale = (typeof LOCALES)[number];

/** A value that exists once per supported language. */
export type Localized<T = string> = Readonly<Record<Locale, T>>;
