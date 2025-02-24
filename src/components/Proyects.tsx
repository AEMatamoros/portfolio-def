import { useTranslation } from "react-i18next";
import { PROJECTS } from "@Constants/projects";

export default function Proyects() {
  const { t } = useTranslation();
  return (
    <section
      className="bg-white dark:bg-gray-900 py-8 px-12"
      id="section-projects"
    >
      <div className="container mx-auto flex items-center flex-wrap pt-4">
        <h2 className="my-4 text-center text-5xl font-semibold  dark:text-gray-100 md:text-left">
          {t("SECTION.PROJECTS")}
        </h2>
      </div>
      <div className="container mx-auto flex items-center flex-wrap">
        {PROJECTS.map((project) => (
          <div
            className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col "
            key={project.name}
          >
            <a href={project.url} target="_blank">
              <img
                className="hover:grow hover:shadow-lg w-full object-cover"
                src={project.img}
              />
              <div className="pt-3 flex items-center justify-between dark:text-gray-100 font-semibold dark:text-gray-100 font-semibold">
                <p className="">{project.name}</p>
                <button className="bg-gray-900 dark:bg-gray-100 p-1 text-gray-100 dark:text-gray-900 rounded-sm cursor-pointer text-sm ">
                  Ver Mas
                </button>
              </div>
              <div className="w-full flex gap-2">
                {project.techs.map((tec) => (
                  <span className="pt-1 text-gray-900 text-[12px]" key={tec}>
                    {tec}
                  </span>
                ))}
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
