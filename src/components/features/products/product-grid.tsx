"use client";

import { MotionReveal } from "@/components/common/motion-reveal";
import { ProductCard, type ProductCardVariant } from "@/components/features/products/product-card";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

type GridSlot = {
  className: string;
  variant: ProductCardVariant;
};

/** Repeating bento rhythm — breaks the uniform 4-column shop grid. */
const GRID_SLOTS: GridSlot[] = [
  {
    className: "col-span-2 row-span-2 lg:col-span-7 lg:row-span-2",
    variant: "featured",
  },
  { className: "col-span-1 lg:col-span-5", variant: "standard" },
  { className: "col-span-1 lg:col-span-5", variant: "standard" },
  { className: "col-span-2 lg:col-span-4", variant: "wide" },
  { className: "col-span-1 lg:col-span-4", variant: "standard" },
  { className: "col-span-1 lg:col-span-4", variant: "standard" },
];

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-5",
        "lg:grid-cols-12 lg:auto-rows-[minmax(17rem,auto)] lg:gap-x-5 lg:gap-y-8",
      )}
    >
      {products.map((product, index) => {
        const slot = GRID_SLOTS[index % GRID_SLOTS.length];

        return (
          <li key={product.id} className={cn("min-h-0", slot.className)}>
            <MotionReveal delay={Math.min(index * 0.05, 0.35)} className="h-full">
              <ProductCard
                product={product}
                variant={slot.variant}
                index={index}
                className="h-full"
              />
            </MotionReveal>
          </li>
        );
      })}
    </ul>
  );
}
