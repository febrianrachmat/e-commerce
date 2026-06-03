import { getTranslations } from "next-intl/server";
import { ProductCard } from "@/components/features/products/product-card";
import { LinkButton } from "@/components/ui/link-button";
import { MotionReveal } from "@/components/common/motion-reveal";
import type { Product } from "@/types/product";

type FeaturedProductsProps = {
  products: Product[];
};

export async function FeaturedProducts({ products }: FeaturedProductsProps) {
  const t = await getTranslations("home");

  if (products.length === 0) return null;

  return (
    <section aria-labelledby="featured-heading" className="space-y-8">
      <MotionReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="section-eyebrow">{t("featuredEyebrow")}</p>
          <h2 id="featured-heading" className="heading-section">
            {t("featuredTitle")}
          </h2>
          <p className="body-lead max-w-xl">{t("featuredSubtitle")}</p>
        </div>
        <LinkButton href="/products" variant="outline">
          {t("viewAll")}
        </LinkButton>
      </MotionReveal>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <MotionReveal key={product.id} delay={index * 0.06} className="h-full">
            <li className="h-full">
              <ProductCard product={product} />
            </li>
          </MotionReveal>
        ))}
      </ul>
    </section>
  );
}
