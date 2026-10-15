import { useTranslation } from "react-i18next";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { SITE } from "@/config/site";

/** Fixed social links on the left and a vertical email address on the right, from xl up. */
export function SideRails() {
  const { t } = useTranslation();
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(t("contact.mail.subject"))}&body=${encodeURIComponent(t("contact.mail.body"))}`;
  return (
    <>
      <div className="fixed top-1/2 left-0 z-40 hidden w-12 -translate-y-1/2 justify-center xl:flex">
        <SocialLinks className="flex-col gap-3" />
      </div>
      <div className="surface-inverse fixed right-0 bottom-0 z-40 hidden w-10 flex-col items-center gap-y-6 bg-foreground py-4 text-background xl:flex">
        <span aria-hidden="true" className="h-10 w-px bg-background" />
        <a href={mailto} className="vertical-text text-xs hover:underline">
          {SITE.email}
        </a>
        <span aria-hidden="true" className="h-10 w-px bg-background" />
      </div>
    </>
  );
}
