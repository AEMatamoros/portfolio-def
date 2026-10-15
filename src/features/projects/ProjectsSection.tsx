import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { titleIdOf } from "@/config/site";
import { ProjectGrid } from "@/features/projects/components/ProjectGrid";
import type { ProjectCardData } from "@/features/projects/components/ProjectCard";
import { PROJECTS } from "@/features/projects/data/projects";
import { useLocale } from "@/hooks/useLocale";
import { pickLocale } from "@/lib/localize";

export default function ProjectsSection() {
  const { t } = useTranslation();
  const locale = useLocale();

  const projects = PROJECTS.map((project): ProjectCardData => ({
    id: project.id,
    name: project.name,
    description: pickLocale(project.description, locale),
    image: project.image,
    imageAlt: t("projects.imageAlt", { name: project.name }),
    url: project.url,
    techs: project.techs,
  }));

  return (
    <SectionShell id="projects" className="bg-background py-16 md:py-24">
      <Container>
        <SectionHeader
          titleId={titleIdOf("projects")}
          title={t("projects.title")}
        />
        <div className="mt-12">
          <ProjectGrid
            projects={projects}
            showMoreLabel={t("projects.showMore")}
            noLinkLabel={t("projects.noLink")}
          />
        </div>
      </Container>
    </SectionShell>
  );
}
