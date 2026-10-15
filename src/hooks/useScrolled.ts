import { useCallback, useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** True once the page has scrolled further than `threshold` pixels. */
export function useScrolled(threshold: number): boolean {
  const getSnapshot = useCallback(
    () => window.scrollY > threshold,
    [threshold],
  );
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
