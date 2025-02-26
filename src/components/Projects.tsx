import { useTranslation } from "react-i18next";
import { PROJECTS } from "@Constants/projects";
import { useState } from "react";
import HeaderSeparator from "@Components/ui/HeaderSeparator";

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PROJECTS.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(PROJECTS.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const { t } = useTranslation();
  return (
    <section
      className="bg-white dark:bg-gray-900 py-8 px-12"
      id="section-projects"
    >
      <div className="container mx-auto flex items-center flex-wrap max-w-[1280px]">
        <div className="container mx-auto flex  flex-col items-center flex-wrap pt-4">
          <h2 className="my-4 text-center text-5xl font-semibold  dark:text-gray-100 w-full">
            {t("SECTION.PROJECTS")}
          </h2>
          <HeaderSeparator />
        </div>
        {currentItems.map((project) => (
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
      <div className="flex items-center justify-center gap-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              className={`cursor-pointer  text-gray-100 ${
                currentPage == page
                  ? "bg-gray-900 hover:bg-gray-700 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-400 "
                  : "bg-gray-400 hover:bg-gray-700 dark:text-gray-900 dark:bg-gray-100 dark:hover:bg-gray-400"
              } h-10  w-10 p-2 text-white hover:bg-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-100`}
              key={page}
              onClick={() => handlePageChange(page)}
              title={`${page}`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </section>
  );
}
