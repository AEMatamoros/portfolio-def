import { X } from "lucide-react";
import { useRef, type MouseEvent, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/molecules/LanguageToggle";
import { NavLinks } from "@/components/molecules/NavLinks";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SITE, type SectionId } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The menu button in the header. Its Radix trigger lives outside this lazy tree, so focus returns here by hand. */
  returnFocusRef: RefObject<HTMLElement | null>;
}

/** Navigation sheet for viewports below md. Lazy: the Radix Dialog stack loads on first use. */
export default function MobileMenu({
  open,
  onOpenChange,
  returnFocusRef,
}: MobileMenuProps) {
  const { t } = useTranslation();
  const targetRef = useRef<SectionId | null>(null);

  // The jump waits for the sheet to finish closing, so scroll lock and focus trap are gone.
  const navigate = (id: SectionId, event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    targetRef.current = id;
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        aria-describedby={undefined}
        className="w-10/12 sm:max-w-sm"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocusRef.current?.focus({ preventScroll: true });
          const target = targetRef.current;
          targetRef.current = null;
          if (target) scrollToSection(target);
        }}
      >
        <SheetHeader className="pr-14 text-left">
          <SheetTitle className="font-bold">{SITE.name}</SheetTitle>
        </SheetHeader>
        <SheetClose asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-3 right-3"
            aria-label={t("nav.closeMenu")}
          >
            <X aria-hidden />
          </Button>
        </SheetClose>
        <nav aria-label={t("nav.label")} className="px-1">
          <NavLinks orientation="vertical" withCv onNavigate={navigate} />
        </nav>
        <SheetFooter className="gap-4 border-t border-border">
          <div className="-ml-3 flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <SocialLinks
            className="-ml-1.5"
            onEmailClick={(event) => navigate("contact", event)}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
