import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LinkButton } from "@/components/ui/link-button";
import { FullBleed } from "@/components/layout/full-bleed";
import { MotionReveal } from "@/components/common/motion-reveal";
import type { Product } from "@/types/product";

type HomeHeroProps = {
  product: Product;
};

export async function HomeHero({ product }: HomeHeroProps) {
  const t = await getTranslations("home");

  return (
    <FullBleed className="-mt-8 md:-mt-10">
      <section className="relative min-h-[72vh] overflow-hidden bg-foreground text-background lg:min-h-[84vh]">
        <Image
          src={product.image}
          alt=""
          fill
          priority
          className="object-cover object-center opacity-52"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/58 to-foreground/22" />

        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-4 pb-14 pt-28 lg:min-h-[84vh] lg:pb-20 lg:pt-32">
          <MotionReveal className="max-w-2xl space-y-5">
            <p className="section-eyebrow text-background/75">{t("eyebrow")}</p>
            <h1 className="heading-display text-background">{t("title")}</h1>
            <p className="body-lead max-w-xl text-background/80">{t("subtitle")}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <LinkButton
                href={`/products?category=${encodeURIComponent("women's clothing")}`}
                className="rounded-md bg-background font-sans text-sm font-semibold text-foreground hover:bg-background/90"
              >
                {t("ctaWomen")}
              </LinkButton>
              <LinkButton
                href={`/products?category=${encodeURIComponent("men's clothing")}`}
                variant="outline"
                className="rounded-md border-background/50 bg-transparent font-sans text-sm font-semibold text-background hover:bg-background/10 hover:text-background"
              >
                {t("ctaMen")}
              </LinkButton>
            </div>
          </MotionReveal>
        </div>
      </section>
    </FullBleed>
  );
}
