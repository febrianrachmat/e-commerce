"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/cart-store";

export function CartView() {
  const t = useTranslations("cart");
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  if (items.length === 0) {
    return (
      <p className="text-muted-foreground" role="status">
        {t("empty")}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.productId} className="flex gap-4 py-4">
            <div className="relative h-20 w-20 shrink-0 bg-muted">
              <Image
                src={item.product.image}
                alt={item.product.title}
                fill
                className="object-contain p-1"
                sizes="80px"
              />
            </div>
            <div className="flex-1 space-y-2">
              <p className="font-medium">{item.product.title}</p>
              <p>${item.product.price.toFixed(2)}</p>
              <div className="flex items-center gap-2">
                <label className="sr-only" htmlFor={`qty-${item.productId}`}>
                  Quantity
                </label>
                <Input
                  id={`qty-${item.productId}`}
                  type="number"
                  min={1}
                  className="w-20"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.productId, Number(e.target.value))
                  }
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeItem(item.productId)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t pt-4">
        <p className="font-semibold">
          {t("subtotal")}: ${subtotal.toFixed(2)}
        </p>
        <LinkButton href="/checkout">{t("checkout")}</LinkButton>
      </div>
    </div>
  );
}
