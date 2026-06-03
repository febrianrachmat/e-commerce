import { setRequestLocale } from "next-intl/server";
import { ProductDetailPage } from "@/components/features/products/product-detail-page";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function ProductDetailRoute({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <ProductDetailPage productId={Number(id)} />;
}
