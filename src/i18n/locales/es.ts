import type { Messages } from "@/i18n/locales/en";

export const es = {
  nav: {
    about: "Sobre mí",
    label: "Navegación principal",
    footerLabel: "Navegación del pie de página",
    cv: "CV",
    openMenu: "Abrir menú principal",
    closeMenu: "Cerrar menú",
  },
  a11y: {
    opensInNewTab: "(se abre en una pestaña nueva)",
    github: "Perfil de GitHub",
    linkedin: "Perfil de LinkedIn",
    email: "Contáctame por correo electrónico",
    skipToContent: "Saltar al contenido",
    scrollToTop: "Volver arriba",
  },
  theme: {
    toggle: "Tema: {{mode}}",
    modes: {
      light: "Claro",
      dark: "Oscuro",
      system: "Sistema",
    },
  },
  language: {
    toggle: "Cambiar idioma",
  },
  footer: {
    rights: "© {{year}} Alexis Matamoros. Todos los derechos reservados.",
  },
  hero: {
    greeting: "Mi nombre es ...",
    primaryCta: "Contáctame",
    downloadCv: "Descargar CV",
    description:
      "Desarrollador de software experimentado con sólida experiencia en desarrollo fullstack. Capacidad demostrada para entregar soluciones de alta calidad y un compromiso con el crecimiento profesional continuo.",
  },
  experience: {
    title: "Experiencia",
    current: "Actualidad",
    stack: "Tecnologías utilizadas",
    tools: "Herramientas",
    duration: {
      years_one: "{{count}} año",
      years_other: "{{count}} años",
      months_one: "{{count}} mes",
      months_other: "{{count}} meses",
    },
  },
  techs: {
    title: "Tecnologías",
  },
  projects: {
    title: "Proyectos",
    showMore: "Ver más",
  },
  contact: {
    title: "Contacto",
    description:
      "Ponte en contacto conmigo, puedes solicitar información o trabajar conmigo en futuros proyectos.",
    formTitle: "Ponte en contacto conmigo.",
    fields: {
      name: "Nombre",
      email: "Correo electrónico",
      phone: "Número telefónico",
      company: "Compañía",
      message: "Mensaje",
    },
    submit: "¡Ponte en contacto!",
    success: "Gracias por escribirme, me pondré en contacto contigo.",
    error: "Lamentablemente ocurrió un error :c",
  },
} satisfies Messages;
