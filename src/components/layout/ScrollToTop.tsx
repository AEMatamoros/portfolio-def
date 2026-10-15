import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useScrolled } from "@/hooks/useScrolled";
import { scrollToTop } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 400;

/** Appears after the first screen of scrolling; while hidden it is inert, so it cannot be focused. */
export function ScrollToTop() {
  const { t } = useTranslation();
  const visible = useScrolled(SCROLL_THRESHOLD);

  const handleClick = () => {
    scrollToTop();
    // The focused button turns inert once the page reaches the top, so focus moves on.
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <Button
      type="button"
      size="icon"
      aria-label={t("a11y.scrollToTop")}
      inert={!visible}
      onClick={handleClick}
      className={cn(
        "fixed right-6 bottom-6 z-40 rounded-full shadow-md motion-safe:transition-opacity motion-safe:duration-300 lg:right-16",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUp aria-hidden />
    </Button>
  );
}
