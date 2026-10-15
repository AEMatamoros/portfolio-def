import type { Localized } from "@/types/localized";

export interface Project {
  id: string;
  name: string;
  description: Localized;
  image: string;
  /** Absent means the project has no public link and renders as a plain card. */
  url?: string;
  techs: readonly string[];
}
