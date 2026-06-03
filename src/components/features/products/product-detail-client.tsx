"use client";

import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import type { Product } from "@/types/product";

export function ProductDetailClient({ product }: { product: Product }) {
  const t = useTranslations("products");
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Button size="lg" className="w-full" onClick={() => addItem(product)}>
      <ShoppingBag data-icon="inline-start" />
      {t("addToCart")}
    </Button>
  );
}
