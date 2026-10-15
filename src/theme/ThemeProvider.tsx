import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import {
  applyResolvedTheme,
  getSystemDark,
  readStoredMode,
  resolveTheme,
  subscribeSystemDark,
  writeStoredMode,
  type ThemeMode,
} from "@/theme/theme";
import { ThemeContext, type ThemeOrigin } from "@/theme/theme-context";
import { runThemeTransition } from "@/theme/theme-transition";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(readStoredMode);
  const systemDark = useSyncExternalStore(subscribeSystemDark, getSystemDark);
  const resolvedTheme = resolveTheme(mode, systemDark);

  // Idempotent with the pre-paint script; also applies OS changes in system mode.
  useLayoutEffect(() => {
    applyResolvedTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setMode = useCallback(
    (next: ThemeMode, origin?: ThemeOrigin) => {
      writeStoredMode(next);
      const nextResolved = resolveTheme(next, getSystemDark());
      if (nextResolved === resolveTheme(mode, getSystemDark())) {
        setModeState(next);
        return;
      }
      runThemeTransition(() => {
        applyResolvedTheme(nextResolved);
        // The new snapshot must already show the new icon and label.
        flushSync(() => setModeState(next));
      }, origin);
    },
    [mode],
  );

  const value = useMemo(
    () => ({ mode, resolvedTheme, setMode }),
    [mode, resolvedTheme, setMode],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
