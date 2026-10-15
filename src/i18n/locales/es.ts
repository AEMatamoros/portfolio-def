import type { Messages } from "@/i18n/locales/en";

export const es = {
  nav: {
    about: "Sobre mí",
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
  hero: {
    greeting: "Mi nombre es ...",
    description:
      "Desarrollador de software experimentado con sólida experiencia en desarrollo fullstack. Capacidad demostrada para entregar soluciones de alta calidad y un compromiso con el crecimiento profesional continuo.",
  },
  experience: {
    title: "Experiencia",
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
