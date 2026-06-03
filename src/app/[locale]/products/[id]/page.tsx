import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductDetailView } from "@/components/features/products/product-detail-view";
import { getProductById } from "@/lib/api/products";
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

  try {
    const product = await getProductById(productId);
    return <ProductDetailView product={product} />;
  } catch {
    return (
      <section className="space-y-4 py-16 text-center">
        <p role="alert">{t("notFound")}</p>
        <LinkButton href="/products" variant="outline">
          {t("backToShop")}
        </LinkButton>
      </section>
    );
  }
}
