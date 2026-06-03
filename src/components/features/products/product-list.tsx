"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ProductGrid } from "@/components/features/products/product-grid";
import { FullBleed } from "@/components/layout/full-bleed";
import { MotionReveal } from "@/components/common/motion-reveal";
import { ProductFiltersToolbar } from "@/components/features/products/product-filters-toolbar";
import { QueryState } from "@/components/common/query-state";
import {
  useCategoriesQuery,
  useProductsQuery,
} from "@/hooks/queries/use-products-query";
import type { ProductFilters } from "@/types/product";

const categoryNavKeys: Record<string, "women" | "men" | "jewelry"> = {
  "women's clothing": "women",
  "men's clothing": "men",
  jewelery: "jewelry",
};

export function ProductList() {
  const t = useTranslations("products");
  const tNav = useTranslations("nav");
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<ProductFilters["sort"]>();

  const filters = useMemo<ProductFilters>(
    () => ({ search: search || undefined, category, sort }),
    [search, category, sort],
  );

  const productsQuery = useProductsQuery(filters);
  const categoriesQuery = useCategoriesQuery();

  function updateCategory(next?: string) {
    const href = next
      ? `/products?category=${encodeURIComponent(next)}`
      : "/products";
    router.replace(href);
  }

  function categoryLabel(value: string) {
    const key = categoryNavKeys[value];
    return key ? tNav(key) : value;
  }

  const sortLabel = (() => {
    switch (sort) {
      case "price-asc":
        return t("sortPriceAsc");
      case "price-desc":
        return t("sortPriceDesc");
      case "rating":
        return t("sortRating");
      default:
        return t("sortDefault");
    }
  })();

  const resultCount = productsQuery.data?.length ?? 0;

  return (
    <section aria-labelledby="products-heading" className="relative space-y-8 md:space-y-10">
      <FullBleed className="pointer-events-none absolute -top-4 -z-10 select-none overflow-hidden">
        <p
          aria-hidden
          className="font-display text-[clamp(3.5rem,16vw,11rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em] text-foreground/[0.03]"
        >
          {t("shopEyebrow")}
        </p>
      </FullBleed>

      <MotionReveal className="space-y-4 md:space-y-5">
        <p className="section-eyebrow">{t("shopEyebrow")}</p>
        <h1 id="products-heading" className="heading-section max-w-3xl">
          {t("title")}
        </h1>
        <p className="body-lead max-w-2xl text-base md:text-lg md:leading-relaxed">
          {t("shopSubtitle")}
        </p>
      </MotionReveal>

      <ProductFiltersToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={t("searchPlaceholder")}
        sort={sort ?? "default"}
        sortLabel={sortLabel}
        onSortChange={(value) =>
          setSort(
            !value || value === "default"
              ? undefined
              : (value as ProductFilters["sort"]),
          )
        }
        sortOptions={[
          { value: "default", label: t("sortDefault") },
          { value: "price-asc", label: t("sortPriceAsc") },
          { value: "price-desc", label: t("sortPriceDesc") },
          { value: "rating", label: t("sortRating") },
        ]}
        category={category}
        categories={categoriesQuery.data ?? []}
        categoryLabel={categoryLabel}
        onCategoryChange={updateCategory}
        allCategoriesLabel={t("allCategories")}
        resultCountLabel={
          !productsQuery.isLoading && !productsQuery.isError
            ? t("resultCount", { count: resultCount })
            : undefined
        }
      />

      {!productsQuery.isLoading && !productsQuery.isError ? (
        <p className="text-sm text-muted-foreground sm:hidden">
          {t("resultCount", { count: resultCount })}
        </p>
      ) : null}

      <QueryState
        isLoading={productsQuery.isLoading}
        isError={productsQuery.isError}
        error={productsQuery.error}
        isEmpty={resultCount === 0}
        onRetry={() => productsQuery.refetch()}
      >
        {productsQuery.data ? (
          <ProductGrid products={productsQuery.data} />
        ) : null}
      </QueryState>
    </section>
  );
}
