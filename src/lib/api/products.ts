import { siteConfig } from "@/config/site";
import { apiClient } from "@/lib/api/client";
import type { Product, ProductFilters } from "@/types/product";

const FASHION_SET = new Set<string>(siteConfig.fashionCategories);

function isFashionProduct(product: Product) {
  return FASHION_SET.has(product.category);
}

function applyFilters(products: Product[], filters?: ProductFilters) {
  let result = products.filter(isFashionProduct);

  if (filters?.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  if (filters?.sort === "price-asc") {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (filters?.sort === "price-desc") {
    result = [...result].sort((a, b) => b.price - a.price);
  } else if (filters?.sort === "rating") {
    result = [...result].sort((a, b) => b.rating.rate - a.rating.rate);
  }

  if (filters?.limit) {
    result = result.slice(0, filters.limit);
  }

  return result;
}

export async function getProducts(filters?: ProductFilters) {
  const products = await apiClient<Product[]>("/products");
  return applyFilters(products, filters);
}

export async function getProductById(id: number) {
  const product = await apiClient<Product>(`/products/${id}`);
  if (!isFashionProduct(product)) {
    throw new Error("Product is outside fashion catalog scope");
  }
  return product;
}

export async function getFashionCategories() {
  const categories = await apiClient<string[]>("/products/categories");
  return categories.filter((c) => FASHION_SET.has(c));
}

export async function getProductsByCategory(category: string) {
  const products = await apiClient<Product[]>(
    `/products/category/${encodeURIComponent(category)}`,
  );
  return products.filter(isFashionProduct);
}
