import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ProductBreadcrumb } from "@/components/features/products/product-breadcrumb";
import { ProductDetailClient } from "@/components/features/products/product-detail-client";
import { ProductRating } from "@/components/features/products/product-rating";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/types/product";

type ProductDetailViewProps = {
  product: Product;
};

function formatCategory(category: string) {
  return category.replace("'s", "'s ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function ProductDetailView({ product }: ProductDetailViewProps) {
  const t = await getTranslations("products");

  return (
    <article className="space-y-8">
      <ProductBreadcrumb category={product.category} title={product.title} />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="surface-panel overflow-hidden">
          <div className="relative aspect-[3/4] bg-muted">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-6 md:p-10"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="lg:sticky lg:top-36 lg:self-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="section-eyebrow normal-case tracking-[0.16em]">
                {formatCategory(product.category)}
              </p>
              <h1 className="heading-subsection">{product.title}</h1>
              <ProductRating
                rate={product.rating.rate}
                count={product.rating.count}
              />
            </div>

            <p className="text-2xl font-medium md:text-3xl">
              ${product.price.toFixed(2)}
            </p>

            <p className="body-lead text-foreground/80">{product.description}</p>

            <Separator />

            <dl className="grid gap-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{t("detailCategory")}</dt>
                <dd className="text-right capitalize">{formatCategory(product.category)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{t("detailShipping")}</dt>
                <dd className="text-right">{t("detailShippingValue")}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{t("detailReturns")}</dt>
                <dd className="text-right">{t("detailReturnsValue")}</dd>
              </div>
            </dl>

            <ProductDetailClient product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
