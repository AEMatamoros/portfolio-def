import { useTranslation } from "react-i18next";
import { ShinyText } from "@/components/animations/ShinyText";
import { SplitText } from "@/components/animations/SplitText";
import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/button";
import { SITE, titleIdOf } from "@/config/site";
import darkPattern from "@/features/hero/assets/hero-pattern-dark.webp";
import lightPattern from "@/features/hero/assets/hero-pattern-light.webp";
import { HeroBackground } from "@/features/hero/components/HeroBackground";
import { useLocale } from "@/hooks/useLocale";

const LETTERS_FROM = { opacity: 0, transform: "translate3d(0,50px,0)" };
const LETTERS_TO = { opacity: 1, transform: "translate3d(0,0,0)" };

export function HeroSection() {
  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <SectionShell
      id="hero"
      reveal={false}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      <HeroBackground lightSrc={lightPattern} darkSrc={darkPattern} />
      <div className="relative isolate max-w-[1280px] px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl p-8 sm:py-48 lg:py-32">
          <p className="w-full py-2 text-xl font-semibold text-foreground/80">
            {t("hero.greeting")}
          </p>
          <div className="text-center">
            <SplitText
              as="h1"
              id={titleIdOf("hero")}
              text={SITE.name}
              className="text-display text-foreground"
              delay={150}
              animationFrom={LETTERS_FROM}
              animationTo={LETTERS_TO}
              threshold={0.2}
              rootMargin="-50px"
            />
            <div className="my-4 md:my-8">
              <SplitText
                as="p"
                text={t("hero.description")}
                className="text-lead mt-8 font-medium text-muted-foreground"
                delay={10}
                animationFrom={LETTERS_FROM}
                animationTo={LETTERS_TO}
                threshold={0.2}
                rootMargin="-50px"
              />
            </div>
            <div className="animate-fade-in-slow mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-6 text-base font-semibold"
              >
                <a href="#contact">
                  <ShinyText text={t("hero.primaryCta")} speed={3} />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-6 text-base font-semibold"
              >
                <a href={SITE.cv[locale]} download>
                  {t("hero.downloadCv")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
