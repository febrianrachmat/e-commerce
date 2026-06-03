import type { Product } from "@/types/product";

export type CartLineItem = {
  productId: number;
  quantity: number;
  product: Pick<Product, "id" | "title" | "price" | "image">;
};

export type CartState = {
  items: CartLineItem[];
};
