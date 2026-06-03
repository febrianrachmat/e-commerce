"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Menu,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";

const categoryKeys = {
  "women's clothing": "women",
  "men's clothing": "men",
  jewelery: "jewelry",
} as const;

function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-xs font-medium tracking-[0.14em] uppercase transition-colors hover:text-brand",
        isActive ? "text-foreground" : "text-muted-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function CategoryNavLink({
  category,
  label,
  onClick,
  className,
}: {
  category: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  const href = `/products?category=${encodeURIComponent(category)}`;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-xs font-medium tracking-[0.14em] uppercase transition-colors hover:text-brand text-muted-foreground",
        className,
      )}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tAnnouncement = useTranslations("announcement");
  const totalItems = useCartStore((s) => s.totalItems());
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
  const logout = useAuthStore((s) => s.logout);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categoryLinks = siteConfig.fashionCategories.map((category) => ({
    category,
    label: t(categoryKeys[category]),
  }));

  return (
    <header className="sticky top-0 z-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        {tCommon("skipToContent")}
      </a>

      <div className="bg-foreground text-background">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[0.6875rem] tracking-[0.12em] uppercase">
          {tAnnouncement("message")}
        </p>
      </div>

      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled
            ? "border-border/80 bg-background/95 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-background/85"
            : "border-transparent bg-background",
        )}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-2 lg:justify-self-start">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="inline-flex lg:hidden"
                aria-label={t("openMenu")}
              >
                <Button variant="ghost" size="icon" tabIndex={-1}>
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs gap-0 p-0">
                <SheetHeader className="border-b px-6 py-5">
                  <SheetTitle className="brand-wordmark text-xl">
                    {tCommon("brand")}
                  </SheetTitle>
                </SheetHeader>
                <nav
                  aria-label="Mobile"
                  className="flex flex-col gap-1 px-4 py-6"
                >
                  {categoryLinks.map(({ category, label }) => (
                    <CategoryNavLink
                      key={category}
                      category={category}
                      label={label}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md px-3 py-3 text-sm"
                    />
                  ))}
                  <NavLink
                    href="/products"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-3 text-sm"
                  >
                    {t("shop")}
                  </NavLink>
                  <NavLink
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-3 text-sm"
                  >
                    {t("home")}
                  </NavLink>
                </nav>
                <div className="mt-auto space-y-4 border-t px-6 py-6">
                  <div className="flex items-center gap-2">
                    <ThemeToggle compact />
                    <LocaleSwitcher compact />
                  </div>
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-2">
                      <LinkButton
                        variant="outline"
                        href="/profile"
                        onClick={() => setMobileOpen(false)}
                      >
                        {t("profile")}
                      </LinkButton>
                      <LinkButton
                        variant="outline"
                        href="/admin"
                        onClick={() => setMobileOpen(false)}
                      >
                        {t("admin")}
                      </LinkButton>
                      <Button variant="ghost" onClick={logout}>
                        {t("logout")}
                      </Button>
                    </div>
                  ) : (
                    <LinkButton
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t("login")}
                    </LinkButton>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <nav
              aria-label="Categories"
              className="hidden items-center gap-6 lg:flex"
            >
              {categoryLinks.map(({ category, label }) => (
                <CategoryNavLink key={category} category={category} label={label} />
              ))}
            </nav>
          </div>

          <Link
            href="/"
            className="brand-wordmark justify-self-center text-lg lg:text-xl"
          >
            {tCommon("brand")}
          </Link>

          <div className="flex items-center justify-end gap-1 sm:gap-2 lg:justify-self-end">
            <NavLink href="/products" className="hidden md:inline">
              {t("shop")}
            </NavLink>

            <LinkButton
              variant="ghost"
              size="icon"
              href="/products"
              aria-label={tCommon("search")}
            >
              <Search />
            </LinkButton>

            <LinkButton
              variant="ghost"
              size="icon"
              href="/cart"
              aria-label={t("cart")}
              className="relative"
            >
              <ShoppingBag />
              {totalItems > 0 ? (
                <Badge className="absolute -top-1 -right-1 size-5 justify-center rounded-full p-0 text-[0.625rem]">
                  {totalItems}
                </Badge>
              ) : null}
            </LinkButton>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon" aria-label={t("account")}>
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem>
                      <Link href="/profile" className="w-full">
                        {t("profile")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/admin" className="w-full">
                        {t("admin")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      {t("logout")}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem>
                    <Link href="/login" className="w-full">
                      {t("login")}
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden items-center gap-1 lg:flex">
              <ThemeToggle compact />
              <LocaleSwitcher compact />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
