import type { FormEventHandler } from "react";
import type { UseFormRegister } from "react-hook-form";
import { ShinyText } from "@/components/animations/ShinyText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CONTACT_RULES } from "@/features/contact/contact.schema";
import type {
  ContactField,
  ContactFormValues,
} from "@/features/contact/contact.types";
import { cn } from "@/lib/utils";

export interface ContactFormCopy {
  labels: Record<ContactField, string>;
  optional: string;
  submit: string;
  sending: string;
  /** Label of the decoy field; a human never sees it. */
  honeypot: string;
}

interface ContactFormProps {
  register: UseFormRegister<ContactFormValues>;
  rules: typeof CONTACT_RULES;
  /** Already translated, one message per invalid field. */
  errors: Partial<Record<ContactField, string>>;
  pending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  copy: ContactFormCopy;
}

interface FieldSpec {
  name: ContactField;
  type: "text" | "email" | "tel";
  autoComplete: string;
  /** Required fields say so to assistive technology; optional ones say so on screen. */
  required?: true;
  optional?: true;
}

const FIELDS: readonly FieldSpec[] = [
  { name: "name", type: "text", autoComplete: "name", required: true },
  { name: "email", type: "email", autoComplete: "email", required: true },
  {
    name: "company",
    type: "text",
    autoComplete: "organization",
    optional: true,
  },
  { name: "phone", type: "tel", autoComplete: "tel", optional: true },
];

const idOf = (name: string) => `contact-${name}`;

export function ContactForm({
  register,
  rules,
  errors,
  pending,
  onSubmit,
  copy,
}: ContactFormProps) {
  const messageError = errors.message;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={cn(
        "relative rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm md:p-8",
        pending && "opacity-50 motion-safe:animate-pulse",
      )}
    >
      <div className="grid grid-cols-1 gap-6">
        {FIELDS.map(({ name, type, autoComplete, required, optional }) => {
          const error = errors[name];
          return (
            <div key={name} className="space-y-2">
              <Label htmlFor={idOf(name)}>
                {copy.labels[name]}
                {optional && (
                  <span className="font-normal text-muted-foreground">
                    ({copy.optional})
                  </span>
                )}
              </Label>
              <Input
                id={idOf(name)}
                type={type}
                autoComplete={autoComplete}
                aria-required={required}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${idOf(name)}-error` : undefined}
                {...register(name, rules[name])}
              />
              {error && (
                <p
                  id={`${idOf(name)}-error`}
                  className="text-sm text-destructive"
                >
                  {error}
                </p>
              )}
            </div>
          );
        })}
        <div className="space-y-2">
          <Label htmlFor={idOf("message")}>{copy.labels.message}</Label>
          <Textarea
            id={idOf("message")}
            rows={5}
            autoComplete="off"
            aria-required
            aria-invalid={messageError ? true : undefined}
            aria-describedby={
              messageError ? `${idOf("message")}-error` : undefined
            }
            {...register("message", rules.message)}
          />
          {messageError && (
            <p
              id={`${idOf("message")}-error`}
              className="text-sm text-destructive"
            >
              {messageError}
            </p>
          )}
        </div>
      </div>
      {/* Honeypot: off-screen, out of the tab order and hidden from assistive technology. */}
      <div
        aria-hidden="true"
        className="absolute -start-[9999px] size-px overflow-hidden"
      >
        <label htmlFor={idOf("website")}>{copy.honeypot}</label>
        <input
          id={idOf("website")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
      <div className="animate-fade-in-slow mt-8 flex items-center justify-center">
        <Button
          type="submit"
          size="lg"
          className="px-6"
          disabled={pending}
          aria-busy={pending}
        >
          <ShinyText text={pending ? copy.sending : copy.submit} speed={3} />
        </Button>
      </div>
    </form>
  );
}
