"use client";

import { useTranslations } from "next-intl";
import { FullBleed } from "@/components/layout/full-bleed";
import { MotionReveal } from "@/components/common/motion-reveal";
import { CategoryTilesShowcase } from "@/components/features/home/category-tiles-showcase";

export type CategoryTile = {
  label: string;
  href: string;
  image: string;
};

type CategoryTilesProps = {
  tiles: CategoryTile[];
};

export function CategoryTiles({ tiles }: CategoryTilesProps) {
  const t = useTranslations("home");

  if (tiles.length === 0) return null;

  return (
    <section aria-labelledby="categories-heading" className="relative">
      <FullBleed className="pointer-events-none absolute -top-6 -z-10 select-none overflow-hidden">
        <p
          aria-hidden
          className="font-display text-[clamp(4rem,18vw,13rem)] font-bold uppercase leading-[0.85] tracking-[-0.04em] text-foreground/[0.035]"
        >
          {t("categoriesEyebrow")}
        </p>
      </FullBleed>

      <div className="space-y-8 md:space-y-10">
        <MotionReveal>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div className="space-y-3">
              <p className="section-eyebrow">{t("categoriesEyebrow")}</p>
              <h2 id="categories-heading" className="heading-section max-w-md">
                {t("categoriesTitle")}
              </h2>
            </div>
            <p className="body-editorial max-w-xs border-l border-border/80 pl-5 text-sm md:text-base">
              {t("categoriesSubtitle")}
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <CategoryTilesShowcase tiles={tiles} shopLabel={t("shopCategory")} />
        </MotionReveal>
      </div>
    </section>
  );
}
