"use client";

import { useTranslations } from "next-intl";
import { ProductDetailView } from "@/components/features/products/product-detail-view";
import { ProductDetailSkeleton } from "@/components/features/products/product-detail-skeleton";
import { LinkButton } from "@/components/ui/link-button";
import { Button } from "@/components/ui/button";
import { useProductQuery } from "@/hooks/queries/use-products-query";

type ProductDetailPageProps = {
  productId: number;
};

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const t = useTranslations("products");
  const tCommon = useTranslations("common");
  const productQuery = useProductQuery(productId);

  if (!Number.isFinite(productId)) {
    return <ProductNotFound />;
  }

  if (productQuery.isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (productQuery.isError) {
    return (
      <section className="space-y-4 py-16 text-center">
        <p role="alert">{t("notFound")}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" onClick={() => productQuery.refetch()}>
            {tCommon("retry")}
          </Button>
          <LinkButton href="/products" variant="outline">
            {t("backToShop")}
          </LinkButton>
        </div>
      </section>
    );
  }

  if (!productQuery.data) {
    return <ProductNotFound />;
  }

  return <ProductDetailView product={productQuery.data} />;
}

function ProductNotFound() {
  const t = useTranslations("products");

  return (
    <section className="space-y-4 py-16 text-center">
      <p role="alert">{t("notFound")}</p>
      <LinkButton href="/products" variant="outline">
        {t("backToShop")}
      </LinkButton>
    </section>
  );
}
