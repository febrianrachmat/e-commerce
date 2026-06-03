"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import {
  getProducts,
  getProductsByCategory,
} from "@/lib/api/products";
import type { HomeCatalogData } from "@/lib/home/catalog";

async function loadHomeCatalog(): Promise<HomeCatalogData> {
  const results = await Promise.allSettled([
    getProducts({ sort: "rating", limit: 4 }),
    getProductsByCategory("women's clothing"),
    getProductsByCategory("men's clothing"),
    getProductsByCategory("jewelery"),
  ]);

  return {
    featured: results[0].status === "fulfilled" ? results[0].value : [],
    women: results[1].status === "fulfilled" ? results[1].value : [],
    men: results[2].status === "fulfilled" ? results[2].value : [],
    jewelry: results[3].status === "fulfilled" ? results[3].value : [],
  };
}

export function useHomeCatalogQuery() {
  return useQuery({
    queryKey: queryKeys.products.homeCatalog,
    queryFn: loadHomeCatalog,
    staleTime: 5 * 60 * 1000,
  });
}
