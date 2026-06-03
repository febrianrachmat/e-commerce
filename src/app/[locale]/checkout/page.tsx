import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckoutForm } from "@/components/features/checkout/checkout-form";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CheckoutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold">{t("title")}</h1>
      <CheckoutForm />
    </section>
  );
}
