import { setRequestLocale } from "next-intl/server";
import { AdminDashboard } from "@/components/features/admin/admin-dashboard";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AdminDashboard />;
}
