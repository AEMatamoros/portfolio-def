import formatDate from "@Utils/DateFormatter";
import HeaderSeparator from "@Components/ui/HeaderSeparator";
import { useTranslation } from "react-i18next";

export const EXPERIENCE = [
  {
    name: "Informatica Atlantida",
    descriptionEN: "Sr.Front-End Developer",
    descriptionES: "Desarrollador Sr.Front-End",
    time: "June 6, 2022 23:59:59",
    tecs: ["UI5", "Figma", "Angular", "React"],
    positionDescripcionES: `
        Creación de
        interfaces de usuario atractivas y funcionales para aplicaciones
        web . Diriges equipos, trabajas en colaboración con diseñadores
        y desarrolladores, y participas en la toma de decisiones técnicas.  Responsable de mantener los estándares de calidad del código, 
        optimizar el rendimiento y la accesibilidad, y estar al tanto de las
        tendencias y mejores prácticas en el desarrollo frontend.`,
    positionDescripcionEN: `Creation of
        attractive and functional user interfaces for applications
        Web . You lead teams, work in collaboration with designers
        and developers, and participate in technical decision making. Responsible for maintaining code quality standards,
        Optimize performance and accessibility, and stay aware of
        trends and best practices in frontend development.`,
    current: true,
  },
  {
    name: "GoIt GLobal",
    descriptionEN: "Programing Teacher - FullStack",
    descriptionES: "Maestro de programacion - FullStack",
    time: "December 31, 2022 23:59:59",
    timeEnd: "June 22, 2024 23:59:59",
    tecs: ["HTML", "CSS", "REACT", "NodeJS", "Figma"],
    positionDescripcionES: `
        Como maestro de desarrollo frontend, comparto con mis estudiantes mi 
        profundo conocimiento del stack MERN. Me especializo en MongoDB para estructurar 
        bases de datos, Express para crear servidores, React para interfaces de usuario dinámicas y 
        Node.js para ejecutar el servidor. Mi misión es capacitar a los aspirantes a desarrolladores 
        para que creen aplicaciones web y móviles con estas tecnologías líderes de la industria. 
        Creo que enseñar no solo consiste en impartir conocimientos, sino en inspirar a los estudiantes 
        a abrazar la creatividad y la resolución de problemas, habilidades esenciales para triunfar en el desarrollo frontend.`,
    positionDescripcionEN: `As a frontend development teacher, I share with my students my
        deep knowledge of the MERN stack. I specialize in MongoDB to structure
        databases, Express for creating servers, React for dynamic user interfaces and
        Node.js to run the server. My mission is to train aspiring developers
        to create web and mobile applications with these industry-leading technologies.
        I believe that teaching is not only about imparting knowledge, but about inspiring students.
        to embrace creativity and problem solving, essential skills to succeed in frontend development.`,
    current: false,
  },
  {
    name: "Impact Mobile",
    descriptionEN: "Web Developer",
    descriptionES: "Desarrollador web",
    time: "April 22, 2021 23:59:59",
    timeEnd: "April 22, 2022 23:59:59",
    tecs: ["REACT", "Angular", "Python", "NodeJS", "Django"],
    positionDescripcionES: `Como desarrollador de soluciones de software para el comercio electrónico, 
        tu trabajo es crear plataformas digitales robustas y atractivas que permitan a los clientes comprar productos y 
        servicios de manera segura y fácil. Usas tecnologías de vanguardia para diseñar interfaces intuitivas y escalables que 
        optimicen la experiencia del usuario. También te encargas de la seguridad, el rendimiento y la integración de 
        herramientas de análisis para mejorar continuamente el rendimiento del comercio electrónico.`,
    positionDescripcionEN: `Working as a developer of software solutions for e-commerce,
        Your job is to create robust and engaging digital platforms that allow customers to buy products and
        services safely and easily. You use cutting-edge technologies to design intuitive and scalable interfaces that
        optimize the user experience. You also take care of security, performance, and integration of
        analytics tools to continually improve e-commerce performance.`,
    current: false,
  },
  {
    name: "FreeLancer",
    descriptionEN: "Autonomous",
    descriptionES: "Autónomo",
    time: "March 22, 2020 23:59:59",
    timeEnd: "March 22, 2021 23:59:59",
    tecs: ["Mutltiples Stacks"],
    positionDescripcionES: `
        Como freelancer especializado en crear APIs con Python, 
        mi labor se centra en desarrollar soluciones eficientes y escalables para mis clientes. 
        Utilizo Python para construir interfaces de programación de aplicaciones (APIs) que facilitan 
        la comunicación entre diferentes sistemas y aplicaciones. Me enorgullece ayudar a mis clientes a mejorar la 
        eficiencia y la productividad de sus operaciones mediante el uso de tecnologías de vanguardia y prácticas de desarrollo de 
        software ágiles. Mi objetivo es proporcionar a mis clientes un servicio de alta calidad que cumpla con sus necesidades y expectativas.`,
    positionDescripcionEN: `Working as a freelancer specialized in creating APIs with Python,
        My work focuses on developing efficient and scalable solutions for my clients.
        I use Python to build application programming interfaces (APIs) that facilitate
        communication between different systems and applications. I take pride in helping my clients improve their
        efficiency and productivity of your operations through the use of cutting-edge technologies and development practices
        agile software. My goal is to provide my clients with high quality service that meets their needs and expectations.`,
    current: false,
  },
];

export default function Timeline() {
  const { t, i18n } = useTranslation();
  return (
    <section
      className="bg-white dark:bg-gray-900 py-8 px-12"
      id="section-timeline"
    >
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 max-w-[1280px]">
        <h2 className="my-4 text-center text-5xl dark:text-gray-100 font-semibold text-darksecondary w-full">
          {t("SECTION.EXPERIENCE")}
        </h2>
        <HeaderSeparator />
        <ol className="relative border-s border-gray-200 ">
          {EXPERIENCE.map((place, id) => (
            <li className="mb-10 ms-4" key={id}>
              <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200  "></div>
              <time className="mb-1 text-center text-sm font-normal leading-none text-gray-400  md:text-left">
                {formatDate(place.time, place.timeEnd || "", "EN")}
                {place.current && (
                  <span className="px-4 text-detail ">
                    {i18n.language === "es" ? "Actualidad" : "Current"}
                  </span>
                )}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {place.name}
                <span className="text-primary px-4">{place.descriptionEN}</span>
              </h3>
              <p className="text-center text-base font-normal text-gray-500  md:text-left">
                {i18n.language === "es"
                  ? place.positionDescripcionES
                  : place.positionDescripcionEN}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
