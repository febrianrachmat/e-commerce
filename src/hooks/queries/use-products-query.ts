"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import {
  getFashionCategories,
  getProductById,
  getProducts,
} from "@/lib/api/products";
import type { ProductFilters } from "@/types/product";

export function useProductsQuery(filters?: ProductFilters) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => getProducts(filters),
  });
}

export function useProductQuery(id: number) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => getProductById(id),
    enabled: Number.isFinite(id),
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.products.categories,
    queryFn: getFashionCategories,
  });
}
