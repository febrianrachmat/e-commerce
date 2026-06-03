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

type ProductCardProps = {
  product: Product;
  className?: string;
};

const categoryNavKeys: Record<string, "women" | "men" | "jewelry"> = {
  "women's clothing": "women",
  "men's clothing": "men",
  jewelery: "jewelry",
};

export function ProductCard({ product, className }: ProductCardProps) {
  const t = useTranslations("products");
  const tNav = useTranslations("nav");
  const addItem = useCartStore((s) => s.addItem);

  const categoryLabel = categoryNavKeys[product.category]
    ? tNav(categoryNavKeys[product.category])
    : product.category;

  return (
    <article className={cn("group flex h-full flex-col", className)}>
      <div className="relative overflow-hidden rounded-lg bg-muted">
        <Link
          href={`/products/${product.id}`}
          className="relative block aspect-[3/4]"
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>
        <Button
          size="sm"
          className="absolute inset-x-3 bottom-3 hidden translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:inline-flex"
          onClick={() => addItem(product)}
        >
          <ShoppingBag data-icon="inline-start" />
          {t("addToCart")}
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-2 pt-4">
        <p className="section-eyebrow normal-case tracking-[0.16em]">
          {categoryLabel}
        </p>
        <h3 className="line-clamp-2 text-sm leading-snug font-medium">
          <Link
            href={`/products/${product.id}`}
            className="transition-colors hover:text-brand"
          >
            {product.title}
          </Link>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <ProductRating
            rate={product.rating.rate}
            count={product.rating.count}
            className="hidden sm:flex"
          />
        </div>
        <Button
          size="sm"
          variant="outline"
          className="mt-2 w-full sm:hidden"
          onClick={() => addItem(product)}
        >
          <ShoppingBag data-icon="inline-start" />
          {t("addToCart")}
        </Button>
      </div>
    </article>
  );
}
