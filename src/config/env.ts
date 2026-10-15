/** Returns the value as an absolute `http:` or `https:` URL, or `undefined` when it is empty or unusable. */
export function readHttpUrl(value: string | undefined): string | undefined {
  const text = value?.trim();
  if (!text) return undefined;

  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

/** Public build-time configuration. `VITE_*` values are inlined into the bundle, so never put secrets here. */
export const env = {
  /** Endpoint that receives contact messages. Unset means the section offers a mailto link instead. */
  contactApiUrl: readHttpUrl(import.meta.env.VITE_CONTACT_API_URL),
} as const;
