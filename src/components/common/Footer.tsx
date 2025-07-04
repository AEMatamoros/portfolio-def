import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-black dark:bg-gray-100">
      <div className="w-full max-w-screen-xl mx-auto p-14">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-100 dark:text-black">
              Alexis Matamoros
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                {t("SECTION.ABOUT")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                {t("SECTION.PROJECTS")}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                {t("SECTION.CONTACT")}
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center ">
          © 2025 . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
