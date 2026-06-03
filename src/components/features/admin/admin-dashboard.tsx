"use client";

import { useMemo } from "react";
import { Package, Database } from "lucide-react";
import { useTranslations } from "next-intl";
import { LinkButton } from "@/components/ui/link-button";
import { useProductsQuery } from "@/hooks/queries/use-products-query";
import { adminProductStore } from "@/lib/admin/product-store";

export function AdminDashboard() {
  const t = useTranslations("admin");
  const productsQuery = useProductsQuery();

  const localCount = useMemo(() => {
    if (!productsQuery.data) return 0;
    return adminProductStore
      .seedFromApi(productsQuery.data)
      .filter((p) => p.isLocal).length;
  }, [productsQuery.data]);

  const catalogCount = productsQuery.data?.length ?? 0;

  return (
    <section aria-labelledby="admin-heading" className="space-y-8">
      <div className="space-y-3">
        <p className="section-eyebrow">{t("eyebrow")}</p>
        <h1 id="admin-heading" className="heading-section">
          {t("title")}
        </h1>
        <p className="body-lead max-w-2xl">{t("subtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="surface-panel flex items-start gap-4 p-6">
          <div className="rounded-lg bg-muted p-3">
            <Package className="size-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{t("catalogSize")}</p>
            <p className="font-heading text-3xl">{catalogCount}</p>
            <p className="text-xs text-muted-foreground">{t("catalogHint")}</p>
          </div>
        </div>
        <div className="surface-panel flex items-start gap-4 p-6">
          <div className="rounded-lg bg-muted p-3">
            <Database className="size-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{t("localOverrides")}</p>
            <p className="font-heading text-3xl">{localCount}</p>
            <p className="text-xs text-muted-foreground">{t("localHint")}</p>
          </div>
        </div>
      </div>

      <div className="surface-panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="font-heading text-lg">{t("products")}</h2>
          <p className="text-sm text-muted-foreground">{t("productsHint")}</p>
        </div>
        <LinkButton href="/admin/products">{t("manageProducts")}</LinkButton>
      </div>
    </section>
  );
}
