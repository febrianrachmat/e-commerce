import { CheckCircle2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LinkButton } from "@/components/ui/link-button";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OrderSuccessPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");

  return (
    <section
      role="status"
      className="mx-auto flex max-w-lg flex-col items-center gap-6 py-12 text-center"
    >
      <div className="surface-panel flex w-full flex-col items-center gap-5 px-6 py-12">
        <CheckCircle2 className="size-14 text-brand" aria-hidden />
        <div className="space-y-2">
          <p className="section-eyebrow">{t("successEyebrow")}</p>
          <h1 className="heading-subsection">{t("successTitle")}</h1>
          <p className="body-lead">{t("successMessage")}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <LinkButton href="/products" className="w-full sm:w-auto">
            {t("successShop")}
          </LinkButton>
          <LinkButton href="/" variant="outline" className="w-full sm:w-auto">
            {t("successHome")}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
