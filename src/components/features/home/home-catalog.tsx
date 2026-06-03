"use client";

import { useTranslations } from "next-intl";
import { QueryState } from "@/components/common/query-state";
import { HomeHero } from "@/components/features/home/home-hero";
import { CategoryTiles } from "@/components/features/home/category-tiles";
import { FeaturedProducts } from "@/components/features/home/featured-products";
import { EditorialBanner } from "@/components/features/home/editorial-banner";
import { HomeNewsletterStrip } from "@/components/features/home/home-newsletter-strip";
import { HomePageSkeleton } from "@/components/features/home/home-page-skeleton";
import { useHomeCatalogQuery } from "@/hooks/queries/use-home-catalog-query";
import {
  buildCategoryTiles,
  pickEditorialProduct,
  pickHeroSlides,
} from "@/lib/home/catalog";
import type { HomeCatalogData } from "@/lib/home/catalog";

const categoryNavKeys = {
  "women's clothing": "women",
  "men's clothing": "men",
  jewelery: "jewelry",
} as const;

export function HomeCatalog() {
  const tNav = useTranslations("nav");
  const catalogQuery = useHomeCatalogQuery();

  const hasCatalog =
    catalogQuery.data &&
    pickHeroSlides([
      catalogQuery.data.women[0],
      catalogQuery.data.men[0],
      catalogQuery.data.jewelry[0],
      catalogQuery.data.women[2],
      catalogQuery.data.men[1],
      catalogQuery.data.featured[0],
    ]).length > 0;

  return (
    <QueryState
      isLoading={catalogQuery.isLoading}
      isError={catalogQuery.isError}
      error={catalogQuery.error}
      isEmpty={!catalogQuery.isLoading && !catalogQuery.isError && !hasCatalog}
      onRetry={() => catalogQuery.refetch()}
      skeleton={<HomePageSkeleton />}
      emptyMessage="Unable to load catalog."
    >
      {catalogQuery.data ? (
        <HomeCatalogContent data={catalogQuery.data} tNav={tNav} />
      ) : null}
    </QueryState>
  );
}

function HomeCatalogContent({
  data,
  tNav,
}: {
  data: HomeCatalogData;
  tNav: ReturnType<typeof useTranslations<"nav">>;
}) {
  const heroSlides = pickHeroSlides([
    data.women[0],
    data.men[0],
    data.jewelry[0],
    data.women[2],
    data.men[1],
    data.featured[0],
  ]);

  const editorialProduct = pickEditorialProduct(data);
  const tiles = buildCategoryTiles(data, (category) =>
    tNav(categoryNavKeys[category]),
  );

  return (
    <div className="space-y-16 pb-4 md:space-y-24 md:pb-8">
      <HomeHero slides={heroSlides} />
      <CategoryTiles tiles={tiles} />
      <FeaturedProducts products={data.featured} />
      {editorialProduct ? <EditorialBanner product={editorialProduct} /> : null}
      <HomeNewsletterStrip />
    </div>
  );
}
