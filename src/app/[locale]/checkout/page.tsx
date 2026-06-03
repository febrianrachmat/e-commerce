import { setRequestLocale } from "next-intl/server";
import { CheckoutForm } from "@/components/features/checkout/checkout-form";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CheckoutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CheckoutForm />;
}
