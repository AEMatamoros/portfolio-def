import { useCallback, useMemo, type ReactNode } from "react";
import { titleIdOf, type SectionId } from "@/config/site";
import { useReveal } from "@/hooks/useReveal";
import { mergeRefs } from "@/lib/merge-refs";
import { consumePendingHash, observeSection } from "@/lib/section-observer";

interface SectionShellProps {
  id: SectionId;
  /** Fade the section in the first time it scrolls into view (default `true`). */
  reveal?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * The single `<section>` of a content block, named by the heading whose id is
 * `titleIdOf(id)`. Sections never nest: wrappers in the app shell are `div`s.
 * The hero opts out of the reveal so it never flashes at load.
 */
export function SectionShell({
  id,
  reveal = true,
  className,
  children,
}: SectionShellProps) {
  const revealRef = useReveal(reveal);
  const observeRef = useCallback(
    (el: HTMLElement) => {
      const stopObserving = observeSection(el);
      // A deep link or nav jump that arrived before this lazy section mounted.
      if (consumePendingHash(id)) el.scrollIntoView({ behavior: "instant" });
      return stopObserving;
    },
    [id],
  );
  const ref = useMemo(
    () => mergeRefs(revealRef, observeRef),
    [revealRef, observeRef],
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
