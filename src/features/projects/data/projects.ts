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
export const PROJECTS = [
  {
    hoverColor: "text-gray-500",
    name: "Clinpays",
    descriptionES:
      "Tu Orquestador completo de pagos y cobros en línea para el crecimiento de tu negocio o emprendimiento.",
    descriptionEN:
      "Your complete online payment and collection orchestrator for the growth of your business or venture.",
    img: Clinpays,
    icon: "fa-light fa-e",
    url: "https://www.clinpays.com",
    techs: ["React", "NodeJS", "Express", "MongoDB"],
  },
  {
    hoverColor: "text-gray-500",
    name: "Atlantida Online",
    descriptionES:
      "Aplicación bancaria para la gestión de cuentas, transferencias y servicios financieros para personas.",
    descriptionEN:
      "Banking application for managing accounts, transfers, and financial services for individuals.",
    img: Atlantida,
    icon: "fa-light fa-e",
    url: "https://aolweb.bancatlan.hn/ocbretail/",
    techs: ["SAP UI5", "JavaScript", "HTML", "CSS"],
  },
  {
    hoverColor: "text-gray-500",
    name: "FUTV - CMS",
    descriptionES:
      "Plataforma de entretenimiento, blogs live streaming, se desarrollo tanto el client side, como el panel de adminsitracion de contenido",
    descriptionEN: "Entertainment platform.",
    img: FUTVIMG,
    icon: "fa-light fa-e",
    url: "https://www.futvcr.com/",
    techs: ["Angular", "NodeJS", "Express", "SQL"],
  },
  {
    hoverColor: "text-gray-500",
    name: "PTH",
    descriptionES:
      "Es una plataforma tecnológica gratuita, creada para facilitar a las personas el ejercicio del derecho de acceso a la información.",
    descriptionEN:
      "It is a free technological platform, created to make it easier for people to exercise the right of access to information.",
    img: PortalImg,
    icon: "fa-light fa-e",
    url: "https://portalunico.iaip.gob.hn/",
    techs: ["React", "Django", "ElasticSearch"],
  },
  {
    hoverColor: "text-gray-500",
    name: "Impact Mobile ",
    descriptionES: "Sitio web móvil desarrollado en WordPress para Impact.",
    descriptionEN: "Mobile website developed in WordPress for Impact.",
    img: Impact,
    icon: "fa-brands fa-wordpress",
    url: "https://impactmobilehn.com",
    techs: ["WordPress", "PHP", "CSS"],
  },
  {
    hoverColor: "text-gray-500",
    name: "INPREMA",
    descriptionES:
      "Portal institucional para la gestión de servicios y trámites en línea del Instituto Nacional de Previsión del Magisterio.",
    descriptionEN:
      "Institutional portal for managing online services and procedures of the National Institute of Teachers' Welfare.",
    img: Imprema,
    icon: "fa-light fa-e",
    url: "https://inprema.gob.hn",
    techs: ["WordPress", "PHP", "CSS"],
  },
  {
    hoverColor: "text-gray-500",
    name: "La Vinoteca",
    descriptionES:
      "E-commerce especializado en vinos y licores, desarrollado para el mercado chileno.",
    descriptionEN:
      "E-commerce specialized in wines and liquors, developed for the Chilean market.",
    img: Vino,
    icon: "fa-solid fa-wine-bottle",
    url: "https://www.lavinoteca.cl",
    techs: ["React", "NodeJS", "Express", "MongoDB"],
  },
  {
    hoverColor: "text-gray-500",
    name: "Leer para Empoderarse",
    descriptionES:
      "Blog dedicado a fomentar la lectura y el empoderamiento personal a través de recomendaciones, reseñas y recursos literarios.",
    descriptionEN:
      "Blog dedicated to promoting reading and personal empowerment through recommendations, reviews, and literary resources.",
    img: Leer,
    icon: "fa-solid fa-book-open",
    url: "",
    techs: ["WordPress", "PHP", "CSS"],
  },
  {
    hoverColor: "text-gray-500",
    name: "Goit - Mock",
    descriptionES: "Proyecto Plantilla, para enseñar HTML, CSS(SASS).",
    descriptionEN: "Template proyect to teach HTML and CSS(SASS).",
    img: Barber,
    icon: "fa-light fa-e",
    url: "https://aematamoros.github.io/fs-11/",
    techs: ["HTML", "CSS", "SASS"],
  },
  {
    hoverColor: "text-gray-500",
    name: "Portfolio",
    descriptionES: "Proyecto Plantilla, para enseñar HTML, CSS(SASS).",
    descriptionEN: "Template proyect to teach HTML and CSS(SASS).",
    img: PortfolioV2,
    icon: "fa-light fa-e",
    url: "https://portfolio-v2-alpha-lemon.vercel.app/",
    techs: ["React", "TailwnidCSS"],
  },
  {
    hoverColor: "text-gray-500",
    name: "Phoenix Store",
    descriptionES:
      "Ecommerce, creado con la finalidad de venta de productos varios.",
    descriptionEN:
      "Ecommerce, created for the purpose of selling various products.",
    img: PhoenixStoreIMG,
    url: "https://e-phoenixstoreunah.web.app/landing",
    techs: ["Angular", "NodeJS", "Express", "SQL"],
  },
  {
    hoverColor: "text-gray-500",
    name: "Our Expences - Client",
    descriptionES: "Aplicacion de manejo de despensa.",
    descriptionEN: "Pantry management application.",
    img: ExpenceFrontIMG,
    icon: "fa-light fa-e",
    url: "https://github.com/AEMatamoros/our-expence",
    techs: ["React", "TypeScript"],
  },
  {
    hoverColor: "text-gray-500",
    name: "Our Expences - API",
    descriptionES: "Aplicacion de manejo de despensa.",
    descriptionEN: "Pantry management application.",
    img: ExpenceBackIMG,
    icon: "fa-light fa-e",
    url: "https://github.com/AEMatamoros/our-expence",
    techs: ["NESTJS", "MONGO", "TypeScript"],
  },
  {
    hoverColor: "text-gray-500",
    name: "Calendar - Client",
    descriptionES: "Calendario Virtual.Desarrollado en React.",
    descriptionEN: "Virtual Calendar. Developed in React.",
    img: CalendarIMG,
    icon: "fa-light fa-e",
    url: "https://github.com/AEMatamoros/Calendar-Frontend",
    techs: ["React"],
  },
  {
    hoverColor: "text-gray-500",
    name: "Calendar - API",
    descriptionES: "Calendario Virtual.Desarrollado en NODEJS, Express.",
    descriptionEN: "Virtual Calendar.",
    img: CalendarBIMG,
    icon: "fa-light fa-e",
    url: "https://github.com/AEMatamoros/Calendar-API",
    techs: ["NODEJS", "Express"],
  },
  {
    hoverColor: "text-green-500",
    name: "API Agenda",
    descriptionES:
      "Agenda virtual.Desarrollada con NodeJS, Express y el motor de plantillas Handlebars.",
    descriptionEN:
      "Virtual agenda.Developed with NodeJS, Express and the Handlebars template engine.",
    img: AgendaIMG,
    url: "https://github.com/AEMatamoros/Agenda-API",
    techs: ["NodeJS", "Express"],
  },
  {
    hoverColor: "text-gray-500",
    name: "QR Code Generator",
    descriptionES:
      "API para codificar una cadena como una imagen base 64 con un codigo QR, asi como encriptar y desencriptar la data dentro del mismo.Desarrollado en NODEJS, Express.",
    descriptionEN:
      "API to encode a string as a base 64 image with a QR code, as well as encrypt and decrypt the data within it. Developed on NODEJS, Express.",
    img: QrIMG,
    icon: "fa-light fa-e",
    url: "https://qrg-enerator-alpha.vercel.app/",
    techs: ["NodeJS", "Express"],
  },
  {
    hoverColor: "text-gray-500",
    name: "Pa'Ya",
    descriptionES:
      "Pagina de publicidad y venta de productos gratuita con manejo de perfiles de usuario.",
    descriptionEN:
      "Free advertising and product sales page with user profile management.",
    img: NoImg,
    icon: "fa-light fa-e",
    url: "https://github.com/AEMatamoros/PA-YA",
    techs: ["Python", "Django"],
  },
  {
    hoverColor: "text-gray-500",
    name: "LECO(Learn to code)",
    descriptionES:
      "Aplicacion para aprender a programar de forma visual, y mostrando el codigo generado de salida como codigo de Python.",
    descriptionEN:
      "Application to learn to program visually, and showing the generated output code as Python code.",
    img: LecoIMG,
    icon: "fa-light fa-e",
    url: "https://github.com/AEMatamoros/PA-YA",
    techs: ["GoLang", "Vue", "DGraph"],
  },
  {
    hoverColor: "text-gray-500",
    name: "Consume Weather API",
    descriptionES:
      "Aplicacion que consume un API externa que brinda el clima respecto a la ubicacion actual o una ciudad.",
    descriptionEN:
      "Application that consumes an external API that provides the weather regarding the current location or a city.",
    img: WeatherImg,
    icon: "fa-light fa-e",
    url: "https://github.com/AEMatamoros/PA-YA",
    techs: ["React"],
  },
];
