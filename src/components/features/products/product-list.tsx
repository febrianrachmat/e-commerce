"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/features/products/product-card";
import { QueryState } from "@/components/common/query-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCategoriesQuery,
  useProductsQuery,
} from "@/hooks/queries/use-products-query";
import type { ProductFilters } from "@/types/product";

export function ProductList() {
  const t = useTranslations("products");
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? undefined;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(initialCategory);
  const [sort, setSort] = useState<ProductFilters["sort"]>();

  const filters = useMemo<ProductFilters>(
    () => ({ search: search || undefined, category, sort }),
    [search, category, sort],
  );

  const productsQuery = useProductsQuery(filters);
  const categoriesQuery = useCategoriesQuery();

  return (
    <section aria-labelledby="products-heading" className="space-y-6">
      <h1 id="products-heading" className="text-2xl font-semibold">
        {t("title")}
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="search">{t("filters")}</Label>
          <Input
            id="search"
            placeholder={t("filters")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>{t("category")}</Label>
          <Select
            value={category ?? "all"}
            onValueChange={(v) =>
              setCategory(!v || v === "all" ? undefined : v)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t("category")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {(categoriesQuery.data ?? []).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("sort")}</Label>
          <Select
            value={sort ?? "none"}
            onValueChange={(v) =>
              setSort(
                !v || v === "none" ? undefined : (v as ProductFilters["sort"]),
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t("sort")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">—</SelectItem>
              <SelectItem value="price-asc">{t("sortPriceAsc")}</SelectItem>
              <SelectItem value="price-desc">{t("sortPriceDesc")}</SelectItem>
              <SelectItem value="rating">{t("sortRating")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <QueryState
        isLoading={productsQuery.isLoading}
        isError={productsQuery.isError}
        error={productsQuery.error}
        isEmpty={(productsQuery.data?.length ?? 0) === 0}
        onRetry={() => productsQuery.refetch()}
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
