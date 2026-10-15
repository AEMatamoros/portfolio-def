import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "@/components/atoms/ExternalLink";
import { NAV_ITEMS, SITE, type SectionId } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  orientation?: "horizontal" | "vertical";
  /** Appends the CV link for the active language after the section links. */
  withCv?: boolean;
  /** Runs on a section link click; call `preventDefault` to take over the navigation. */
  onNavigate?: (id: SectionId, event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  linkClassName?: string;
}

const BASE_LINK =
  "items-center rounded-full font-semibold motion-safe:transition-colors hover:bg-current/10 aria-[current=location]:bg-current/10";
const LINK_BY_ORIENTATION = {
  horizontal: "inline-flex px-3 py-2 text-sm",
  vertical: "flex w-full rounded-lg px-3 py-3 text-base",
} as const;

/** The section links, defined once and shared by the header, the mobile menu and the footer. */
export function NavLinks({
  orientation = "horizontal",
  withCv = false,
  onNavigate,
  className,
  linkClassName,
}: NavLinksProps) {
  const { t } = useTranslation();
  const locale = useLocale();
  const activeSection = useActiveSection();
  const link = cn(BASE_LINK, LINK_BY_ORIENTATION[orientation], linkClassName);

  return (
    <ul
      className={cn(
        "flex gap-1",
        orientation === "vertical" && "flex-col",
        className,
      )}
    >
      {NAV_ITEMS.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={link}
            aria-current={activeSection === item.id ? "location" : undefined}
            onClick={(event) => onNavigate?.(item.id, event)}
          >
            {t(item.labelKey)}
          </a>
        </li>
      ))}
      {withCv && (
        <li>
          <ExternalLink href={SITE.cv[locale]} className={link}>
            {t("nav.cv")}
          </ExternalLink>
        </li>
      )}
    </ul>
  );
}
