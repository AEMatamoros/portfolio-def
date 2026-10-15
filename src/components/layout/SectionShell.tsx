import { useCallback, type ReactNode } from "react";
import { titleIdOf, type SectionId } from "@/config/site";
import { consumePendingHash, observeSection } from "@/lib/section-observer";

interface SectionShellProps {
  id: SectionId;
  className?: string;
  children: ReactNode;
}

/**
 * The single `<section>` of a content block, named by the heading whose id is
 * `titleIdOf(id)`. Sections never nest: wrappers in the app shell are `div`s.
 */
export function SectionShell({ id, className, children }: SectionShellProps) {
  const ref = useCallback(
    (el: HTMLElement) => {
      const stopObserving = observeSection(el);
      // A deep link or nav jump that arrived before this lazy section mounted.
      if (consumePendingHash(id)) el.scrollIntoView({ behavior: "instant" });
      return stopObserving;
    },
    [id],
  );

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={titleIdOf(id)}
      className={className}
    >
      {children}
    </section>
  );
}
