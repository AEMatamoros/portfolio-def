import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";

type ExternalLinkProps = Omit<ComponentProps<"a">, "target" | "rel">;

/** A link that opens in a new tab and says so to screen readers. */
export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  const { t } = useTranslation();
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> {t("a11y.opensInNewTab")}</span>
    </a>
  );
}
