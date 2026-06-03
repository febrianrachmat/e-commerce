import { setRequestLocale } from "next-intl/server";
import { AuthGuard } from "@/components/features/auth/auth-guard";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AuthGuard>{children}</AuthGuard>;
}
