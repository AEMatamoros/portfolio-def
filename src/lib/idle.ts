/** Delay used where `requestIdleCallback` is missing (Safari). */
const FALLBACK_DELAY_MS = 200;

/**
 * Runs `callback` once the browser is idle, and no later than `timeout`
 * milliseconds from now. Returns a function that cancels the pending call.
 */
export function onIdle(callback: () => void, timeout: number): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(handle);
  }
  const handle = window.setTimeout(
    callback,
    Math.min(FALLBACK_DELAY_MS, timeout),
  );
  return () => window.clearTimeout(handle);
}
