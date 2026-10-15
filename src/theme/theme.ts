export const THEME_STORAGE_KEY = "theme";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = Exclude<ThemeMode, "system">;

const DARK_QUERY = "(prefers-color-scheme: dark)";

/** Mirrors the inline script in index.html: missing or invalid values mean system. */
export function readStoredMode(): ThemeMode {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" || value === "system"
      ? value
      : "system";
  } catch {
    return "system"; // storage blocked: behave as a first visit
  }
}

export function writeStoredMode(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // storage blocked: the choice still applies for this page view
  }
}

export function resolveTheme(
  mode: ThemeMode,
  systemDark: boolean,
): ResolvedTheme {
  if (mode === "system") return systemDark ? "dark" : "light";
  return mode;
}

export function applyResolvedTheme(theme: ResolvedTheme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function subscribeSystemDark(onChange: () => void): () => void {
  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function getSystemDark(): boolean {
  return window.matchMedia(DARK_QUERY).matches;
}

/**
 * Ring: system, then the opposite of the OS, then the OS value, then system.
 * The first click always changes the page visibly.
 */
export function nextThemeMode(mode: ThemeMode, systemDark: boolean): ThemeMode {
  const os: ResolvedTheme = systemDark ? "dark" : "light";
  const opposite: ResolvedTheme = systemDark ? "light" : "dark";
  if (mode === "system") return opposite;
  return mode === opposite ? os : "system";
}
