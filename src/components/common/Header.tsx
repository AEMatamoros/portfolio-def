import LangToogle from "@Components/ui/LangToogle";
import ThemeToggle from "@Components/ui/ThemeToogle";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="fixed inset-x-0 top-0 z-50  shadow-md bg-gray-100 dark:bg-gray-900 dark:shadow-white/50">
      <nav
        className="flex items-center justify-between p-4 md:px-8"
        aria-label="Global"
      >
        <div className="flex md:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="h-10 font-extrabold text-2xl text-black dark:text-gray-100">
              A
            </span>
          </a>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-100 cursor-pointer"
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex md:items-center md:gap-x-12 lg">
          <a
            href="#section-timeline"
            className="text-sm/6 font-semibold text-gray-700 dark:text-gray-100"
          >
            {t("SECTION.ABOUT")}
          </a>
          <a
            href="#section-projects"
            className="text-sm/6 font-semibold text-gray-700 dark:text-gray-100"
          >
            {t("SECTION.PROJECTS")}
          </a>
          <a
            href="#section-contact"
            className="text-sm/6 font-semibold text-gray-700 dark:text-gray-100"
          >
            {t("SECTION.CONTACT")}
          </a>
          <a
            href="#"
            className="text-sm/6 font-semibold text-gray-700 dark:text-gray-100"
          >
            CV
          </a>
        </div>
        <div className="hidden md:flex md:flex-1 md:justify-end">
          <LangToogle />
          <ThemeToggle />
        </div>
      </nav>
      <div
        className={`md:hidden fixed h-screen w-full transition-all transform top-0 ${
          showSidebar ? "" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-50"></div>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-100 dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="font-bold dark:text-gray-100">
                Alexis Matamoros
              </span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200 cursor-pointer"
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-700 dark:text-gray-100 hover:bg-gray-50"
                >
                  {t("SECTION.ABOUT")}
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-700 dark:text-gray-100 hover:bg-gray-50"
                >
                  {t("SECTION.PROJECTS")}
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-700 dark:text-gray-100 hover:bg-gray-50"
                >
                  {t("SECTION.CONTACT")}
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-700 dark:text-gray-100 hover:bg-gray-50"
                >
                  CV
                </a>
              </div>
              <div className="py-6">
                <LangToogle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className=" absolute bottom-0 nline-block w-full right-full sticky-header bg-gray-900 dark:bg-white h-[2px]"></span>
    </header>
  );
}
