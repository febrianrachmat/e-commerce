import { setRequestLocale } from "next-intl/server";
import { HomeCatalog } from "@/components/features/home/home-catalog";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeCatalog />;
}
