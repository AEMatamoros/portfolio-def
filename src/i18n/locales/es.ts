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
    pauseAnimation: "Pausar animación",
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
    imageAlt: "Captura de {{name}}",
    noLink: "Enlace no disponible",
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
    optional: "opcional",
    sending: "Enviando...",
    emailInstead: "Escríbeme por correo",
    honeypot: "Deja este campo vacío",
    validation: {
      required: "Este campo es obligatorio.",
      email: "Ingresa un correo electrónico válido.",
      phone: "Ingresa un número telefónico válido.",
      tooLong: "Usa como máximo {{max}} caracteres.",
    },
    fallback: {
      title: "Escríbeme por correo",
      description:
        "El formulario de contacto no está disponible en este momento. Envíame un mensaje desde tu aplicación de correo y te responderé lo antes posible.",
      cta: "Enviar un correo",
    },
    mail: {
      subject: "Contacto desde el portafolio",
      heading: "Nuevo mensaje desde el formulario de contacto del portafolio",
      body: "Hola Alexis,",
    },
  },
} satisfies Messages;
