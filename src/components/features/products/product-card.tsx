"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ProductRating } from "@/components/features/products/product-rating";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export type ProductCardVariant = "featured" | "wide" | "standard";

type ProductCardProps = {
  product: Product;
  variant?: ProductCardVariant;
  index?: number;
  className?: string;
};

const categoryNavKeys: Record<string, "women" | "men" | "jewelry"> = {
  "women's clothing": "women",
  "men's clothing": "men",
  jewelery: "jewelry",
};

const surfaceTints = [
  "from-foreground/[0.04] via-muted to-secondary/40",
  "from-secondary/50 via-muted/80 to-background",
  "from-muted via-surface to-secondary/30",
  "from-background via-muted/70 to-secondary/45",
] as const;

const cardTilts = [
  "",
  "lg:-rotate-[0.35deg] lg:translate-y-0.5",
  "lg:rotate-[0.35deg] lg:-translate-y-0.5",
  "lg:-rotate-[0.5deg]",
] as const;

export function ProductCard({
  product,
  variant = "standard",
  index = 0,
  className,
}: ProductCardProps) {
  const t = useTranslations("products");
  const tNav = useTranslations("nav");
  const addItem = useCartStore((s) => s.addItem);

  const featured = variant === "featured";
  const wide = variant === "wide";

  const categoryLabel = categoryNavKeys[product.category]
    ? tNav(categoryNavKeys[product.category])
    : product.category;

  return (
    <article
      className={cn(
        "group relative flex h-full overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br shadow-[0_20px_44px_-32px_rgba(0,0,0,0.32)] transition-all duration-500 hover:-translate-y-1 hover:border-border hover:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.38)]",
        wide ? "flex-col md:flex-row" : "flex-col",
        surfaceTints[index % surfaceTints.length],
        cardTilts[index % cardTilts.length],
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-1 top-1 z-0 font-display font-bold leading-none tracking-[-0.05em] text-foreground/[0.07]",
          featured ? "text-[6rem] md:text-[9rem]" : "text-[4.5rem] md:text-[5.5rem]",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 top-1/3 size-28 rounded-full bg-brand/10 blur-3xl"
      />

      <Link
        href={`/products/${product.id}`}
        className={cn(
          "relative z-10 flex flex-1 flex-col",
          featured ? "p-5 md:p-6" : wide ? "min-w-0 p-4 md:w-[52%] md:p-5" : "p-4 md:p-5",
        )}
      >
        <p
          className={cn(
            "font-sans font-semibold uppercase text-muted-foreground",
            featured
              ? "text-xs tracking-[0.22em] md:text-sm"
              : "text-[0.6875rem] tracking-[0.2em] md:text-xs",
          )}
        >
          {categoryLabel}
        </p>

        <div
          className={cn(
            "relative mx-auto w-full flex-1",
            featured && "my-3 min-h-[11rem] md:min-h-[15rem]",
            wide && "my-3 min-h-[9rem] md:my-4 md:min-h-[11rem]",
            !featured && !wide && "my-3 min-h-[8.5rem] md:min-h-[9.5rem]",
          )}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain object-center drop-shadow-[0_16px_32px_rgba(0,0,0,0.16)] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 42vw"
                : wide
                  ? "(max-width: 1024px) 50vw, 33vw"
                  : "(max-width: 768px) 50vw, 22vw"
            }
          />
        </div>
      </Link>

      <div
        className={cn(
          "relative z-10 flex flex-col justify-center space-y-3 bg-background/60 backdrop-blur-sm",
          featured ? "border-t border-border/50 p-5 md:p-6" : wide ? "min-w-0 flex-1 border-t border-border/50 p-4 md:border-t-0 md:border-l md:p-5" : "border-t border-border/50 p-4 md:p-5",
        )}
      >
        <h3
          className={cn(
            "font-sans font-medium leading-snug tracking-normal text-foreground",
            featured
              ? "text-lg md:text-xl md:leading-[1.35]"
              : wide
                ? "text-base md:text-lg md:leading-[1.4]"
                : "text-base leading-[1.4] md:text-[1.0625rem]",
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
          <p
            className={cn(
              "font-display font-bold tracking-tight text-foreground",
              featured ? "text-2xl md:text-[1.75rem]" : "text-xl md:text-2xl",
            )}
          >
            ${product.price.toFixed(2)}
          </p>
          <ProductRating
            rate={product.rating.rate}
            count={product.rating.count}
            size={featured ? "md" : "sm"}
          />
        </div>

        <Button
          size={featured ? "default" : "sm"}
          className="w-full font-sans text-sm tracking-wide"
          onClick={() => addItem(product)}
        >
          <ShoppingBag data-icon="inline-start" />
          {t("addToCart")}
        </Button>
      </div>
    </article>
  );
}
