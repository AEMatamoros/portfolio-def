import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Id of the heading; must equal `titleIdOf(sectionId)` of the enclosing section. */
  titleId: string;
  title: string;
  eyebrow?: string;
  lead?: string;
  actions?: ReactNode;
  className?: string;
}

/** A `div`, not `<header>`: the page has a single banner landmark. */
export function SectionHeader({
  titleId,
  title,
  eyebrow,
  lead,
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {eyebrow && (
        <p className="text-eyebrow text-muted-foreground">{eyebrow}</p>
      )}
      <h2 id={titleId} className="text-title">
        {title}
      </h2>
      {lead && <p className="text-lead text-muted-foreground">{lead}</p>}
      {actions && <div className="mt-2 flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
