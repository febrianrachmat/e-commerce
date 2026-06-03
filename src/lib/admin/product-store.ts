import type { AdminProduct, AdminProductInput } from "@/types/admin";
import type { Product } from "@/types/product";

const STORAGE_KEY = "veldt-admin-products";

function readStore(): AdminProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdminProduct[]) : [];
  } catch {
    return [];
  }
}

function writeStore(products: AdminProduct[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

let nextLocalId = -1;

function nextId() {
  nextLocalId -= 1;
  return nextLocalId;
}

/** Local admin CRUD — Fake Store API has no real write endpoints for portfolio demo */
export const adminProductStore = {
  list(): AdminProduct[] {
    return readStore();
  },

  seedFromApi(products: Product[]) {
    const existing = readStore();
    if (existing.length > 0) return existing;
    const seeded = products.map((p) => ({ ...p, isLocal: false }));
    writeStore(seeded);
    return seeded;
  },

  upsert(input: AdminProductInput): AdminProduct {
    const products = readStore();
    const rating = input.rating ?? { rate: 0, count: 0 };

    if (input.id != null) {
      const index = products.findIndex((p) => p.id === input.id);
      const updated: AdminProduct = {
        id: input.id,
        title: input.title,
        price: input.price,
        description: input.description,
        category: input.category,
        image: input.image,
        rating,
        isLocal: products[index]?.isLocal ?? true,
      };
      if (index >= 0) {
        products[index] = updated;
      } else {
        products.push(updated);
      }
      writeStore(products);
      return updated;
    }

    const created: AdminProduct = {
      id: nextId(),
      title: input.title,
      price: input.price,
      description: input.description,
      category: input.category,
      image: input.image,
      rating,
      isLocal: true,
    };
    products.push(created);
    writeStore(products);
    return created;
  },

  remove(id: number) {
    const products = readStore().filter((p) => p.id !== id);
    writeStore(products);
  },
};
