/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public URL of the contact form endpoint. Leave unset to show the mailto fallback. */
  readonly VITE_CONTACT_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
