import { setRequestLocale } from "next-intl/server";
import { ProductList } from "@/components/features/products/product-list";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductList />;
}
