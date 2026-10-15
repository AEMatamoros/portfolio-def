import { Mail } from "lucide-react";
import { SocialLinks } from "@/components/molecules/SocialLinks";

interface ContactDetailsProps {
  title: string;
  email: string;
  /** `mailto:` URL for the email address. */
  emailHref: string;
}

/** The intro column: a heading, the direct email address and the social profiles. */
export function ContactDetails({
  title,
  email,
  emailHref,
}: ContactDetailsProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <a
        href={emailHref}
        className="inline-flex w-fit max-w-full items-center gap-3 text-base font-medium [overflow-wrap:anywhere] hover:text-muted-foreground sm:text-lg"
      >
        <Mail aria-hidden="true" className="size-5 shrink-0" />
        {email}
      </a>
      <SocialLinks showEmail={false} />
    </div>
  );
}
