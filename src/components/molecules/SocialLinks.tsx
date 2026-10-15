import { Mail } from "lucide-react";
import type { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { BrandIcon } from "@/components/atoms/BrandIcon";
import { ExternalLink } from "@/components/atoms/ExternalLink";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
  /** Applied to every link, for example the hover color. */
  linkClassName?: string;
  /** Lets a host (the mobile menu) close itself before the jump to the contact section. */
  onEmailClick?: MouseEventHandler<HTMLAnchorElement>;
}

/** GitHub, LinkedIn and an email shortcut to the contact section. */
export function SocialLinks({
  className,
  linkClassName,
  onEmailClick,
}: SocialLinksProps) {
  const { t } = useTranslation();
  const link = cn(
    "inline-flex size-8 items-center justify-center rounded-md transition-colors hover:text-muted-foreground",
    linkClassName,
  );

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      <li>
        <ExternalLink href={SITE.social.github} className={link}>
          <BrandIcon name="github" className="size-5" />
          <span className="sr-only">{t("a11y.github")}</span>
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={SITE.social.linkedin} className={link}>
          <BrandIcon name="linkedin" className="size-5" />
          <span className="sr-only">{t("a11y.linkedin")}</span>
        </ExternalLink>
      </li>
      <li>
        <a href="#contact" className={link} onClick={onEmailClick}>
          <Mail className="size-5" aria-hidden />
          <span className="sr-only">{t("a11y.email")}</span>
        </a>
      </li>
    </ul>
  );
}
