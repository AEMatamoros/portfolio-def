import { useSyncExternalStore } from "react";
import {
  getActiveSection,
  subscribeActiveSection,
} from "@/lib/section-observer";

/** Id of the section that crosses the middle band of the viewport, or null before any does. */
export function useActiveSection(): string | null {
  return useSyncExternalStore(
    subscribeActiveSection,
    getActiveSection,
    () => null,
  );
}
