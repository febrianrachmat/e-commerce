import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductDetailView } from "@/components/features/products/product-detail-view";
import { getProductById } from "@/lib/api/products";
import type { Product } from "@/types/product";
import { LinkButton } from "@/components/ui/link-button";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");
  const productId = Number(id);

  if (!Number.isFinite(productId)) {
    return (
      <section className="space-y-4 py-16 text-center">
        <p role="alert">{t("notFound")}</p>
        <LinkButton href="/products" variant="outline">
          {t("backToShop")}
        </LinkButton>
      </section>
    );
  }

  let product: Product | null = null;
  try {
    product = await getProductById(productId);
  } catch {
    product = null;
  }

  if (!product) {
    return (
      <section className="space-y-4 py-16 text-center">
        <p role="alert">{t("notFound")}</p>
        <LinkButton href="/products" variant="outline">
          {t("backToShop")}
        </LinkButton>
      </section>
    );
  }

  return <ProductDetailView product={product} />;
}
