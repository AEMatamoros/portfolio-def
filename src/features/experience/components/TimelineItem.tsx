import { Badge } from "@/components/ui/badge";
import type { YearMonth } from "@/lib/dates";
import { cn } from "@/lib/utils";

export interface TimelineItemData {
  id: string;
  company: string;
  role: string;
  summary: string;
  start: YearMonth;
  startLabel: string;
  /** Present for finished entries; the current entry has none. */
  end?: YearMonth;
  /** The month of `end`, or the localized "current" label. */
  endLabel: string;
  duration: string;
  stack: readonly string[];
  tools: readonly string[];
}

interface TimelineItemProps {
  item: TimelineItemData;
  stackLabel: string;
  toolsLabel: string;
}

export function TimelineItem({
  item,
  stackLabel,
  toolsLabel,
}: TimelineItemProps) {
  const current = item.end === undefined;

  return (
    <li className="relative ps-6 md:grid md:grid-cols-[12rem_minmax(0,1fr)] md:gap-x-8 md:ps-10">
      <span
        aria-hidden="true"
        className={cn(
          "absolute -start-[5.5px] top-1.5 size-2.5 rounded-full border border-background bg-muted-foreground",
          current && "bg-foreground ring-4 ring-foreground/15",
        )}
      />
      <div className="text-sm text-muted-foreground md:pt-0.5">
        <p className="font-medium">
          <time dateTime={item.start}>{item.startLabel}</time>
          {" – "}
          {item.end ? (
            <time dateTime={item.end}>{item.endLabel}</time>
          ) : (
            <span className="text-foreground">{item.endLabel}</span>
          )}
        </p>
        <p>{item.duration}</p>
      </div>
      <div className="mt-2 md:mt-0">
        <h3 className="text-lg font-semibold text-foreground">
          {item.company}
        </h3>
        <p className="text-sm font-medium text-muted-foreground">{item.role}</p>
        <p className="mt-3 max-w-prose text-base text-foreground/80">
          {item.summary}
        </p>
        <ul aria-label={stackLabel} className="mt-4 flex flex-wrap gap-2">
          {item.stack.map((name) => (
            <li key={name}>
              <Badge variant="secondary">{name}</Badge>
            </li>
          ))}
        </ul>
        <ul aria-label={toolsLabel} className="mt-2 flex flex-wrap gap-2">
          {item.tools.map((name) => (
            <li key={name}>
              <Badge variant="outline">{name}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
