import type { Locale } from "@/types/localized";

export type MonthNumber =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";

/** ISO year and month, also a valid `<time dateTime>` month string. */
export type YearMonth = `${number}-${MonthNumber}`;

const formatters = new Map<Locale, Intl.DateTimeFormat>();

function formatterFor(locale: Locale): Intl.DateTimeFormat {
  let formatter = formatters.get(locale);
  if (!formatter) {
    // UTC on both sides, so the month never shifts with the visitor's time zone.
    formatter = new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
    formatters.set(locale, formatter);
  }
  return formatter;
}

function parts(value: YearMonth): { year: number; month: number } {
  const [year, month] = value.split("-");
  return { year: Number(year), month: Number(month) };
}

/** Localized month and year, for example `Apr 2025` or `abr 2025`. */
export function formatYearMonth(value: YearMonth, locale: Locale): string {
  const { year, month } = parts(value);
  return formatterFor(locale).format(new Date(Date.UTC(year, month - 1, 1)));
}

/** The visitor's current month. Call it at module scope, never during render. */
export function toYearMonth(date: Date): YearMonth {
  const month = String(date.getMonth() + 1).padStart(2, "0") as MonthNumber;
  return `${date.getFullYear()}-${month}`;
}

/** Inclusive span: 2025-04 to 2026-10 is 19 months, so 1 year and 7 months. */
export function monthsSpan(
  start: YearMonth,
  end: YearMonth,
): { years: number; months: number } {
  const from = parts(start);
  const to = parts(end);
  const total = Math.max(
    (to.year - from.year) * 12 + (to.month - from.month) + 1,
    0,
  );
  return { years: Math.floor(total / 12), months: total % 12 };
}
