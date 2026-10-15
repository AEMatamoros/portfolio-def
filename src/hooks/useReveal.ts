import { useCallback, type RefCallback } from "react";
import { loadGsap, requestScrollRefresh } from "@/lib/gsap";

const MOTION_OK = "(prefers-reduced-motion: no-preference)";
/** Fraction of the viewport height below which a section is still off screen. */
const VIEWPORT_FRACTION = 0.85;

/**
 * Ref callback that fades a section in once, the first time it scrolls into view.
 *
 * Nothing is hidden until GSAP has loaded, a section already on screen (a deep
 * link, a nav jump) is left alone, and reduced motion never loads GSAP at all.
 * The tween moves the section's children, never the section box itself, so the
 * trigger position and the `scroll-padding-top` landing spot of anchor links stay
 * exactly where they are. The cleanup reverts only this section's tween and trigger.
 */
export function useReveal(enabled = true): RefCallback<HTMLElement> {
  return useCallback(
    (el: HTMLElement | null) => {
      if (!enabled || !el || !window.matchMedia(MOTION_OK).matches) return;

      let cancelled = false;
      let revert: (() => void) | undefined;

      loadGsap()
        .then(({ gsap }) => {
          if (cancelled) return;
          const mm = gsap.matchMedia();
          revert = () => mm.revert();
          mm.add(MOTION_OK, () => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight * VIEWPORT_FRACTION) return;
            gsap.from(Array.from(el.children), {
              opacity: 0,
              y: 40,
              duration: 0.6,
              ease: "power2.out",
              clearProps: "opacity,transform",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            });
          });
          requestScrollRefresh();
        })
        // The import failed: nothing was hidden, so the content simply stays visible.
        .catch(() => undefined);

      return () => {
        cancelled = true;
        revert?.();
      };
    },
    [enabled],
  );
}
