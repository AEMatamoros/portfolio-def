export const en = {
  nav: {
    about: "About Me",
    label: "Main navigation",
    footerLabel: "Footer navigation",
    cv: "CV",
    openMenu: "Open main menu",
    closeMenu: "Close menu",
  },
  a11y: {
    opensInNewTab: "(opens in a new tab)",
    github: "GitHub profile",
    linkedin: "LinkedIn profile",
    email: "Contact me by email",
    skipToContent: "Skip to content",
    scrollToTop: "Back to top",
    pauseAnimation: "Pause animation",
  },
  theme: {
    toggle: "Theme: {{mode}}",
    modes: {
      light: "Light",
      dark: "Dark",
      system: "System",
    },
  },
  language: {
    toggle: "Switch language",
  },
  footer: {
    rights: "© {{year}} Alexis Matamoros. All rights reserved.",
  },
  hero: {
    greeting: "My name is ...",
    primaryCta: "Get in touch",
    downloadCv: "Download CV",
    description:
      "Experienced software developer with a strong background in fullstack development. Proven ability to deliver high-quality solutions and a commitment to continuous professional growth.",
  },
  experience: {
    title: "Experience",
    current: "Current",
    stack: "Technologies used",
    tools: "Tools",
    duration: {
      years_one: "{{count}} year",
      years_other: "{{count}} years",
      months_one: "{{count}} month",
      months_other: "{{count}} months",
    },
  },
  techs: {
    title: "Technologies",
  },
  projects: {
    title: "Projects",
    showMore: "See More",
  },
  contact: {
    title: "Contact",
    description:
      "Get in contact, you can ask for information or work with me in future projects.",
    formTitle: "Get in touch with me",
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone number",
      company: "Company",
      message: "Message",
    },
    submit: "Get in touch!",
    success: "Thank you for writing to me, I will get in touch with you.",
    error: "Unfortunately an error occurred :c",
  },
} as const;

type Widen<T> = {
  [K in keyof T]: T[K] extends string ? string : Widen<T[K]>;
};

/** The shape every locale must match: EN's keys with string values. */
export type Messages = Widen<typeof en>;
