/**
 * Framework-free store behind the active-section state and deep-link handling.
 *
 * One shared IntersectionObserver watches a thin band across the middle of the
 * viewport. The section crossing that band is the active one, and the last value
 * is kept while the band sits between sections.
 */

type Listener = () => void;

const BAND_MARGIN = "-45% 0px -50% 0px";

const listeners = new Set<Listener>();
let observer: IntersectionObserver | undefined;
let activeSection: string | null = null;
let pendingHash: string | null = null;

function notify() {
  listeners.forEach((listener) => listener());
}

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && activeSection !== entry.target.id) {
          activeSection = entry.target.id;
          notify();
        }
      }
    },
    { rootMargin: BAND_MARGIN },
  );
  return observer;
}

/** Starts tracking a mounted section; returns the cleanup that stops it. */
export function observeSection(el: HTMLElement): () => void {
  const io = getObserver();
  io.observe(el);
  return () => io.unobserve(el);
}

export function subscribeActiveSection(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getActiveSection(): string | null {
  return activeSection;
}

/**
 * A hash target that was not in the DOM when it was requested (its lazy chunk had
 * not mounted yet) is remembered until the section mounts and asks for it.
 */
function rememberHash() {
  const id = window.location.hash.slice(1);
  pendingHash = id && !document.getElementById(id) ? id : null;
}

/** True once for the section that a not-yet-mounted hash pointed at. */
export function consumePendingHash(id: string): boolean {
  if (pendingHash !== id) return false;
  pendingHash = null;
  return true;
}

if (typeof window !== "undefined") {
  rememberHash();
  window.addEventListener("hashchange", rememberHash);
}
