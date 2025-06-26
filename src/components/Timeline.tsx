import formatDate from "@Utils/DateFormatter";
import HeaderSeparator from "@Components/ui/HeaderSeparator";
import { useTranslation } from "react-i18next";
import { EXPERIENCE } from "@Constants/experience";

export default function Timeline() {
  const { t, i18n } = useTranslation();
  return (
    <section
      className="bg-white dark:bg-black py-8 px-12"
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
              <h3 className="text-lg font-semibold text-black dark:text-gray-100">
                {place.name}
                <span className="text-primary px-4">{place.descriptionEN}</span>
              </h3>
              <p className="text-center text-base font-normal text-gray-500  md:text-left">
                {i18n.language === "es"
                  ? place.positionDescripcionES
                  : place.positionDescripcionEN}
              </p>
              {place.tools && place.tools.length > 0 && (
                <ul className="flex flex-wrap gap-2 mt-2">
                  {place.tools.map((tool: string, idx: number) => (
                    <li
                      key={idx}
                      className="bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-200 px-2 py-1 rounded"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              )}

              {place.tecs && place.tecs.length > 0 && (
                <div className="mt-4">
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {place.tecs.map((tec: string, idx: number) => (
                      <li
                        key={idx}
                        className="bg-black dark:bg-white text-xs text-white dark:text-black px-2 py-1 rounded"
                      >
                        {tec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
