export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  /** Honeypot: a decoy field that real visitors never see or fill. */
  website: string;
}

/** The fields a visitor fills in, without the honeypot. */
export type ContactField = Exclude<keyof ContactFormValues, "website">;

export type ContactMessage = Omit<ContactFormValues, "website">;

/** Validation messages are codes; the UI translates them at render time. */
export type ValidationCode = "required" | "email" | "phone" | "tooLong";
