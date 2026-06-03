"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import type { Product } from "@/types/product";

export function ProductDetailClient({ product }: { product: Product }) {
  const t = useTranslations("products");
  const addItem = useCartStore((s) => s.addItem);

  return <Button onClick={() => addItem(product)}>{t("addToCart")}</Button>;
}
