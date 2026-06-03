"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ProductCard } from "@/components/features/products/product-card";
import { QueryState } from "@/components/common/query-state";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

      <div className="sticky top-[7.25rem] z-40 -mx-4 space-y-4 border-y border-border/80 bg-background/95 px-4 py-4 backdrop-blur-md supports-backdrop-filter:bg-background/85 md:top-[8.5rem] lg:top-36">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative min-w-0 flex-1 lg:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9"
            />
          </div>

          <Select
            value={sort ?? "none"}
            onValueChange={(value) =>
              setSort(
                !value || value === "none"
                  ? undefined
                  : (value as ProductFilters["sort"]),
              )
            }
          >
            <SelectTrigger className="w-full lg:w-52">
              <SelectValue placeholder={t("sort")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">{t("sortDefault")}</SelectItem>
              <SelectItem value="price-asc">{t("sortPriceAsc")}</SelectItem>
              <SelectItem value="price-desc">{t("sortPriceDesc")}</SelectItem>
              <SelectItem value="rating">{t("sortRating")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={category ? "outline" : "default"}
            className={cn(
              "rounded-full tracking-wide uppercase",
              !category && "bg-foreground text-background hover:bg-foreground/90",
            )}
            onClick={() => updateCategory(undefined)}
          >
            {t("allCategories")}
          </Button>
          {(categoriesQuery.data ?? []).map((cat) => (
            <Button
              key={cat}
              type="button"
              size="sm"
              variant={category === cat ? "default" : "outline"}
              className={cn(
                "rounded-full tracking-wide uppercase",
                category === cat &&
                  "bg-foreground text-background hover:bg-foreground/90",
              )}
              onClick={() => updateCategory(cat)}
            >
              {categoryLabel(cat)}
            </Button>
          ))}
        </div>
      </div>

      {!productsQuery.isLoading && !productsQuery.isError ? (
        <p className="text-sm text-muted-foreground">
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
