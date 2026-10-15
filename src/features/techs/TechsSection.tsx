import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { titleIdOf } from "@/config/site";
import { TechMarquee } from "@/features/techs/components/TechMarquee";
import { TECHS } from "@/features/techs/data/techs";

export default function TechsSection() {
  const { t } = useTranslation();

  return (
    <SectionShell id="techs" className="bg-background py-12 md:py-16">
      <Container>
        <SectionHeader titleId={titleIdOf("techs")} title={t("techs.title")} />
      </Container>
      <div className="mt-12">
        <TechMarquee techs={TECHS} pauseLabel={t("a11y.pauseAnimation")} />
      </div>
    </SectionShell>
  );
}
