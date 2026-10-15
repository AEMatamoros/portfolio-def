import { useMediaQuery } from "@/hooks/useMediaQuery";

/** True when the user asks the system to minimise motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
