import { setRequestLocale } from "next-intl/server";
import { CartView } from "@/components/features/cart/cart-view";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CartPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CartView />;
}
