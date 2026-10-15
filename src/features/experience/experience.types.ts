import type { YearMonth } from "@/lib/dates";
import type { Localized } from "@/types/localized";

export interface Experience {
  id: string;
  company: string;
  role: Localized;
  summary: Localized;
  start: YearMonth;
  /** An entry without an end date is the current one. */
  end?: YearMonth;
  stack: readonly string[];
  tools: readonly string[];
}
