import ShinyText from "@Components/animations/ShinyText";
import useContactForm from "@Hooks/useContactForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HeaderSeparator from "@Components/ui/HeaderSeparator";

import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const { register, handleSubmit, onSubmit, disable } = useContactForm();

  return (
    <section
      className={`bg-gray-100 dark:bg-black py-6 px-12 ${
        disable && "opacity-50 animate-pulse"
      }`}
      id="section-contact"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl pt-14 font-semibold tracking-tight text-balance text-black dark:text-gray-100 sm:text-5xl">
          {t("SECTION.CONTACT")}
        </h2>
        <HeaderSeparator />
        <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-100 font-semibold">
          {t("CONTACT.DESCRIPTION")}
        </p>
      </div>
      <form
        className="mx-auto mt-2 max-w-xl rounded-xl border border-border bg-card p-8 text-card-foreground shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-center font-semibold border-b border-border pb-2 mb-6">
          {t("CONTACT.SUBTITLE")}
        </p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="name">{t("CONTACT.LABEL.NAME")}</Label>
            <Input id="name" {...register("name")} required type="text" />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="company">{t("CONTACT.LABEL.COMPANY")}</Label>
            <Input id="company" {...register("company")} required type="text" />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="email">{t("CONTACT.LABEL.EMAIL")}</Label>
            <Input id="email" {...register("email")} required type="email" />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="phone">{t("CONTACT.LABEL.PHONE")}</Label>
            <Input id="phone" {...register("phone")} required type="tel" />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="message">{t("CONTACT.LABEL.MESSAGE")}</Label>
            <Textarea id="message" {...register("message")} rows={4} />
          </div>
        </div>
        <div className="hero-button mt-10 flex items-center justify-center gap-x-6">
          <Button type="submit" disabled={disable} size="lg" className="px-6">
            <ShinyText
              text={t("CONTACT.LABEL.SEND")}
              disabled={false}
              speed={3}
              className=""
            />
          </Button>
        </div>
      </form>
    </section>
  );
}
