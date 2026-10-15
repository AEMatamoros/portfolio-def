const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function behavior(): ScrollBehavior {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches ? "auto" : "smooth";
}

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: behavior() });
}

/**
 * Scrolls a mounted section into view and records it in the URL. A section whose
 * lazy chunk has not mounted yet is requested through the hash instead; the
 * section consumes that pending hash when it mounts.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: behavior() });
    window.history.pushState(null, "", `#${id}`);
  } else {
    window.location.hash = id;
  }
}
