"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QueryState } from "@/components/common/query-state";
import { LinkButton } from "@/components/ui/link-button";
import { useProductsQuery } from "@/hooks/queries/use-products-query";
import { adminProductStore } from "@/lib/admin/product-store";
import { siteConfig } from "@/config/site";
import type { AdminProduct } from "@/types/admin";

export function AdminProductTable() {
  const t = useTranslations("admin");
  const tNav = useTranslations("nav");
  const productsQuery = useProductsQuery();
  const [rows, setRows] = useState<AdminProduct[]>([]);
  const [draft, setDraft] = useState({
    title: "",
    price: 0,
    category: siteConfig.fashionCategories[0] as string,
    image: "",
    description: "",
  });

  const categoryLabels: Record<string, string> = {
    "women's clothing": tNav("women"),
    "men's clothing": tNav("men"),
    jewelery: tNav("jewelry"),
  };

  useEffect(() => {
    if (productsQuery.data) {
      setRows(adminProductStore.seedFromApi(productsQuery.data));
    }
  }, [productsQuery.data]);

  const refresh = () => setRows(adminProductStore.list());

  const handleCreate = () => {
    if (!draft.title.trim()) {
      toast.error(t("titleRequired"));
      return;
    }

    adminProductStore.upsert({
      ...draft,
      rating: { rate: 0, count: 0 },
    });
    refresh();
    toast.success(t("productSaved"));
    setDraft({
      title: "",
      price: 0,
      category: siteConfig.fashionCategories[0],
      image: "",
      description: "",
    });
  };

  const handleDelete = (id: number) => {
    adminProductStore.remove(id);
    refresh();
    toast.success(t("productRemoved"));
  };

  return (
    <section aria-labelledby="admin-products-heading" className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <LinkButton href="/admin" variant="ghost" className="h-auto px-0">
            ← {t("backToDashboard")}
          </LinkButton>
          <p className="section-eyebrow">{t("eyebrow")}</p>
          <h1 id="admin-products-heading" className="heading-section">
            {t("products")}
          </h1>
          <p className="body-lead max-w-2xl">{t("localNote")}</p>
        </div>
      </div>

      <QueryState
        isLoading={productsQuery.isLoading}
        isError={productsQuery.isError}
        error={productsQuery.error}
        onRetry={() => productsQuery.refetch()}
      >
        <div className="surface-panel space-y-4 p-6">
          <h2 className="font-heading text-lg">{t("addProduct")}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="admin-title">{t("fieldTitle")}</Label>
              <Input
                id="admin-title"
                placeholder={t("fieldTitlePlaceholder")}
                value={draft.title}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, title: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-price">{t("fieldPrice")}</Label>
              <Input
                id="admin-price"
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                value={draft.price || ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, price: Number(e.target.value) }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>{t("fieldCategory")}</Label>
              <Select
                value={draft.category}
                onValueChange={(value) => {
                  if (!value) return;
                  setDraft((d) => ({ ...d, category: value }));
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {siteConfig.fashionCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {categoryLabels[cat] ?? cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="admin-image">{t("fieldImage")}</Label>
              <Input
                id="admin-image"
                placeholder={t("fieldImagePlaceholder")}
                value={draft.image}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, image: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="admin-description">{t("fieldDescription")}</Label>
              <Textarea
                id="admin-description"
                placeholder={t("fieldDescriptionPlaceholder")}
                value={draft.description}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, description: e.target.value }))
                }
              />
            </div>
          </div>
          <Button onClick={handleCreate}>{t("addProduct")}</Button>
        </div>

        <div className="surface-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border/80 bg-muted/40">
                <tr>
                  <th className="px-4 py-3 font-medium">{t("colProduct")}</th>
                  <th className="px-4 py-3 font-medium">{t("colPrice")}</th>
                  <th className="px-4 py-3 font-medium">{t("colSource")}</th>
                  <th className="px-4 py-3 font-medium">{t("colActions")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
                          {row.image ? (
                            <Image
                              src={row.image}
                              alt=""
                              fill
                              className="object-contain p-1"
                              sizes="48px"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="line-clamp-2 font-medium">{row.title}</p>
                          <p className="text-xs text-muted-foreground">
                            #{row.id} · {categoryLabels[row.category] ?? row.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      ${row.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={row.isLocal ? "default" : "secondary"}>
                        {row.isLocal ? t("sourceLocal") : t("sourceApi")}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={!row.isLocal}
                        onClick={() => handleDelete(row.id)}
                      >
                        {t("deleteProduct")}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              {t("noProducts")}
            </p>
          ) : null}
        </div>
      </QueryState>
    </section>
  );
}
