import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { NavLinks } from "@/components/molecules/NavLinks";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { SITE } from "@/config/site";

const YEAR = new Date().getFullYear();

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="surface-inverse bg-foreground text-background">
      <Container className="py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-2xl font-semibold">{SITE.name}</p>
          <nav aria-label={t("nav.footerLabel")}>
            <NavLinks />
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-background/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-background/70">
            {t("footer.rights", { year: YEAR })}
          </p>
          <SocialLinks linkClassName="hover:text-background/70" />
        </div>
      </Container>
    </footer>
  );
}
