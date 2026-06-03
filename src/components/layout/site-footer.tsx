import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t("help.title"),
      links: [
        { label: t("help.faq"), href: "#" },
        { label: t("help.contact"), href: "#" },
        { label: t("help.sizeGuide"), href: "#" },
      ],
    },
    {
      title: t("shopping.title"),
      links: [
        { label: t("shopping.delivery"), href: "#" },
        { label: t("shopping.returns"), href: "#" },
        { label: t("shopping.trackOrder"), href: "#" },
      ],
    },
    {
      title: t("about.title"),
      links: [
        { label: t("about.brand"), href: "#" },
        { label: t("about.sustainability"), href: "#" },
        { label: t("about.careers"), href: "#" },
      ],
    },
  ] as const;

  return (
    <footer className="mt-auto border-t bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h2 className="section-eyebrow text-foreground">{column.title}</h2>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <FooterNewsletter />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/80 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-heading text-lg tracking-[0.16em] uppercase">
            {siteConfig.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("copyright", { year, brand: siteConfig.name })}
          </p>
        </div>
      </div>
    </footer>
  );
}
