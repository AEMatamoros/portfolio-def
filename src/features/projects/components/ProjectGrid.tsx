import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ProjectCard,
  type ProjectCardData,
} from "@/features/projects/components/ProjectCard";

const INITIAL_COUNT = 6;
const STEP = 6;

interface ProjectGridProps {
  projects: readonly ProjectCardData[];
  showMoreLabel: string;
  noLinkLabel: string;
}

/** Responsive grid that reveals the list in batches instead of paginating it. */
export function ProjectGrid({
  projects,
  showMoreLabel,
  noLinkLabel,
}: ProjectGridProps) {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  /** Index of the first card of the latest "Show more" batch. */
  const [batchStart, setBatchStart] = useState<number | null>(null);
  const focusPending = useRef(false);

  // Runs when the first new card mounts, so focus follows the commit and never
  // lands on the "Show more" button that is about to be removed or pushed down.
  const focusBatchHeading = useCallback(
    (heading: HTMLHeadingElement | null) => {
      if (heading && focusPending.current) {
        focusPending.current = false;
        heading.focus();
      }
    },
    [],
  );

  const showMore = () => {
    focusPending.current = true;
    setBatchStart(visible);
    setVisible((count) => Math.min(count + STEP, projects.length));
  };

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, visible).map((project, index) => (
          <li key={project.id}>
            <ProjectCard
              project={project}
              noLinkLabel={noLinkLabel}
              headingRef={index === batchStart ? focusBatchHeading : undefined}
            />
          </li>
        ))}
      </ul>
      {visible < projects.length && (
        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg" onClick={showMore}>
            {showMoreLabel}
          </Button>
        </div>
      )}
    </>
  );
}
