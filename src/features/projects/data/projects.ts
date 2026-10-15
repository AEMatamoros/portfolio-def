import AgendaIMG from "@/features/projects/assets/agenda.webp";
import PhoenixStoreIMG from "@/features/projects/assets/phoenixstore.webp";
import QrIMG from "@/features/projects/assets/qr.webp";
import LecoIMG from "@/features/projects/assets/leco.webp";
import WeatherImg from "@/features/projects/assets/weather.webp";
import ExpenceFrontIMG from "@/features/projects/assets/expencefront.webp";
import ExpenceBackIMG from "@/features/projects/assets/expenceback.webp";
import CalendarIMG from "@/features/projects/assets/calendar.webp";
import CalendarBIMG from "@/features/projects/assets/calendarb.webp";
import PortalImg from "@/features/projects/assets/portal.webp";
import FUTVIMG from "@/features/projects/assets/futv.webp";
import Barber from "@/features/projects/assets/barber.webp";
import PortfolioV2 from "@/features/projects/assets/portfoliov2.webp";
import Atlantida from "@/features/projects/assets/atlantida.webp";
import Clinpays from "@/features/projects/assets/clinpays.webp";
import Imprema from "@/features/projects/assets/imprema.webp";
import Leer from "@/features/projects/assets/leer.webp";
import Vino from "@/features/projects/assets/vinoteca.webp";
import Impact from "@/features/projects/assets/impact.webp";
import NoImg from "@/features/projects/assets/noimg.webp";

import type { Project } from "@/features/projects/projects.types";

export const PROJECTS = [
  {
    id: "clinpays",
    name: "Clinpays",
    description: {
      en: "Your complete online payment and collection orchestrator for the growth of your business or venture.",
      es: "Tu Orquestador completo de pagos y cobros en línea para el crecimiento de tu negocio o emprendimiento.",
    },
    image: Clinpays,
    url: "https://www.clinpays.com",
    techs: ["React", "NodeJS", "Express", "MongoDB"],
  },
  {
    id: "atlantida-online",
    name: "Atlantida Online",
    description: {
      en: "Banking application for managing accounts, transfers, and financial services for individuals.",
      es: "Aplicación bancaria para la gestión de cuentas, transferencias y servicios financieros para personas.",
    },
    image: Atlantida,
    url: "https://aolweb.bancatlan.hn/ocbretail/",
    techs: ["SAP UI5", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "futv-cms",
    name: "FUTV - CMS",
    description: {
      en: "Entertainment platform.",
      es: "Plataforma de entretenimiento, blogs live streaming, se desarrollo tanto el client side, como el panel de adminsitracion de contenido",
    },
    image: FUTVIMG,
    url: "https://www.futvcr.com/",
    techs: ["Angular", "NodeJS", "Express", "SQL"],
  },
  {
    id: "pth",
    name: "PTH",
    description: {
      en: "It is a free technological platform, created to make it easier for people to exercise the right of access to information.",
      es: "Es una plataforma tecnológica gratuita, creada para facilitar a las personas el ejercicio del derecho de acceso a la información.",
    },
    image: PortalImg,
    url: "https://portalunico.iaip.gob.hn/",
    techs: ["React", "Django", "ElasticSearch"],
  },
  {
    id: "impact-mobile",
    name: "Impact Mobile ",
    description: {
      en: "Mobile website developed in WordPress for Impact.",
      es: "Sitio web móvil desarrollado en WordPress para Impact.",
    },
    image: Impact,
    url: "https://impactmobilehn.com",
    techs: ["WordPress", "PHP", "CSS"],
  },
  {
    id: "inprema",
    name: "INPREMA",
    description: {
      en: "Institutional portal for managing online services and procedures of the National Institute of Teachers' Welfare.",
      es: "Portal institucional para la gestión de servicios y trámites en línea del Instituto Nacional de Previsión del Magisterio.",
    },
    image: Imprema,
    url: "https://inprema.gob.hn",
    techs: ["WordPress", "PHP", "CSS"],
  },
  {
    id: "la-vinoteca",
    name: "La Vinoteca",
    description: {
      en: "E-commerce specialized in wines and liquors, developed for the Chilean market.",
      es: "E-commerce especializado en vinos y licores, desarrollado para el mercado chileno.",
    },
    image: Vino,
    url: "https://www.lavinoteca.cl",
    techs: ["React", "NodeJS", "Express", "MongoDB"],
  },
  {
    id: "leer-para-empoderarse",
    name: "Leer para Empoderarse",
    description: {
      en: "Blog dedicated to promoting reading and personal empowerment through recommendations, reviews, and literary resources.",
      es: "Blog dedicado a fomentar la lectura y el empoderamiento personal a través de recomendaciones, reseñas y recursos literarios.",
    },
    image: Leer,
    techs: ["WordPress", "PHP", "CSS"],
  },
  {
    id: "goit-mock",
    name: "Goit - Mock",
    description: {
      en: "Template proyect to teach HTML and CSS(SASS).",
      es: "Proyecto Plantilla, para enseñar HTML, CSS(SASS).",
    },
    image: Barber,
    url: "https://aematamoros.github.io/fs-11/",
    techs: ["HTML", "CSS", "SASS"],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: {
      en: "Template proyect to teach HTML and CSS(SASS).",
      es: "Proyecto Plantilla, para enseñar HTML, CSS(SASS).",
    },
    image: PortfolioV2,
    url: "https://portfolio-v2-alpha-lemon.vercel.app/",
    techs: ["React", "TailwnidCSS"],
  },
  {
    id: "phoenix-store",
    name: "Phoenix Store",
    description: {
      en: "Ecommerce, created for the purpose of selling various products.",
      es: "Ecommerce, creado con la finalidad de venta de productos varios.",
    },
    image: PhoenixStoreIMG,
    url: "https://e-phoenixstoreunah.web.app/landing",
    techs: ["Angular", "NodeJS", "Express", "SQL"],
  },
  {
    id: "our-expences-client",
    name: "Our Expences - Client",
    description: {
      en: "Pantry management application.",
      es: "Aplicacion de manejo de despensa.",
    },
    image: ExpenceFrontIMG,
    url: "https://github.com/AEMatamoros/our-expence",
    techs: ["React", "TypeScript"],
  },
  {
    id: "our-expences-api",
    name: "Our Expences - API",
    description: {
      en: "Pantry management application.",
      es: "Aplicacion de manejo de despensa.",
    },
    image: ExpenceBackIMG,
    url: "https://github.com/AEMatamoros/our-expence",
    techs: ["NESTJS", "MONGO", "TypeScript"],
  },
  {
    id: "calendar-client",
    name: "Calendar - Client",
    description: {
      en: "Virtual Calendar. Developed in React.",
      es: "Calendario Virtual.Desarrollado en React.",
    },
    image: CalendarIMG,
    url: "https://github.com/AEMatamoros/Calendar-Frontend",
    techs: ["React"],
  },
  {
    id: "calendar-api",
    name: "Calendar - API",
    description: {
      en: "Virtual Calendar.",
      es: "Calendario Virtual.Desarrollado en NODEJS, Express.",
    },
    image: CalendarBIMG,
    url: "https://github.com/AEMatamoros/Calendar-API",
    techs: ["NODEJS", "Express"],
  },
  {
    id: "api-agenda",
    name: "API Agenda",
    description: {
      en: "Virtual agenda.Developed with NodeJS, Express and the Handlebars template engine.",
      es: "Agenda virtual.Desarrollada con NodeJS, Express y el motor de plantillas Handlebars.",
    },
    image: AgendaIMG,
    url: "https://github.com/AEMatamoros/Agenda-API",
    techs: ["NodeJS", "Express"],
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: {
      en: "API to encode a string as a base 64 image with a QR code, as well as encrypt and decrypt the data within it. Developed on NODEJS, Express.",
      es: "API para codificar una cadena como una imagen base 64 con un codigo QR, asi como encriptar y desencriptar la data dentro del mismo.Desarrollado en NODEJS, Express.",
    },
    image: QrIMG,
    url: "https://qrg-enerator-alpha.vercel.app/",
    techs: ["NodeJS", "Express"],
  },
  {
    id: "paya",
    name: "Pa'Ya",
    description: {
      en: "Free advertising and product sales page with user profile management.",
      es: "Pagina de publicidad y venta de productos gratuita con manejo de perfiles de usuario.",
    },
    image: NoImg,
    url: "https://github.com/AEMatamoros/PA-YA",
    techs: ["Python", "Django"],
  },
  {
    id: "leco",
    name: "LECO(Learn to code)",
    description: {
      en: "Application to learn to program visually, and showing the generated output code as Python code.",
      es: "Aplicacion para aprender a programar de forma visual, y mostrando el codigo generado de salida como codigo de Python.",
    },
    image: LecoIMG,
    url: "https://github.com/AEMatamoros/PA-YA",
    techs: ["GoLang", "Vue", "DGraph"],
  },
  {
    id: "consume-weather-api",
    name: "Consume Weather API",
    description: {
      en: "Application that consumes an external API that provides the weather regarding the current location or a city.",
      es: "Aplicacion que consume un API externa que brinda el clima respecto a la ubicacion actual o una ciudad.",
    },
    image: WeatherImg,
    url: "https://github.com/AEMatamoros/PA-YA",
    techs: ["React"],
  },
] satisfies readonly Project[];
