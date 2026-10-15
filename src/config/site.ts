import type { Localized } from "@/types/localized";

export const SITE = {
  cv: {
    en: `${import.meta.env.BASE_URL}cv/Alexis_Matamoros_CV_EN.pdf`,
    es: `${import.meta.env.BASE_URL}cv/Alexis_Matamoros_CV_ES.pdf`,
  } satisfies Localized,
} as const;
