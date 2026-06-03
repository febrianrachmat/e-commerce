import { getTranslations, setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OrderSuccessPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");

  return (
    <section role="status" className="space-y-2">
      <h1 className="text-2xl font-semibold">{t("successTitle")}</h1>
      <p className="text-muted-foreground">{t("successMessage")}</p>
    </section>
  );
}
