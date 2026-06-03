"use client";

import Image from "next/image";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ProductRating } from "@/components/features/products/product-rating";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

type FeaturedProductsShowcaseProps = {
  products: Product[];
  addToCartLabel: string;
  exploreTitle: string;
  exploreCtaLabel: string;
  exploreHref: string;
};

const categoryNavKeys: Record<string, "women" | "men" | "jewelry"> = {
  "women's clothing": "women",
  "men's clothing": "men",
  jewelery: "jewelry",
};

const cardLayouts = [
  "col-span-12 min-h-[22rem] md:col-span-7 md:row-span-2 md:min-h-0",
  "col-span-6 min-h-[15rem] md:col-span-5 md:col-start-8 md:row-start-1 md:min-h-0",
  "col-span-6 min-h-[15rem] md:col-span-5 md:col-start-8 md:row-start-2 md:min-h-0",
  "col-span-12 min-h-[15rem] md:col-span-5 md:row-start-3 md:min-h-0",
] as const;

const cardSurfaces = [
  "from-foreground/[0.04] via-muted to-secondary/40",
  "from-secondary/50 via-muted/80 to-background",
  "from-muted via-surface to-secondary/30",
  "from-background via-muted/70 to-secondary/45",
] as const;

const cardTilts = [
  "",
  "md:-rotate-1 md:translate-y-1",
  "md:rotate-1 md:-translate-y-1",
  "md:-rotate-[0.5deg]",
] as const;

function FeaturedProductCard({
  product,
  index,
  addToCartLabel,
  featured = false,
  className,
}: {
  product: Product;
  index: number;
  addToCartLabel: string;
  featured?: boolean;
  className?: string;
}) {
  const tNav = useTranslations("nav");
  const addItem = useCartStore((s) => s.addItem);

  const categoryLabel = categoryNavKeys[product.category]
    ? tNav(categoryNavKeys[product.category])
    : product.category;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br shadow-[0_24px_48px_-36px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-border hover:shadow-[0_32px_64px_-28px_rgba(0,0,0,0.4)]",
        cardSurfaces[index % cardSurfaces.length],
        cardTilts[index % cardTilts.length],
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-2 top-2 z-0 font-display font-bold leading-none tracking-[-0.05em] text-foreground/[0.06]",
          featured ? "text-[8rem] md:text-[11rem]" : "text-[5rem] md:text-[6.5rem]",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 top-1/2 size-32 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 size-40 translate-x-1/4 translate-y-1/4 rounded-full bg-foreground/[0.04] blur-2xl"
      />

      <Link
        href={`/products/${product.id}`}
        className={cn(
          "relative z-10 flex flex-1 flex-col",
          featured ? "p-5 md:p-7" : "p-4 md:p-5",
        )}
      >
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground md:text-sm">
          {categoryLabel}
        </p>

        <div
          className={cn(
            "relative mx-auto w-full flex-1",
            featured ? "my-4 min-h-[12rem] md:min-h-[16rem]" : "my-3 min-h-[8rem] md:min-h-[9rem]",
          )}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain object-center drop-shadow-[0_18px_36px_rgba(0,0,0,0.18)] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 45vw"
                : "(max-width: 768px) 45vw, 22vw"
            }
          />
        </div>
      </Link>

      <div
        className={cn(
          "relative z-10 space-y-3 border-t border-border/50 bg-background/55 backdrop-blur-sm",
          featured ? "p-5 md:p-7" : "p-4 md:p-5",
        )}
      >
        <h3
          className={cn(
            "font-heading font-light leading-[1.15] tracking-[-0.02em] text-foreground",
            featured ? "text-2xl md:text-[2rem]" : "text-xl md:text-2xl",
          )}
        >
          <Link
            href={`/products/${product.id}`}
            className="line-clamp-2 transition-colors hover:text-brand"
          >
            {product.title}
          </Link>
        </h3>

        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="font-display text-2xl font-bold tracking-tight text-foreground md:text-[1.75rem]">
            ${product.price.toFixed(2)}
          </p>
          <ProductRating
            rate={product.rating.rate}
            count={product.rating.count}
            className="[&_span]:text-sm [&_svg]:size-4"
          />
        </div>

        <Button
          size={featured ? "default" : "sm"}
          className="w-full sm:w-auto"
          onClick={() => addItem(product)}
        >
          <ShoppingBag data-icon="inline-start" />
          {addToCartLabel}
        </Button>
      </div>
    </article>
  );
}

function FeaturedExplorePanel({
  title,
  ctaLabel,
  href,
}: {
  title: string;
  ctaLabel: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative hidden min-h-[15rem] overflow-hidden rounded-2xl border border-dashed border-border/80 bg-gradient-to-br from-foreground/[0.03] via-transparent to-brand/10 md:col-span-7 md:col-start-6 md:row-start-3 md:flex md:flex-col md:justify-between md:p-8"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, transparent, transparent 31px, color-mix(in oklch, var(--border) 55%, transparent) 31px, color-mix(in oklch, var(--border) 55%, transparent) 32px)",
        }}
      />
      <p className="relative z-10 font-display text-[0.6875rem] font-semibold tracking-[0.35em] uppercase text-muted-foreground">
        VELDT
      </p>
      <p className="relative z-10 max-w-sm font-heading text-3xl font-light leading-tight tracking-[-0.02em] text-foreground lg:text-4xl">
        {title}
      </p>
      <span className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.14em] uppercase text-foreground transition-transform duration-300 group-hover:translate-x-1">
        {ctaLabel}
        <ArrowUpRight className="size-4" aria-hidden />
      </span>
    </Link>
  );
}

export function FeaturedProductsShowcase({
  products,
  addToCartLabel,
  exploreTitle,
  exploreCtaLabel,
  exploreHref,
}: FeaturedProductsShowcaseProps) {
  return (
    <div className="grid grid-cols-12 gap-3 md:grid-rows-[1fr_1fr_auto] md:gap-4 md:min-h-[38rem]">
      {products.map((product, index) => (
        <FeaturedProductCard
          key={product.id}
          product={product}
          index={index}
          addToCartLabel={addToCartLabel}
          featured={index === 0}
          className={cardLayouts[index] ?? "col-span-12"}
        />
      ))}

      {products.length >= 4 ? (
        <FeaturedExplorePanel
          title={exploreTitle}
          ctaLabel={exploreCtaLabel}
          href={exploreHref}
        />
      ) : null}
    </div>
  );
}
