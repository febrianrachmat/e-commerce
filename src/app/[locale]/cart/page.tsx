import { getTranslations, setRequestLocale } from "next-intl/server";
import { CartView } from "@/components/features/cart/cart-view";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CartPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cart");

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold">{t("title")}</h1>
      <CartView />
    </section>
  );
}
