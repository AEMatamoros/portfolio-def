import { useTranslation } from "react-i18next";

/** First focusable element: hidden until focused, then jumps past the header to the main content. */
export function SkipLink({ targetId }: { targetId: string }) {
  const { t } = useTranslation();
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
    >
      {t("a11y.skipToContent")}
    </a>
  );
}
