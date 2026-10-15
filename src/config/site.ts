import type { Localized } from "@/types/localized";

export const SITE = {
  name: "Alexis Matamoros",
  email: "Alexismatamoros1996777@gmail.com",
  social: {
    github: "https://github.com/AEMatamoros",
    linkedin:
      "https://www.linkedin.com/in/alexis-eduardo-matamoros-mayorquin-3a87411b5/",
  },
  cv: {
    en: `${import.meta.env.BASE_URL}cv/Alexis_Matamoros_CV_EN.pdf`,
    es: `${import.meta.env.BASE_URL}cv/Alexis_Matamoros_CV_ES.pdf`,
  } satisfies Localized,
} as const;

export const SECTION_IDS = [
  "hero",
  "experience",
  "techs",
  "projects",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** Id of the element that names a section; `SectionShell` points `aria-labelledby` at it. */
export const titleIdOf = (id: SectionId) => `${id}-title` as const;

export const NAV_ITEMS = [
  { id: "experience", labelKey: "nav.about" },
  { id: "projects", labelKey: "projects.title" },
  { id: "contact", labelKey: "contact.title" },
] as const;
