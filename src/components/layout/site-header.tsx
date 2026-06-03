"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";

export function SiteHeader() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const totalItems = useCartStore((s) => s.totalItems());
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="border-b">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        {tCommon("skipToContent")}
      </a>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-semibold">
          {tCommon("brand")}
        </Link>

        <nav aria-label="Main" className="flex flex-wrap items-center gap-2">
          <LinkButton variant="ghost" href="/">
            {t("home")}
          </LinkButton>
          <LinkButton variant="ghost" href="/products">
            {t("shop")}
          </LinkButton>
          <LinkButton variant="ghost" href="/cart">
            {t("cart")}
            {totalItems > 0 ? (
              <Badge className="ml-2" variant="secondary">
                {totalItems}
              </Badge>
            ) : null}
          </LinkButton>
          {isAuthenticated ? (
            <>
              <LinkButton variant="ghost" href="/profile">
                {t("profile")}
              </LinkButton>
              <LinkButton variant="ghost" href="/admin">
                {t("admin")}
              </LinkButton>
              <Button variant="outline" onClick={logout}>
                {t("logout")}
              </Button>
            </>
          ) : (
            <LinkButton variant="outline" href="/login">
              {t("login")}
            </LinkButton>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
