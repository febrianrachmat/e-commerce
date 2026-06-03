"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LinkButton } from "@/components/ui/link-button";
import { Button } from "@/components/ui/button";
import { FullBleed } from "@/components/layout/full-bleed";
import { MotionReveal } from "@/components/common/motion-reveal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export type HeroSlide = {
  productId: number;
  image: string;
  title: string;
};

type HomeHeroSliderProps = {
  slides: HeroSlide[];
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaWomenHref: string;
  ctaMenHref: string;
  ctaWomenLabel: string;
  ctaMenLabel: string;
};

const AUTOPLAY_MS = 5000;

export function HomeHeroSlider({
  slides,
  eyebrow,
  title,
  subtitle,
  ctaWomenHref,
  ctaMenHref,
  ctaWomenLabel,
  ctaMenLabel,
}: HomeHeroSliderProps) {
  const t = useTranslations("home");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = slides.length;
  const activeSlide = slides[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setActiveIndex((index + total) % total);
    },
    [total],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [total, isPaused, activeIndex]);

  if (!activeSlide) return null;

  return (
    <FullBleed className="-mt-8 md:-mt-10">
      <section
        className="relative min-h-[72vh] overflow-hidden bg-foreground text-background lg:min-h-[84vh]"
        aria-roledescription="carousel"
        aria-label={t("heroCarouselLabel")}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsPaused(false);
          }
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSlide.productId}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              priority={activeIndex === 0}
              className="object-cover object-center opacity-52"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/58 to-foreground/22" />

        {total > 1 ? (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-28 z-20 flex justify-center gap-2 md:bottom-32">
              {slides.map((slide, index) => (
                <button
                  key={slide.productId}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={t("heroSlideLabel", {
                    current: index + 1,
                    total,
                  })}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={cn(
                    "pointer-events-auto h-1.5 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "w-8 bg-background"
                      : "w-1.5 bg-background/45 hover:bg-background/70",
                  )}
                />
              ))}
            </div>

            <div className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex lg:right-8">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={goPrev}
                aria-label={t("heroPrevious")}
                className="border-background/35 bg-background/10 text-background backdrop-blur-sm hover:bg-background/20 hover:text-background"
              >
                <ChevronLeft />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={goNext}
                aria-label={t("heroNext")}
                className="border-background/35 bg-background/10 text-background backdrop-blur-sm hover:bg-background/20 hover:text-background"
              >
                <ChevronRight />
              </Button>
            </div>
          </>
        ) : null}

        <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-4 pb-14 pt-28 lg:min-h-[84vh] lg:pb-20 lg:pt-32">
          <MotionReveal className="max-w-2xl space-y-5">
            <p className="section-eyebrow text-background/75">{eyebrow}</p>
            <h1 className="heading-display text-background">{title}</h1>
            <p className="body-lead max-w-xl text-background/80">{subtitle}</p>

            {total > 1 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.productId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1"
                >
                  <p className="line-clamp-1 text-sm text-background/70">
                    {activeSlide.title}
                  </p>
                  <Link
                    href={`/products/${activeSlide.productId}`}
                    className="text-sm font-medium text-background underline-offset-4 hover:underline"
                  >
                    {t("viewProduct")}
                  </Link>
                </motion.div>
              </AnimatePresence>
            ) : null}

            <div className="flex flex-wrap gap-3 pt-2">
              <LinkButton
                href={ctaWomenHref}
                className="rounded-md bg-background font-sans text-sm font-semibold text-foreground hover:bg-background/90"
              >
                {ctaWomenLabel}
              </LinkButton>
              <LinkButton
                href={ctaMenHref}
                variant="outline"
                className="rounded-md border-background/50 bg-transparent font-sans text-sm font-semibold text-background hover:bg-background/10 hover:text-background"
              >
                {ctaMenLabel}
              </LinkButton>
            </div>

            {total > 1 ? (
              <div className="flex items-center gap-2 pt-2 md:hidden">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={goPrev}
                  aria-label={t("heroPrevious")}
                  className="border-background/35 bg-background/10 text-background hover:bg-background/20"
                >
                  <ChevronLeft />
                </Button>
                <span className="text-xs text-background/70">
                  {t("heroSlideLabel", {
                    current: activeIndex + 1,
                    total,
                  })}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={goNext}
                  aria-label={t("heroNext")}
                  className="border-background/35 bg-background/10 text-background hover:bg-background/20"
                >
                  <ChevronRight />
                </Button>
              </div>
            ) : null}
          </MotionReveal>
        </div>
      </section>
    </FullBleed>
  );
}
