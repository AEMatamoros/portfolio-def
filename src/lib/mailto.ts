interface MailtoFields {
  subject?: string;
  body?: string;
}

/** `mailto:` URL whose subject and body are percent-encoded. */
export function buildMailtoHref(
  email: string,
  { subject, body }: MailtoFields = {},
): string {
  const query = [
    subject && `subject=${encodeURIComponent(subject)}`,
    body && `body=${encodeURIComponent(body)}`,
  ]
    .filter(Boolean)
    .join("&");

  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}
