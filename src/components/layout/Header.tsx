import { Menu } from "lucide-react";
import { lazy, Suspense, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/atoms/Logo";
import { LanguageToggle } from "@/components/molecules/LanguageToggle";
import { NavLinks } from "@/components/molecules/NavLinks";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

const MobileMenu = lazy(() => import("@/components/layout/MobileMenu"));

const SCROLL_THRESHOLD = 48;

/**
 * Full-width bar at the top. Once scrolled it keeps that bar below md and turns into a
 * floating inverted pill from md up; the pill inherits `text-current` colors and the
 * inverse focus ring instead of repeating the palette.
 */
export function Header() {
  const { t } = useTranslation();
  const scrolled = useScrolled(SCROLL_THRESHOLD);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // shadcn buttons ring with --ring, which is invisible on the inverted pill.
  const pillRing =
    scrolled &&
    "md:focus-visible:border-background md:focus-visible:ring-background/60";

  const openMenu = () => {
    setMenuMounted(true);
    setMenuOpen(true);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto w-full max-w-full border-b border-transparent bg-background/80 text-foreground backdrop-blur",
          "motion-safe:transition-[width,max-width,margin-top,border-radius,background-color,color] motion-safe:duration-300",
          scrolled &&
            "border-border md:mt-3 md:w-[calc(100%-2rem)] md:max-w-3xl md:rounded-full md:border-transparent md:bg-foreground md:text-background md:surface-inverse",
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-x-4 px-5 md:px-8",
            scrolled && "md:h-14 md:px-4",
          )}
        >
          <Logo />
          <nav aria-label={t("nav.label")} className="hidden md:block">
            <NavLinks withCv />
          </nav>
          <div className="hidden items-center gap-x-1 md:flex">
            <LanguageToggle className={pillRing || undefined} />
            <ThemeToggle className={pillRing || undefined} />
          </div>
          <Button
            ref={menuButtonRef}
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={t("nav.openMenu")}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={openMenu}
          >
            <Menu className="size-6" aria-hidden />
          </Button>
        </div>
      </div>
      {menuMounted && (
        <Suspense fallback={null}>
          <MobileMenu
            open={menuOpen}
            onOpenChange={setMenuOpen}
            returnFocusRef={menuButtonRef}
          />
        </Suspense>
      )}
    </header>
  );
}
