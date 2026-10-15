import {
  TimelineItem,
  type TimelineItemData,
} from "@/features/experience/components/TimelineItem";

interface TimelineProps {
  items: readonly TimelineItemData[];
  stackLabel: string;
  toolsLabel: string;
}

export function Timeline({ items, stackLabel, toolsLabel }: TimelineProps) {
  return (
    <ol className="flex flex-col gap-12 border-s border-border">
      {items.map((item) => (
        <TimelineItem
          key={item.id}
          item={item}
          stackLabel={stackLabel}
          toolsLabel={toolsLabel}
        />
      ))}
    </ol>
  );
}
