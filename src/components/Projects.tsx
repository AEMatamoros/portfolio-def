import HeaderSeparator from "@Components/ui/HeaderSeparator";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PROJECTS } from "@Constants/projects";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const [animate, setAnimate] = useState(false);
  const itemsPerPage = 6;
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
    }, 300);
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
            <Card
              key={project.name}
              className="w-full max-w-[380px] flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full"
              >
                <img
                  className="w-full object-cover aspect-[380/192]"
                  src={project.img}
                  alt={project.name}
                  width={380}
                  height={192}
                  loading="lazy"
                  decoding="async"
                />
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 pb-4">
                  {project.techs.map((tec) => (
                    <Badge key={tec} variant="secondary">
                      {tec}
                    </Badge>
                  ))}
                </CardContent>
                <CardFooter className="mt-auto border-t bg-muted/30 pt-4">
                  <span
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "w-full pointer-events-none",
                    )}
                  >
                    {t("BUTTON.SEE_MORE") || "Ver Más"}
                  </span>
                </CardFooter>
              </a>
            </Card>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
          {currentPage !== 1 && (
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              aria-label="Previous page"
            >
              &lt;
            </Button>
          )}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className="h-10 w-10"
                onClick={() => handlePageChange(page)}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </Button>
            ),
          )}
          {currentPage !== totalPages && (
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              aria-label="Next page"
            >
              &gt;
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
