import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { titleIdOf } from "@/config/site";
import { Timeline } from "@/features/experience/components/Timeline";
import type { TimelineItemData } from "@/features/experience/components/TimelineItem";
import { EXPERIENCE } from "@/features/experience/data/experience";
import { useLocale } from "@/hooks/useLocale";
import { formatYearMonth, monthsSpan, toYearMonth } from "@/lib/dates";
import { pickLocale } from "@/lib/localize";

/** Captured once at module scope, so render stays pure. */
const NOW = toYearMonth(new Date());

export default function ExperienceSection() {
  const { t } = useTranslation();
  const locale = useLocale();

  const items = EXPERIENCE.map((entry): TimelineItemData => {
    const { years, months } = monthsSpan(entry.start, entry.end ?? NOW);
    const duration = [
      years > 0 && t("experience.duration.years", { count: years }),
      months > 0 && t("experience.duration.months", { count: months }),
    ]
      .filter(Boolean)
      .join(" ");

    return {
      id: entry.id,
      company: entry.company,
      role: pickLocale(entry.role, locale),
      summary: pickLocale(entry.summary, locale),
      start: entry.start,
      startLabel: formatYearMonth(entry.start, locale),
      end: entry.end,
      endLabel: entry.end
        ? formatYearMonth(entry.end, locale)
        : t("experience.current"),
      duration,
      stack: entry.stack,
      tools: entry.tools,
    };
  });

  return (
    <SectionShell id="experience" className="bg-background py-16 md:py-24">
      <Container>
        <SectionHeader
          titleId={titleIdOf("experience")}
          title={t("experience.title")}
        />
        <div className="mt-12">
          <Timeline
            items={items}
            stackLabel={t("experience.stack")}
            toolsLabel={t("experience.tools")}
          />
        </div>
      </Container>
    </SectionShell>
  );
}
