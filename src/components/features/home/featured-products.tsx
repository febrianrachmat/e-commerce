"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FullBleed } from "@/components/layout/full-bleed";
import { MotionReveal } from "@/components/common/motion-reveal";
import { FeaturedProductsShowcase } from "@/components/features/home/featured-products-showcase";
import type { Product } from "@/types/product";

type FeaturedProductsProps = {
  products: Product[];
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const t = useTranslations("home");

  if (products.length === 0) return null;

  return (
    <section aria-labelledby="featured-heading" className="relative">
      <FullBleed className="pointer-events-none absolute -top-4 -z-10 select-none overflow-hidden">
        <p
          aria-hidden
          className="font-display text-[clamp(3.5rem,16vw,11rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em] text-foreground/[0.03]"
        >
          {t("featuredEyebrow")}
        </p>
      </FullBleed>

      <div className="space-y-8 md:space-y-10">
        <MotionReveal>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-2xl space-y-3">
              <p className="section-eyebrow">{t("featuredEyebrow")}</p>
              <h2 id="featured-heading" className="heading-section">
                {t("featuredTitle")}
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
                {t("featuredSubtitle")}
              </p>
            </div>

            <Link
              href="/products"
              className="group inline-flex items-center gap-2 self-start border-b border-foreground/25 pb-1 text-sm font-semibold tracking-[0.16em] uppercase text-foreground transition-colors hover:border-foreground md:self-end md:text-base"
            >
              {t("viewAll")}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <FeaturedProductsShowcase
            products={products}
            addToCartLabel={t("featuredAddToCart")}
            exploreTitle={t("featuredExplore")}
            exploreCtaLabel={t("viewAll")}
            exploreHref="/products"
          />
        </MotionReveal>
      </div>
    </section>
  );
}
