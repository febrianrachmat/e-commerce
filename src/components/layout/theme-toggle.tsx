"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeStore, type Theme } from "@/stores/theme-store";

const themeOrder: Theme[] = ["light", "dark", "system"];

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

type ThemeToggleProps = {
  compact?: boolean;
};

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const t = useTranslations("theme");
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  if (compact) {
    const Icon = themeIcons[theme];
    const currentIndex = themeOrder.indexOf(theme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];

    return (
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={t(theme)}
        onClick={() => setTheme(nextTheme)}
      >
        <Icon />
      </Button>
    );
  }

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
