import { useTranslation } from "react-i18next";
import { PROJECTS } from "@Constants/projects";
import { useState } from "react";
import HeaderSeparator from "@Components/ui/HeaderSeparator";

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const [animate, setAnimate] = useState(false);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PROJECTS.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(PROJECTS.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    setAnimate(true);
    setTimeout(() => {
      setCurrentPage(page);
      setAnimate(false);
    }, 300); // duration matches animation
  };
  const { t } = useTranslation();
  return (
    <section
      className="bg-white dark:bg-black py-12 px-4 md:px-12"
      id="section-projects"
    >
      <div className="container mx-auto max-w-[1280px]">
        <div className="flex flex-col items-center mb-8">
          <h2 className="my-4 text-center text-4xl md:text-5xl font-bold dark:text-gray-100 w-full">
            {t("SECTION.PROJECTS")}
          </h2>
          <HeaderSeparator />
        </div>
        <div
          className={`flex flex-wrap gap-6 justify-center items-stretch transition-opacity duration-300 ${
            animate ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentItems.map((project) => (
            <div
              className="bg-gray-50 dark:bg-gray-900  shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col group"
              key={project.name}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full"
              >
                <img
                  className="w-full h-48 object-cover "
                  src={project.img}
                  alt={project.name}
                />
                <div className="flex-1 flex flex-col justify-between p-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">
                      {project.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.techs.map((tec) => (
                        <span
                          className="bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1  text-gray-800 dark:text-gray-200"
                          key={tec}
                        >
                          {tec}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="mt-auto bg-black dark:bg-gray-100 text-gray-100 dark:text-black px-3 py-1 rounded hover:bg-gray-800 dark:hover:bg-gray-300 transition-colors text-sm font-medium"
                    type="button"
                  >
                    {t("BUTTON.SEE_MORE") || "Ver Más"}
                  </button>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-10">
          {currentPage !== 1 && (
            <button
              className="h-10 w-10 cursor-pointer flex items-center justify-center bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              aria-label="Previous page"
            >
              &lt;
            </button>
          )}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                className={`h-10 w-10 cursor-pointer flex items-center justify-center font-semibold transition
                  ${
                    currentPage === page
                      ? "bg-black text-white dark:bg-gray-100 dark:text-black"
                      : "bg-gray-200 text-black dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                key={page}
                onClick={() => handlePageChange(page)}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            )
          )}
          {currentPage !== totalPages && (
            <button
              className="h-10 w-10 cursor-pointer flex items-center justify-center bg-gray-300 dark:bg-gray-700 text-black dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              aria-label="Next page"
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
