import { setRequestLocale } from "next-intl/server";
import { AdminProductTable } from "@/components/features/admin/admin-product-table";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminProductsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AdminProductTable />;
}
