import { getTranslations, setRequestLocale } from "next-intl/server";
import { LoginForm } from "@/components/features/auth/login-form";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold">{t("loginTitle")}</h1>
      <LoginForm />
    </section>
  );
}
