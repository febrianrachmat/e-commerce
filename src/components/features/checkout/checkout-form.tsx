"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrderSummary } from "@/components/features/cart/order-summary";
import { useCartStore } from "@/stores/cart-store";
import { LinkButton } from "@/components/ui/link-button";

const checkoutSchema = z.object({
  fullName: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  zipcode: z.string().min(4),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const t = useTranslations("checkout");
  const tCart = useTranslations("cart");
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);
  const items = useCartStore((s) => s.items);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      zipcode: "",
    },
  });

  const onSubmit = form.handleSubmit(() => {
    clearCart();
    router.push("/order/success");
  });

  if (items.length === 0) {
    return (
      <section className="space-y-6 py-8 text-center">
        <p className="text-muted-foreground">{tCart("empty")}</p>
        <LinkButton href="/products">{tCart("continueShopping")}</LinkButton>
      </section>
    );
  }

  return (
    <section aria-labelledby="checkout-heading" className="space-y-8">
      <div className="space-y-3">
        <p className="section-eyebrow">{t("eyebrow")}</p>
        <h1 id="checkout-heading" className="heading-section">
          {t("title")}
        </h1>
        <p className="body-lead max-w-2xl">{t("subtitle")}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
        <form onSubmit={onSubmit} className="space-y-6">
          <fieldset className="surface-panel space-y-4 p-6">
            <legend className="px-1 font-heading text-lg">{t("shipping")}</legend>
            <div className="space-y-2">
              <Label htmlFor="fullName">{t("fullName")}</Label>
              <Input id="fullName" autoComplete="name" {...form.register("fullName")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">{t("address")}</Label>
              <Input id="address" autoComplete="street-address" {...form.register("address")} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">{t("city")}</Label>
                <Input id="city" autoComplete="address-level2" {...form.register("city")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipcode">{t("zipcode")}</Label>
                <Input id="zipcode" autoComplete="postal-code" {...form.register("zipcode")} />
              </div>
            </div>
          </fieldset>

          <div className="surface-panel space-y-3 p-6">
            <h2 className="font-heading text-lg">{t("paymentTitle")}</h2>
            <p className="text-sm text-muted-foreground">{t("payment")}</p>
            <Input disabled placeholder={t("paymentPlaceholder")} />
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            {t("placeOrder")}
          </Button>
        </form>

        <OrderSummary />
      </div>
    </section>
  );
}
