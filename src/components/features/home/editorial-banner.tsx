"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LinkButton } from "@/components/ui/link-button";
import { FullBleed } from "@/components/layout/full-bleed";
import { MotionReveal } from "@/components/common/motion-reveal";
import type { Product } from "@/types/product";

type EditorialBannerProps = {
  product: Product;
};

export function EditorialBanner({ product }: EditorialBannerProps) {
  const t = useTranslations("home");

  return (
    <FullBleed>
      <section className="relative overflow-hidden bg-foreground text-background">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src={product.image}
            alt=""
            fill
            className="scale-110 object-cover object-center opacity-25 blur-3xl saturate-125"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-foreground/82" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_78%_42%,rgba(255,255,255,0.08),transparent_55%)]" />
        </div>

        <p
          aria-hidden
          className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 select-none font-display text-[clamp(5rem,22vw,16rem)] font-bold uppercase leading-[0.82] tracking-[-0.05em] text-background/[0.045] lg:block"
        >
          {t("editorialEyebrow")}
        </p>

        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-full w-px bg-background/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-8 top-12 hidden h-24 w-px bg-background/20 md:block lg:left-[calc((100vw-80rem)/2+2rem)]"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:gap-12 md:py-20 lg:grid-cols-12 lg:py-24">
          <MotionReveal className="space-y-7 lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="font-display text-[0.625rem] font-semibold tracking-[0.34em] text-background/45">
                02
              </span>
              <span className="h-px flex-1 max-w-16 bg-background/25" />
              <p className="section-eyebrow text-background/60">
                {t("editorialEyebrow")}
              </p>
            </div>

            <div className="space-y-5">
              <h2 className="heading-section max-w-md text-background md:text-[2.75rem] md:leading-[1.06]">
                {t("editorialTitle")}
              </h2>
              <p className="max-w-md text-base leading-relaxed text-background/78 md:text-lg md:leading-relaxed">
                {t("editorialBody")}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <LinkButton
                href="/products"
                className="rounded-md bg-background font-sans text-sm font-semibold text-foreground hover:bg-background/90"
              >
                {t("editorialCta")}
              </LinkButton>
              <Link
                href={`/products/${product.id}`}
                className="group inline-flex items-center gap-2 text-sm font-semibold tracking-[0.12em] uppercase text-background/75 transition-colors hover:text-background"
              >
                {t("viewProduct")}
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </MotionReveal>

          <MotionReveal
            delay={0.1}
            className="relative lg:col-span-7 lg:col-start-6"
          >
            <div
              aria-hidden
              className="absolute -left-3 top-8 hidden size-28 rounded-full border border-background/15 md:block lg:-left-10 lg:size-36"
            />
            <div
              aria-hidden
              className="absolute -right-2 bottom-10 hidden h-28 w-28 border border-dashed border-background/20 md:block"
              style={{ transform: "rotate(12deg)" }}
            />

            <div className="group relative mx-auto w-full max-w-xl lg:ml-auto lg:max-w-none">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-background/15 bg-background/[0.04] p-5 backdrop-blur-sm md:p-7 lg:-rotate-1 lg:transition-transform lg:duration-700 lg:group-hover:rotate-0">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, transparent, transparent 27px, rgba(255,255,255,0.04) 27px, rgba(255,255,255,0.04) 28px)",
                  }}
                />

                <div className="relative mx-auto aspect-[4/5] max-h-[26rem] w-full md:max-h-[30rem]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain object-center drop-shadow-[0_28px_56px_rgba(0,0,0,0.45)] transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 90vw, 42vw"
                  />
                </div>

                <div className="relative mt-5 flex items-end justify-between gap-4 border-t border-background/15 pt-5">
                  <div className="min-w-0 space-y-1">
                    <p className="line-clamp-2 font-heading text-xl font-light leading-snug text-background md:text-2xl">
                      {product.title}
                    </p>
                    <p className="font-display text-2xl font-bold tracking-tight text-background">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    aria-label={t("viewProduct")}
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-background/25 bg-background/10 text-background transition-colors hover:bg-background/15"
                  >
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>
    </FullBleed>
  );
}
