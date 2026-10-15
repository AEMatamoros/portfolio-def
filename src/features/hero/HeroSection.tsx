import { SplitText } from "@/components/animations/SplitText";
import ShinyText from "@/components/animations/ShinyText";
import { useDocumentDark } from "@/hooks/useDocumentDark";
import { useTranslation } from "react-i18next";
import mainBg from "@/features/hero/assets/hero-pattern-light.webp";
import mainBgDark from "@/features/hero/assets/hero-pattern-dark.webp";

export default function Hero() {
  const { t } = useTranslation();
  const isDark = useDocumentDark();
  const heroSrc = isDark ? mainBgDark : mainBg;

  return (
    <section
      className="min-h-screen bg-white dark:bg-black flex justify-center items-center relative overflow-hidden"
      id="section-hero"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        aria-hidden="true"
      >
        <img
          src={heroSrc}
          alt=""
          fetchPriority="high"
          className="w-full h-full object-cover animate-bg-move"
          style={{
            position: "absolute",
            inset: 0,
            minHeight: "100%",
            minWidth: "100%",
          }}
        />
      </div>
      <div className="relative isolate px-6 pt-14 lg:px-8 max-w-[1280px]">
        <div className="mx-auto max-w-4xl p-8 sm:py-48 lg:py-32">
          <p className="font-semibold py-2 text-xl text-gray-700 dark:text-gray-200 w-full">
            {t("CONTACT.HERO.INIT")}
          </p>
          <div className="text-center">
            <SplitText
              text="Alexis Matamoros"
              className="text-5xl font-semibold tracking-tight text-balance text-black dark:text-gray-100 sm:text-6xl"
              delay={150}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              threshold={0.2}
              rootMargin="-50px"
            />
            <div className="my-4 md:my-8">
              <SplitText
                text={t("HERO.DESCRIPTION")}
                className="mt-8 text-lg font-medium text-pretty text-gray-500 dark:text-gray-300 sm:text-xl/8"
                delay={10}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,50px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                threshold={0.2}
                rootMargin="-50px"
              />
            </div>
            <div className=" hero-button mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#section-timeline"
                className="rounded-sm group bg-black dark:bg-gray-100 px-4 py-3 text-md font-semibold shadow-xs hover:bg-black hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 dark:hover:bg-gray-200"
              >
                <ShinyText
                  text={t("SECTION.ABOUT")}
                  disabled={false}
                  speed={3}
                  className=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-32 z-10 dark:hidden block"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, transparent, white 90%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-32 z-10 dark:block hidden"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, transparent, black 90%)",
        }}
      />
    </section>
  );
}
