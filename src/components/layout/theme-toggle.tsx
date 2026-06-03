"use client";

import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeStore, type Theme } from "@/stores/theme-store";

export function ThemeToggle() {
  const t = useTranslations("theme");
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  return (
    <Select value={theme} onValueChange={(v) => setTheme(v as Theme)}>
      <SelectTrigger className="w-[120px]" aria-label={t("system")}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">{t("light")}</SelectItem>
        <SelectItem value="dark">{t("dark")}</SelectItem>
        <SelectItem value="system">{t("system")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
