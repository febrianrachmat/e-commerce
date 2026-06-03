"use client";

import { useTranslations } from "next-intl";
import {
  HomeHeroSlider,
  type HeroSlide,
} from "@/components/features/home/home-hero-slider";

type HomeHeroProps = {
  slides: HeroSlide[];
};

export function HomeHero({ slides }: HomeHeroProps) {
  const t = useTranslations("home");

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
