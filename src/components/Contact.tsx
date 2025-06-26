import ShinyText from "@Components/animations/ShinyText";
import useContactForm from "@Hooks/useContactForm";

import { useTranslation } from "react-i18next";
import HeaderSeparator from "@Components/ui/HeaderSeparator";

export default function Contact() {
  const { t } = useTranslation();
  const { register, handleSubmit, onSubmit, disable } = useContactForm();

  return (
    <section
      className={`bg-gray-100 dark:bg-black py-6 px-12 ${
        disable && "opacity-50 animate-pulse"
      }`}
      id="section-contact"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl pt-14 font-semibold tracking-tight text-balance text-black dark:text-gray-100 sm:text-5xl">
          {t("SECTION.CONTACT")}
        </h2>
        <HeaderSeparator />
        <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-100 font-semibold">
          {t("CONTACT.DESCRIPTION")}
        </p>
      </div>
      <form
        className="mx-auto mt-2 max-w-xl  bg-white p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-center font-semibold border-b-2 border-b-black dark:border-b-white mb-2">
          {t("CONTACT.SUBTITLE")}
        </p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="first-name"
              className="block text-sm/6 font-semibold text-black dark:text-gray-100"
            >
              {t("CONTACT.LABEL.NAME")}
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                {...register("name")}
                required
                type="text"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm/6 font-semibold text-black dark:text-gray-100"
            >
              {t("CONTACT.LABEL.COMPANY")}
            </label>
            <div className="mt-2.5">
              <input
                id="company"
                {...register("company")}
                required
                type="text"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm/6 font-semibold text-black dark:text-gray-100"
            >
              {t("CONTACT.LABEL.EMAIL")}
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                {...register("email")}
                required
                type="email"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              className="block text-sm/6 font-semibold text-black dark:text-gray-100"
            >
              {t("CONTACT.LABEL.PHONE")}
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <input
                  id="phone"
                  {...register("phone")}
                  required
                  type="phone"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm/6 font-semibold text-black dark:text-gray-100"
            >
              {t("CONTACT.LABEL.MESSAGE")}
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                {...register("message")}
                rows={4}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
        </div>
        <div className=" hero-button mt-10 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            disabled={disable}
            className="cursor-pointer rounded-md group bg-black dark:bg-gray-100 px-4 py-3 text-sm font-semibold shadow-xs hover:bg-black hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 dark:hover:bg-gray-200"
          >
            <ShinyText
              text={t("CONTACT.LABEL.SEND")}
              disabled={false}
              speed={3}
              className=""
            />
          </button>
        </div>
      </form>
    </section>
  );
}
