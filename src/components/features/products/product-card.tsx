"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/stores/cart-store";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("products");
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-3">
        <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
        <CardTitle className="line-clamp-2 text-base">
          <Link href={`/products/${product.id}`} className="hover:underline">
            {product.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground capitalize">
          {product.category}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => addItem(product)}>
          {t("addToCart")}
        </Button>
      </CardFooter>
    </Card>
  );
}
