import type { ThemeOrigin } from "@/theme/theme-context";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const PROPERTIES = ["--theme-x", "--theme-y", "--theme-r"] as const;

/**
 * Runs `commit` inside a View Transition that reveals the new theme as a circle
 * growing from `origin`. Under reduced motion, or when the API is missing, the
 * change is applied immediately.
 */
export function runThemeTransition(
  commit: () => void,
  origin?: ThemeOrigin,
): void {
  const reduce = window.matchMedia(REDUCED_MOTION).matches;
  if (reduce || typeof document.startViewTransition !== "function") {
    commit();
    return;
  }

  const { innerWidth: width, innerHeight: height } = window;
  const x = origin?.x ?? width;
  const y = origin?.y ?? 0;
  const radius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));

  const root = document.documentElement;
  root.style.setProperty("--theme-x", `${x}px`);
  root.style.setProperty("--theme-y", `${y}px`);
  root.style.setProperty("--theme-r", `${radius}px`);

  const cleanup = () =>
    PROPERTIES.forEach((property) => root.style.removeProperty(property));
  document.startViewTransition(commit).finished.then(cleanup, cleanup);
}
