import ShinyText from "@/components/animations/ShinyText";
import useContactForm from "@/features/contact/hooks/useContactForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HeaderSeparator from "@/components/atoms/HeaderSeparator";
import { SectionShell } from "@/components/layout/SectionShell";
import { titleIdOf } from "@/config/site";

import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const { register, handleSubmit, onSubmit, disable } = useContactForm();

  return (
    <SectionShell
      id="contact"
      className={`bg-gray-100 dark:bg-black py-6 px-12 ${
        disable && "opacity-50 animate-pulse"
      }`}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id={titleIdOf("contact")}
          className="text-4xl pt-14 font-semibold tracking-tight text-balance text-black dark:text-gray-100 sm:text-5xl"
        >
          {t("contact.title")}
        </h2>
        <HeaderSeparator />
        <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-100 font-semibold">
          {t("contact.description")}
        </p>
      </div>
      <form
        className="mx-auto mt-2 max-w-xl rounded-xl border border-border bg-card p-8 text-card-foreground shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-center font-semibold border-b border-border pb-2 mb-6">
          {t("contact.formTitle")}
        </p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="name">{t("contact.fields.name")}</Label>
            <Input id="name" {...register("name")} required type="text" />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="company">{t("contact.fields.company")}</Label>
            <Input id="company" {...register("company")} required type="text" />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="email">{t("contact.fields.email")}</Label>
            <Input id="email" {...register("email")} required type="email" />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="phone">{t("contact.fields.phone")}</Label>
            <Input id="phone" {...register("phone")} required type="tel" />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="message">{t("contact.fields.message")}</Label>
            <Textarea id="message" {...register("message")} rows={4} />
          </div>
        </div>
        <div className="animate-fade-in-slow mt-10 flex items-center justify-center gap-x-6">
          <Button type="submit" disabled={disable} size="lg" className="px-6">
            <ShinyText
              text={t("contact.submit")}
              disabled={false}
              speed={3}
              className=""
            />
          </Button>
        </div>
      </form>
    </SectionShell>
  );
}
