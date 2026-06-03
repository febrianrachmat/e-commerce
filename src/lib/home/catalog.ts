import { siteConfig } from "@/config/site";
import type { HeroSlide } from "@/components/features/home/home-hero-slider";
import type { CategoryTile } from "@/components/features/home/category-tiles";
import type { Product } from "@/types/product";

export type HomeCatalogData = {
  featured: Product[];
  women: Product[];
  men: Product[];
  jewelry: Product[];
};

function toHeroSlide(product: Product): HeroSlide {
  return {
    productId: product.id,
    image: product.image,
    title: product.title,
  };
}

export function pickHeroSlides(products: (Product | undefined)[]): HeroSlide[] {
  const seen = new Set<number>();

  return products
    .filter((product): product is Product => product != null)
    .filter((product) => {
      if (seen.has(product.id)) return false;
      seen.add(product.id);
      return true;
    })
    .slice(0, 5)
    .map(toHeroSlide);
}

export function pickEditorialProduct(data: HomeCatalogData): Product | null {
  return (
    data.men[1] ??
    data.jewelry[0] ??
    data.featured[1] ??
    data.women[0] ??
    null
  );
}

export function buildCategoryTiles(
  data: HomeCatalogData,
  labelFor: (category: (typeof siteConfig.fashionCategories)[number]) => string,
): CategoryTile[] {
  const categoryNavKeys = {
    "women's clothing": "women",
    "men's clothing": "men",
    jewelery: "jewelry",
  } as const;

  return siteConfig.fashionCategories
    .map((category) => {
      const products =
        category === "women's clothing"
          ? data.women
          : category === "men's clothing"
            ? data.men
            : data.jewelry;
      const image = products[0]?.image;
      if (!image) return null;

      return {
        label: labelFor(category),
        href: `/products?category=${encodeURIComponent(category)}`,
        image,
      };
    })
    .filter((tile): tile is CategoryTile => tile !== null);
}
