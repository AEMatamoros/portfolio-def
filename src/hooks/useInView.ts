import { useCallback, useState, type RefCallback } from "react";

export interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  /** Stop observing after the first intersection (default `true`). */
  once?: boolean;
}

/**
 * Reports whether an element intersects the viewport.
 *
 * The observer is created inside the ref callback and disconnected by the cleanup
 * it returns (the React 19 ref contract), so it needs no effect. `setInView` runs
 * only inside the observer callback.
 */
export function useInView({
  threshold = 0.1,
  rootMargin = "0px",
  once = true,
}: UseInViewOptions = {}): [RefCallback<Element>, boolean] {
  const [inView, setInView] = useState(false);

  const ref = useCallback(
    (element: Element | null) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const intersecting = entries.some((entry) => entry.isIntersecting);
          if (intersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        },
        { threshold, rootMargin },
      );

      observer.observe(element);
      return () => observer.disconnect();
    },
    [threshold, rootMargin, once],
  );

  return [ref, inView];
}
