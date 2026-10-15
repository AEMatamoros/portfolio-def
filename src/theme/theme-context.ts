import { createContext } from "react";
import type { ResolvedTheme, ThemeMode } from "@/theme/theme";

/** Viewport coordinates (px) the theme reveal grows from. */
export interface ThemeOrigin {
  x: number;
  y: number;
}

export interface ThemeContextValue {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode, origin?: ThemeOrigin) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
