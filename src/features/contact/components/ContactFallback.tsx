import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactFallbackProps {
  title: string;
  description: string;
  cta: string;
  /** `mailto:` URL with a localized subject and body. */
  href: string;
}

/** Shown instead of the form when no endpoint is configured: no request, just a mailto action. */
export function ContactFallback({
  title,
  description,
  cta,
  href,
}: ContactFallbackProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm md:p-8">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <Button asChild size="lg" className="mt-6 px-6">
        <a href={href}>
          <Mail aria-hidden="true" />
          {cta}
        </a>
      </Button>
    </div>
  );
}
