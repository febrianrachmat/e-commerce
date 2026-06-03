import { getTranslations, setRequestLocale } from "next-intl/server";
import { AdminProductTable } from "@/components/features/admin/admin-product-table";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminProductsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold">{t("products")}</h1>
      <AdminProductTable />
    </section>
  );
}
