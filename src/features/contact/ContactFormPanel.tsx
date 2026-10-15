import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { SITE } from "@/config/site";
import { ContactForm } from "@/features/contact/components/ContactForm";
import {
  CONTACT_LIMITS,
  CONTACT_RULES,
  isValidationCode,
} from "@/features/contact/contact.schema";
import type {
  ContactField,
  ContactFormValues,
} from "@/features/contact/contact.types";
import { useContactForm } from "@/features/contact/hooks/useContactForm";
import { buildMailtoHref } from "@/lib/mailto";

interface ContactFormPanelProps {
  endpoint: string;
}

/** Connects the form to translation, the submit pipeline and toast feedback. */
export function ContactFormPanel({ endpoint }: ContactFormPanelProps) {
  const { t } = useTranslation();
  const { form, submit } = useContactForm(endpoint);
  const { formState } = form;

  // Errors hold codes; translating here keeps them in step with a language switch.
  const errors: Partial<Record<ContactField, string>> = {};
  for (const field of Object.keys(CONTACT_LIMITS) as ContactField[]) {
    const code = formState.errors[field]?.message;
    if (isValidationCode(code)) {
      errors[field] = t(`contact.validation.${code}`, {
        max: CONTACT_LIMITS[field],
      });
    }
  }

  const onValid = async (values: ContactFormValues) => {
    const result = await submit(values, {
      heading: t("contact.mail.heading"),
      name: t("contact.fields.name"),
      email: t("contact.fields.email"),
      company: t("contact.fields.company"),
      phone: t("contact.fields.phone"),
      message: t("contact.fields.message"),
    });

    if (result.ok) {
      toast.success(t("contact.success"));
      return;
    }
    toast.error(t("contact.error"), {
      action: {
        label: t("contact.emailInstead"),
        onClick: () =>
          location.assign(
            buildMailtoHref(SITE.email, {
              subject: t("contact.mail.subject"),
              body: values.message,
            }),
          ),
      },
    });
  };

  return (
    <ContactForm
      register={form.register}
      rules={CONTACT_RULES}
      errors={errors}
      pending={formState.isSubmitting}
      onSubmit={form.handleSubmit(onValid)}
      copy={{
        labels: {
          name: t("contact.fields.name"),
          email: t("contact.fields.email"),
          company: t("contact.fields.company"),
          phone: t("contact.fields.phone"),
          message: t("contact.fields.message"),
        },
        optional: t("contact.optional"),
        submit: t("contact.submit"),
        sending: t("contact.sending"),
        honeypot: t("contact.honeypot"),
      }}
    />
  );
}
