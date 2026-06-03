"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = {
  en: "English",
  id: "Indonesia",
};

type LocaleSwitcherProps = {
  compact?: boolean;
};

export function LocaleSwitcher({ compact = false }: LocaleSwitcherProps) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  if (compact) {
    const nextLocale = routing.locales.find((loc) => loc !== locale) ?? locale;

    return (
      <Button
        variant="ghost"
        size="sm"
        className="min-w-12 px-2 text-xs tracking-[0.12em] uppercase"
        aria-label={t("language")}
        onClick={() => router.replace(pathname, { locale: nextLocale })}
      >
        {locale}
      </Button>
    );
  }

  return (
    <Select
      value={locale}
      onValueChange={(next) => router.replace(pathname, { locale: next as Locale })}
    >
      <SelectTrigger className={cn("w-[140px]")} aria-label={t("language")}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {labels[loc]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
