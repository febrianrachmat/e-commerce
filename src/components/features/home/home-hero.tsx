import { getTranslations } from "next-intl/server";
import {
  HomeHeroSlider,
  type HeroSlide,
} from "@/components/features/home/home-hero-slider";
import type { Product } from "@/types/product";

type HomeHeroProps = {
  slides: HeroSlide[];
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

export async function HomeHero({ slides }: HomeHeroProps) {
  const t = await getTranslations("home");

  if (slides.length === 0) return null;

  return (
    <HomeHeroSlider
      slides={slides}
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      ctaWomenHref={`/products?category=${encodeURIComponent("women's clothing")}`}
      ctaMenHref={`/products?category=${encodeURIComponent("men's clothing")}`}
      ctaWomenLabel={t("ctaWomen")}
      ctaMenLabel={t("ctaMen")}
    />
  );
}
