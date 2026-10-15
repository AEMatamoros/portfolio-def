import type { Ref } from "react";
import { ArrowUpRight } from "lucide-react";
import { ExternalLink } from "@/components/atoms/ExternalLink";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProjectCardData {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Without a URL the card is plain content: no link, no hover affordance. */
  url?: string;
  techs: readonly string[];
}

interface ProjectCardProps {
  project: ProjectCardData;
  /** Shown instead of the link affordance when the project has no URL. */
  noLinkLabel: string;
  /** Lets the grid move focus to this card's heading after "Show more". */
  headingRef?: Ref<HTMLHeadingElement>;
}

/**
 * Stretched-link card: the link is the project name, and its `::after` covers
 * the whole card, so the card is one target whose accessible name is the name.
 */
export function ProjectCard({
  project,
  noLinkLabel,
  headingRef,
}: ProjectCardProps) {
  const { name, url } = project;

  return (
    <Card
      className={cn(
        "relative h-full",
        url &&
          "transition-shadow hover:shadow-lg has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring",
      )}
    >
      <img
        src={project.image}
        alt={project.imageAlt}
        width={800}
        height={450}
        loading="lazy"
        decoding="async"
        className="aspect-video w-full object-cover"
      />
      <CardContent className="flex flex-1 flex-col gap-3">
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="text-lg leading-snug font-semibold"
        >
          {url ? (
            <ExternalLink
              href={url}
              className="flex items-start justify-between gap-2 outline-none after:absolute after:inset-0"
            >
              <span>{name}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-foreground"
              />
            </ExternalLink>
          ) : (
            name
          )}
        </h3>
        <p className="line-clamp-2 text-muted-foreground">
          {project.description}
        </p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-1">
          {project.techs.map((tech) => (
            <li key={tech}>
              <Badge variant="secondary">{tech}</Badge>
            </li>
          ))}
        </ul>
        {!url && <p className="text-xs text-muted-foreground">{noLinkLabel}</p>}
      </CardContent>
    </Card>
  );
}
