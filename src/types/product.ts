export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type ProductFilters = {
  category?: string;
  sort?: "price-asc" | "price-desc" | "rating";
  search?: string;
  limit?: number;
};
