import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionReveal } from "@/components/common/motion-reveal";

export type CategoryTile = {
  label: string;
  href: string;
  image: string;
};

type CategoryTilesProps = {
  tiles: CategoryTile[];
};

export async function CategoryTiles({ tiles }: CategoryTilesProps) {
  const t = await getTranslations("home");

  return (
    <section aria-labelledby="categories-heading" className="space-y-8">
      <MotionReveal>
        <div className="space-y-2">
          <p className="section-eyebrow">{t("categoriesEyebrow")}</p>
          <h2 id="categories-heading" className="heading-section">
            {t("categoriesTitle")}
          </h2>
        </div>
      </MotionReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile, index) => (
          <MotionReveal key={tile.href} delay={index * 0.08}>
            <Link
              href={tile.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={tile.image}
                alt={tile.label}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-heading text-2xl tracking-wide text-background md:text-3xl">
                  {tile.label}
                </p>
                <p className="mt-2 text-xs tracking-[0.18em] uppercase text-background/75 transition-colors group-hover:text-background">
                  {t("shopCategory")}
                </p>
              </div>
            </Link>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
