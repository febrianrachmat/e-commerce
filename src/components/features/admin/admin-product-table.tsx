"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProductsQuery } from "@/hooks/queries/use-products-query";
import { adminProductStore } from "@/lib/admin/product-store";
import type { AdminProduct } from "@/types/admin";

export function AdminProductTable() {
  const t = useTranslations("admin");
  const productsQuery = useProductsQuery();
  const [rows, setRows] = useState<AdminProduct[]>([]);
  const [draft, setDraft] = useState({
    title: "",
    price: 0,
    category: "men's clothing",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (productsQuery.data) {
      setRows(adminProductStore.seedFromApi(productsQuery.data));
    }
  }, [productsQuery.data]);

  const refresh = () => setRows(adminProductStore.list());

  const handleCreate = () => {
    adminProductStore.upsert({
      ...draft,
      rating: { rate: 0, count: 0 },
    });
    refresh();
    toast.success("Product saved");
    setDraft({
      title: "",
      price: 0,
      category: "men's clothing",
      image: "",
      description: "",
    });
  };

  const handleDelete = (id: number) => {
    adminProductStore.remove(id);
    refresh();
    toast.success("Product removed");
  };

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">{t("localNote")}</p>

      <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label>{t("addProduct")}</Label>
        </div>
        <Input
          placeholder="Title"
          value={draft.title}
          onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
        />
        <Input
          type="number"
          placeholder="Price"
          value={draft.price}
          onChange={(e) =>
            setDraft((d) => ({ ...d, price: Number(e.target.value) }))
          }
        />
        <Input
          placeholder="Category"
          value={draft.category}
          onChange={(e) =>
            setDraft((d) => ({ ...d, category: e.target.value }))
          }
        />
        <Input
          placeholder="Image URL"
          value={draft.image}
          onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))}
        />
        <Textarea
          className="md:col-span-2"
          placeholder="Description"
          value={draft.description}
          onChange={(e) =>
            setDraft((d) => ({ ...d, description: e.target.value }))
          }
        />
        <Button onClick={handleCreate}>{t("addProduct")}</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-4">ID</th>
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Price</th>
              <th className="py-2 pr-4">Source</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="py-2 pr-4">{row.id}</td>
                <td className="py-2 pr-4">{row.title}</td>
                <td className="py-2 pr-4">${row.price}</td>
                <td className="py-2 pr-4">
                  {row.isLocal ? "local" : "api"}
                </td>
                <td className="py-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
