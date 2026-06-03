import { unstable_noStore as noStore } from "next/cache";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import {
  getProducts,
  getProductsByCategory,
} from "@/lib/api/products";
import { HomeHero, pickHeroSlides } from "@/components/features/home/home-hero";
import {
  CategoryTiles,
  type CategoryTile,
} from "@/components/features/home/category-tiles";
import { FeaturedProducts } from "@/components/features/home/featured-products";
import { EditorialBanner } from "@/components/features/home/editorial-banner";
import { HomeNewsletterStrip } from "@/components/features/home/home-newsletter-strip";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const categoryNavKeys = {
  "women's clothing": "women",
  "men's clothing": "men",
  jewelery: "jewelry",
} as const;

/** Always fetch catalog at request time — build-time fetch can fail on Vercel. */
export const dynamic = "force-dynamic";

export default async function HomePage({ params }: PageProps) {
  noStore();
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations("nav");

  const catalogResults = await Promise.allSettled([
    getProducts({ sort: "rating", limit: 4 }),
    getProductsByCategory("women's clothing"),
    getProductsByCategory("men's clothing"),
    getProductsByCategory("jewelery"),
  ]);

  const featuredProducts =
    catalogResults[0].status === "fulfilled" ? catalogResults[0].value : [];
  const womenProducts =
    catalogResults[1].status === "fulfilled" ? catalogResults[1].value : [];
  const menProducts =
    catalogResults[2].status === "fulfilled" ? catalogResults[2].value : [];
  const jewelryProducts =
    catalogResults[3].status === "fulfilled" ? catalogResults[3].value : [];

  const heroSlides = pickHeroSlides([
    womenProducts[0],
    menProducts[0],
    jewelryProducts[0],
    womenProducts[2],
    menProducts[1],
    featuredProducts[0],
  ]);

  const editorialProduct =
    menProducts[1] ??
    jewelryProducts[0] ??
    featuredProducts[1] ??
    womenProducts[0];

  if (heroSlides.length === 0) {
    return (
      <section className="py-20 text-center text-muted-foreground">
        <p>Unable to load catalog.</p>
      </section>
    );
  }

  const tiles: CategoryTile[] = siteConfig.fashionCategories
    .map((category) => {
      const products =
        category === "women's clothing"
          ? womenProducts
          : category === "men's clothing"
            ? menProducts
            : jewelryProducts;
      const image = products[0]?.image;
      if (!image) return null;

      return {
        label: tNav(categoryNavKeys[category]),
        href: `/products?category=${encodeURIComponent(category)}`,
        image,
      };
    })
    .filter((tile): tile is CategoryTile => tile !== null);

  return (
    <div className="space-y-16 pb-4 md:space-y-24 md:pb-8">
      <HomeHero slides={heroSlides} />
      <CategoryTiles tiles={tiles} />
      <FeaturedProducts products={featuredProducts} />
      <EditorialBanner product={editorialProduct} />
      <HomeNewsletterStrip />
    </div>
  );
}
