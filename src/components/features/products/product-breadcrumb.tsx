import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type ProductBreadcrumbProps = {
  category: string;
  title: string;
};

function formatCategory(category: string) {
  return category.replace("'s", "'s ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function ProductBreadcrumb({
  category,
  title,
}: ProductBreadcrumbProps) {
  const t = await getTranslations("products");

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="link-underline">
            {t("breadcrumbHome")}
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          <Link href="/products" className="link-underline">
            {t("breadcrumbShop")}
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          <Link
            href={`/products?category=${encodeURIComponent(category)}`}
            className="link-underline"
          >
            {formatCategory(category)}
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li className="line-clamp-1 text-foreground" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
}

export function ProductBreadcrumbSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn("h-5 w-full max-w-md animate-pulse rounded bg-muted", className)}
    />
  );
}
