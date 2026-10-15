import type { ContactMessage } from "@/features/contact/contact.types";
import { escapeHtml } from "@/lib/escape-html";

export interface MessageLabels {
  heading: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

/**
 * Builds the HTML body sent to the contact API. Every label and value is
 * escaped before it is concatenated, so visitor input can never add markup;
 * the only tags are the ones written here. Empty optional fields are omitted.
 */
export function buildMessageHtml(
  values: ContactMessage,
  labels: MessageLabels,
): string {
  const row = (label: string, escapedValue: string) =>
    `<p><strong>${escapeHtml(label)}:</strong> ${escapedValue}</p>`;
  const field = (label: string, value: string) => row(label, escapeHtml(value));

  const rows = [
    field(labels.name, values.name),
    field(labels.email, values.email),
    values.company && field(labels.company, values.company),
    values.phone && field(labels.phone, values.phone),
    // Newlines become <br> only after escaping, so <br> is the one tag a message can produce.
    row(labels.message, escapeHtml(values.message).replace(/\r?\n/g, "<br>")),
  ].filter(Boolean);

  return `<h2>${escapeHtml(labels.heading)}</h2>${rows.join("")}`;
}
