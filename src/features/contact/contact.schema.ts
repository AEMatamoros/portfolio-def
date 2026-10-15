import type { RegisterOptions } from "react-hook-form";
import type {
  ContactField,
  ContactFormValues,
  ValidationCode,
} from "@/features/contact/contact.types";

export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  company: 120,
  phone: 32,
  message: 2000,
} as const satisfies Record<ContactField, number>;

const max = (field: ContactField) => ({
  value: CONTACT_LIMITS[field],
  message: "tooLong" satisfies ValidationCode,
});

const notBlank = (value: string) =>
  value.trim() !== "" || ("required" satisfies ValidationCode);

/** Native react-hook-form rules whose messages are codes, so a language switch re-translates visible errors. */
export const CONTACT_RULES = {
  name: { validate: notBlank, maxLength: max("name") },
  email: {
    required: "required" satisfies ValidationCode,
    maxLength: max("email"),
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "email" satisfies ValidationCode,
    },
  },
  company: { maxLength: max("company") },
  phone: {
    maxLength: max("phone"),
    pattern: {
      value: /^[+\d\s().-]{7,32}$/,
      message: "phone" satisfies ValidationCode,
    },
  },
  message: { validate: notBlank, maxLength: max("message") },
} satisfies { [K in ContactField]: RegisterOptions<ContactFormValues, K> };

export const EMPTY_CONTACT: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  message: "",
  website: "",
};

const VALIDATION_CODES: ReadonlySet<string> = new Set<ValidationCode>([
  "required",
  "email",
  "phone",
  "tooLong",
]);

export const isValidationCode = (value: unknown): value is ValidationCode =>
  typeof value === "string" && VALIDATION_CODES.has(value);
