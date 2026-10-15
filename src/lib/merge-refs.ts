type RefCleanup = void | (() => void);

/**
 * Combines ref callbacks that follow the React 19 contract (they receive the
 * element on mount and may return a cleanup) into one callback with one cleanup.
 * `null` calls are ignored: React 19 runs the cleanup instead of passing `null`.
 */
export function mergeRefs<T>(
  ...refs: ReadonlyArray<((node: T) => RefCleanup) | undefined>
): (node: T | null) => () => void {
  return (node) => {
    if (node === null) return () => undefined;
    const cleanups = refs.map((ref) => ref?.(node));
    return () => {
      cleanups.forEach((cleanup) => {
        if (typeof cleanup === "function") cleanup();
      });
    };
  };
}
