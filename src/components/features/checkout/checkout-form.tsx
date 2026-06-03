"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/stores/cart-store";

const checkoutSchema = z.object({
  fullName: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  zipcode: z.string().min(4),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const t = useTranslations("checkout");
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.subtotal());

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

  return (
    <form onSubmit={onSubmit} className="max-w-lg space-y-4">
      <p className="text-sm text-muted-foreground">
        Subtotal: ${subtotal.toFixed(2)} — {t("payment")}
      </p>
      <fieldset className="space-y-4">
        <legend className="text-lg font-medium">{t("shipping")}</legend>
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" {...form.register("fullName")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" {...form.register("address")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" {...form.register("city")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zipcode">Zip code</Label>
          <Input id="zipcode" {...form.register("zipcode")} />
        </div>
      </fieldset>
      <Button type="submit">{t("placeOrder")}</Button>
    </form>
  );
}
