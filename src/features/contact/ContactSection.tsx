import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { Toaster } from "@/components/ui/sonner";
import { SITE, titleIdOf } from "@/config/site";
import { env } from "@/config/env";
import { ContactDetails } from "@/features/contact/components/ContactDetails";
import { ContactFallback } from "@/features/contact/components/ContactFallback";
import { ContactFormPanel } from "@/features/contact/ContactFormPanel";
import { buildMailtoHref } from "@/lib/mailto";

export default function ContactSection() {
  const { t } = useTranslation();
  const endpoint = env.contactApiUrl;

  return (
    <>
      <SectionShell id="contact" className="bg-background py-16 md:py-24">
        <Container>
          <SectionHeader
            titleId={titleIdOf("contact")}
            title={t("contact.title")}
            lead={t("contact.description")}
          />
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <ContactDetails
              title={t("contact.formTitle")}
              email={SITE.email}
              emailHref={buildMailtoHref(SITE.email)}
            />
            {endpoint ? (
              <ContactFormPanel endpoint={endpoint} />
            ) : (
              <ContactFallback
                title={t("contact.fallback.title")}
                description={t("contact.fallback.description")}
                cta={t("contact.fallback.cta")}
                href={buildMailtoHref(SITE.email, {
                  subject: t("contact.mail.subject"),
                  body: t("contact.mail.body"),
                })}
              />
            )}
          </div>
        </Container>
      </SectionShell>
      {/* A sibling, not a child: Sonner renders its own <section>, and sections never nest. */}
      {endpoint && <Toaster position="bottom-center" />}
    </>
  );
}
