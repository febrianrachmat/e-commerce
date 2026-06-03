"use client";

import { useTranslations } from "next-intl";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";
import { FullBleed } from "@/components/layout/full-bleed";
import { MotionReveal } from "@/components/common/motion-reveal";

export function HomeNewsletterStrip() {
  const t = useTranslations("home");

  return (
    <FullBleed>
      <section className="border-y border-border/80 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <MotionReveal className="mx-auto max-w-xl text-center">
            <p className="section-eyebrow">{t("newsletterEyebrow")}</p>
            <h2 className="heading-subsection mt-3">{t("newsletterTitle")}</h2>
            <p className="body-lead mt-3">{t("newsletterSubtitle")}</p>
            <div className="mt-8">
              <FooterNewsletter showHeader={false} />
            </div>
          </MotionReveal>
        </div>
      </section>
    </FullBleed>
  );
}
