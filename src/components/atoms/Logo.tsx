import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

/** Monogram link to the top of the page; the owner's name is its accessible name. */
export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#hero"
      className={cn(
        "inline-flex h-10 items-center rounded-full px-2 text-2xl font-extrabold motion-safe:transition-transform motion-safe:hover:scale-110",
        className,
      )}
    >
      <span aria-hidden="true">A</span>
      <span className="sr-only">{SITE.name}</span>
    </a>
  );
}
