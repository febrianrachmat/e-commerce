"use client";

import { useTranslations } from "next-intl";
import { LinkButton } from "@/components/ui/link-button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

type OrderSummaryProps = {
  className?: string;
  showItems?: boolean;
  showCheckoutCta?: boolean;
};

export function OrderSummary({
  className,
  showItems = true,
  showCheckoutCta = false,
}: OrderSummaryProps) {
  const t = useTranslations("cart");
  const tCheckout = useTranslations("checkout");
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const shipping = subtotal >= 75 ? 0 : 9.95;
  const total = subtotal + shipping;

  return (
    <aside
      className={cn(
        "surface-panel space-y-5 p-6 lg:sticky lg:top-36",
        className,
      )}
    >
      <div className="space-y-1">
        <h2 className="font-heading text-lg">{t("orderSummary")}</h2>
        <p className="text-sm text-muted-foreground">{t("summaryNote")}</p>
      </div>

      {showItems ? (
        <ul className="space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-3">
              <span className="line-clamp-2 text-muted-foreground">
                {item.product.title}{" "}
                <span className="text-foreground">× {item.quantity}</span>
              </span>
              <span className="shrink-0 tabular-nums">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <Separator />

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">{t("subtotal")}</dt>
          <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">{t("shipping")}</dt>
          <dd className="tabular-nums">
            {shipping === 0 ? t("shippingFree") : `$${shipping.toFixed(2)}`}
          </dd>
        </div>
        <div className="flex justify-between gap-4 text-base font-medium">
          <dt>{t("total")}</dt>
          <dd className="tabular-nums">${total.toFixed(2)}</dd>
        </div>
      </dl>

      {showCheckoutCta ? (
        <LinkButton href="/checkout" className="w-full">
          {t("checkout")}
        </LinkButton>
      ) : null}

      <p className="text-xs text-muted-foreground">{tCheckout("payment")}</p>
    </aside>
  );
}
