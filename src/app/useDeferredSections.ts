import { useEffect, useState } from "react";
import { onIdle } from "@/lib/idle";

/** Longest the sections wait for an idle moment before mounting anyway. */
const IDLE_TIMEOUT_MS = 1500;

/**
 * Tells the app shell when the sections below the hero may mount.
 *
 * A deep link mounts them at once. Otherwise they mount after the hero has
 * painted, on the first of: an idle moment (at most 1.5 s), a `hashchange` (nav
 * link, CTA, skip link) or the first scroll. `setReady` only runs in callbacks.
 */
export function useDeferredSections(): boolean {
  const [ready, setReady] = useState(() => window.location.hash !== "");

  useEffect(() => {
    if (ready) return;

    const start = () => setReady(true);
    const cancelIdle = onIdle(start, IDLE_TIMEOUT_MS);
    window.addEventListener("hashchange", start);
    window.addEventListener("scroll", start, { passive: true });

    return () => {
      cancelIdle();
      window.removeEventListener("hashchange", start);
      window.removeEventListener("scroll", start);
    };
  }, [ready]);

  return ready;
}
