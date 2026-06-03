export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (filters?: Record<string, unknown>) =>
      ["products", "list", filters] as const,
    detail: (id: number) => ["products", "detail", id] as const,
    categories: ["products", "categories"] as const,
  },
  users: {
    detail: (id: number) => ["users", "detail", id] as const,
  },
  admin: {
    products: ["admin", "products"] as const,
  },
} as const;
