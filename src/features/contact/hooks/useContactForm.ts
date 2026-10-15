import { useForm } from "react-hook-form";
import { EMPTY_CONTACT } from "@/features/contact/contact.schema";
import type { ContactFormValues } from "@/features/contact/contact.types";
import {
  buildMessageHtml,
  type MessageLabels,
} from "@/features/contact/services/build-message-html";
import {
  sendContactMessage,
  type SendContactResult,
} from "@/features/contact/services/contact.service";

/** Form state plus the submit pipeline: honeypot check, trim, escape, send, reset on success. */
export function useContactForm(endpoint: string) {
  const form = useForm<ContactFormValues>({
    defaultValues: EMPTY_CONTACT,
    mode: "onTouched",
  });

  const submit = async (
    values: ContactFormValues,
    labels: MessageLabels,
  ): Promise<SendContactResult> => {
    // A bot filled the decoy: pretend it worked and send nothing.
    if (values.honeypot.trim() !== "") {
      form.reset(EMPTY_CONTACT);
      return { ok: true };
    }

    const message = buildMessageHtml(
      {
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
      },
      labels,
    );
    const result = await sendContactMessage(endpoint, message);
    if (result.ok) form.reset(EMPTY_CONTACT);
    return result;
  };

  return { form, submit };
}
