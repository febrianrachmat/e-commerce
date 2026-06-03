"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { OrderSummary } from "@/components/features/cart/order-summary";
import { QuantityStepper } from "@/components/features/cart/quantity-stepper";
import { useCartStore } from "@/stores/cart-store";

export function CartView() {
  const t = useTranslations("cart");
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <section aria-labelledby="cart-heading" className="space-y-8">
      <div className="space-y-3">
        <p className="section-eyebrow">{t("eyebrow")}</p>
        <h1 id="cart-heading" className="heading-section">
          {t("title")}
        </h1>
        <p className="body-lead max-w-2xl">{t("subtitle")}</p>
      </div>

      {items.length === 0 ? (
        <div
          className="surface-panel flex flex-col items-center gap-4 px-6 py-16 text-center"
          role="status"
        >
          <ShoppingBag className="size-12 text-muted-foreground/40" />
          <div className="space-y-2">
            <p className="font-heading text-xl">{t("emptyTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("empty")}</p>
          </div>
          <LinkButton href="/products">{t("continueShopping")}</LinkButton>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <ul className="divide-y divide-border/80">
            {items.map((item) => (
              <li key={item.productId} className="flex gap-4 py-6 first:pt-0">
                <Link
                  href={`/products/${item.productId}`}
                  className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-32 sm:w-28"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="object-contain p-2"
                    sizes="112px"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:justify-between">
                  <div className="min-w-0 space-y-1">
                    <Link
                      href={`/products/${item.productId}`}
                      className="line-clamp-2 text-sm font-medium transition-colors hover:text-brand"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-sm tabular-nums text-muted-foreground">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.productId, qty)}
                      label={t("quantity")}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.productId)}
                    >
                      <Trash2 data-icon="inline-start" />
                      {t("remove")}
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <OrderSummary showCheckoutCta />
        </div>
      )}
    </section>
  );
}
