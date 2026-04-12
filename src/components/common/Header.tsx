import LangToogle from "@Components/ui/LangToogle";
import ThemeToggle from "@Components/ui/ThemeToogle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";

import EnCv from "@Assets/files/Alexis_Matamoros_CV_English.pdf";
import EsCv from "@Assets/files/Alexis_Matamoros_CV_Español.pdf";

const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
};

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { t, i18n } = useTranslation();

  const isScrolled = useScroll();

  const linkClass = (base: string) =>
    `${base} ${
      isScrolled
        ? "text-white dark:text-black"
        : "text-gray-700 dark:text-gray-100"
    }`;

  return (
    <header
      className={`${
        isScrolled
          ? "shadow-md md:shadow-none md:rounded-full w-full p-4 md:w-6/12 md:mx-auto md:mt-2 md:p-2 md:bg-black dark:md:bg-gray-100 "
          : "w-full p-4 shadow-md "
      } sticky-nav fixed inset-x-0 top-0 z-50 mx-auto  bg-gray-100 dark:bg-black dark:shadow-white/50`}
    >
      <nav
        className="flex items-center justify-between  md:px-8 w-11/12 mx-auto max-w-[1280px]"
        aria-label="Global"
      >
        <div className="flex md:flex-1">
          <a href="#section-hero" className="-m-1.5 p-1.5">
            <p
              className={`${
                isScrolled && "md:text-white dark:md:text-black"
              } h-10 font-extrabold text-2xl text-black dark:text-gray-100 transform hover:scale-110`}
            >
              A
            </p>
          </a>
        </div>

        <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
          <div className="flex md:hidden">
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="-m-2.5 text-gray-700 dark:text-gray-100"
                aria-label="Open main menu"
              >
                <Menu className="size-6" aria-hidden />
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent side="right" className="w-10/12 sm:max-w-sm">
            <SheetHeader className="text-left">
              <SheetTitle className="font-bold">Alexis Matamoros</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="#section-timeline"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-700 dark:text-gray-100 hover:bg-muted"
                onClick={() => setShowSidebar(false)}
              >
                {t("SECTION.ABOUT")}
              </a>
              <a
                href="#section-projects"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-700 dark:text-gray-100 hover:bg-muted"
                onClick={() => setShowSidebar(false)}
              >
                {t("SECTION.PROJECTS")}
              </a>
              <a
                href="#section-contact"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-700 dark:text-gray-100 hover:bg-muted"
                onClick={() => setShowSidebar(false)}
              >
                {t("SECTION.CONTACT")}
              </a>
              <a
                href={i18n.language === "es" ? EsCv : EnCv}
                target="_blank"
                rel="noopener noreferrer"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-700 dark:text-gray-100 hover:bg-muted"
                onClick={() => setShowSidebar(false)}
              >
                CV
              </a>
            </div>
            <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6">
              <LangToogle />
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex md:items-center md:gap-x-12 lg">
          <a
            href="#section-timeline"
            className={linkClass(
              "text-sm/6 font-semibold  transform hover:scale-110",
            )}
          >
            {t("SECTION.ABOUT")}
          </a>
          <a
            href="#section-projects"
            className={linkClass(
              "text-sm/6 font-semibold  transform hover:scale-110",
            )}
          >
            {t("SECTION.PROJECTS")}
          </a>
          <a
            href="#section-contact"
            className={linkClass(
              "text-sm/6 font-semibold  transform hover:scale-110",
            )}
          >
            {t("SECTION.CONTACT")}
          </a>
          <a
            href={i18n.language === "es" ? EsCv : EnCv}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass(
              "text-sm/6 font-semibold  transform hover:scale-110",
            )}
          >
            CV
          </a>
        </div>
        <div className="hidden md:flex md:flex-1 md:justify-end">
          <LangToogle />
          <ThemeToggle />
        </div>
      </nav>
      <span className=" md:absolute md:bottom-0 md:inline-block md:w-full md:right-full md:sticky-header md:bg-black dark:md:bg-white h-[2px] md:h-0 w-full" />
    </header>
  );
}
