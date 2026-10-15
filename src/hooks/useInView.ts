import { useEffect, useState, type RefCallback } from "react";

export interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  /** Stop observing after the first intersection (default `true`). */
  once?: boolean;
}

/**
 * Reports whether an element intersects the viewport.
 *
 * The ref callback only stores the element in state. The observer is created in
 * an effect and disconnected in its cleanup, and `setInView` runs exclusively
 * inside the observer callback, so the hook behaves the same on React 18 and 19.
 */
export function useInView({
  threshold = 0.1,
  rootMargin = "0px",
  once = true,
}: UseInViewOptions = {}): [RefCallback<Element>, boolean] {
  const [element, setElement] = useState<Element | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
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
  }, [element, threshold, rootMargin, once]);

  return [setElement, inView];
}
