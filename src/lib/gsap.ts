/**
 * Lazy GSAP loader shared by every scroll reveal.
 *
 * GSAP and ScrollTrigger load once, on the first section that asks for them, and
 * never under reduced motion. Nothing is hidden before this module has loaded, so
 * a failed import leaves the page fully visible.
 */

type GsapModules = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

const REFRESH_DEBOUNCE_MS = 150;

let pending: Promise<GsapModules> | undefined;
let ready: GsapModules | undefined;
let refreshTimer: number | undefined;

/** Starts the load on first use; later calls share the same promise. */
export function loadGsap(): Promise<GsapModules> {
  pending ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      // Registering keeps ScrollTrigger's default refresh events, resize included.
      gsap.registerPlugin(ScrollTrigger);
      ready = { gsap, ScrollTrigger };

      // Lazy section mounts, "show more" and late images all resize <main>.
      const main = document.getElementById("main");
      if (main) new ResizeObserver(requestScrollRefresh).observe(main);
      void document.fonts?.ready.then(requestScrollRefresh);

      return ready;
    },
  );
  return pending;
}

/**
 * Recomputes every trigger position after the layout changed. Debounced, and a
 * no-op until GSAP has loaded.
 */
export function requestScrollRefresh(): void {
  if (!ready) return;
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(
    () => ready?.ScrollTrigger.refresh(),
    REFRESH_DEBOUNCE_MS,
  );
}
