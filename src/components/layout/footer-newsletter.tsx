"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type FooterNewsletterProps = {
  showHeader?: boolean;
  className?: string;
};

export function FooterNewsletter({
  showHeader = true,
  className,
}: FooterNewsletterProps) {
  const t = useTranslations("footer.newsletter");
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    toast.success(t("success"));
    setEmail("");
  }

  return (
    <div className={cn("space-y-4", className)}>
      {showHeader ? (
        <>
          <h2 className="section-eyebrow text-foreground">{t("title")}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </>
      ) : null}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t("placeholder")}
          aria-label={t("placeholder")}
          className="bg-background"
        />
        <Button type="submit" className="shrink-0">
          {t("submit")}
        </Button>
      </form>
    </div>
  );
}
