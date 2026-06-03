import type { Product } from "@/types/product";

/** Admin-managed product — extends API shape for local CRUD layer */
export type AdminProduct = Product & {
  isLocal?: boolean;
};

export type AdminProductInput = Omit<Product, "id" | "rating"> & {
  id?: number;
  rating?: Product["rating"];
};
