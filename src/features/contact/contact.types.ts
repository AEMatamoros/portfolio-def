export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  /** Honeypot: a decoy field that real visitors never see or fill. */
  honeypot: string;
}

/** The fields a visitor fills in, without the honeypot. */
export type ContactField = Exclude<keyof ContactFormValues, "honeypot">;

export type ContactMessage = Omit<ContactFormValues, "honeypot">;

/** Validation messages are codes; the UI translates them at render time. */
export type ValidationCode = "required" | "email" | "phone" | "tooLong";
