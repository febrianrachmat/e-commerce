import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LinkButton } from "@/components/ui/link-button";
import { FullBleed } from "@/components/layout/full-bleed";
import { MotionReveal } from "@/components/common/motion-reveal";
import type { Product } from "@/types/product";

type EditorialBannerProps = {
  product: Product;
};

export async function EditorialBanner({ product }: EditorialBannerProps) {
  const t = await getTranslations("home");

  return (
    <FullBleed>
      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <MotionReveal className="flex flex-col justify-center px-4 py-14 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-md space-y-5 lg:mx-0">
              <p className="section-eyebrow">{t("editorialEyebrow")}</p>
              <h2 className="heading-section">{t("editorialTitle")}</h2>
              <p className="body-lead text-foreground/85">{t("editorialBody")}</p>
              <LinkButton href="/products">{t("editorialCta")}</LinkButton>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1} className="relative min-h-[360px] lg:min-h-full">
            <div className="relative h-full min-h-[360px] overflow-hidden lg:min-h-[520px]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>
    </FullBleed>
  );
}
