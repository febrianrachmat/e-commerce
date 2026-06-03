"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ProductCard } from "@/components/features/products/product-card";
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
  const initialCategory = searchParams.get("category") ?? undefined;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(initialCategory);
  const [sort, setSort] = useState<ProductFilters["sort"]>();

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const filters = useMemo<ProductFilters>(
    () => ({ search: search || undefined, category, sort }),
    [search, category, sort],
  );

  const productsQuery = useProductsQuery(filters);
  const categoriesQuery = useCategoriesQuery();

  function updateCategory(next?: string) {
    setCategory(next);
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
    <section aria-labelledby="products-heading" className="space-y-8">
      <div className="space-y-3">
        <p className="section-eyebrow">{t("shopEyebrow")}</p>
        <h1 id="products-heading" className="heading-section">
          {t("title")}
        </h1>
        <p className="body-lead max-w-2xl">{t("shopSubtitle")}</p>
      </div>

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
        <ul className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {productsQuery.data?.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </QueryState>
    </section>
  );
}
