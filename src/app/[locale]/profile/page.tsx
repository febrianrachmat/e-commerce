import { getTranslations, setRequestLocale } from "next-intl/server";
import { AuthGuard } from "@/components/features/auth/auth-guard";
import { ProfileForm } from "@/components/features/profile/profile-form";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProfilePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("profile");

  return (
    <AuthGuard>
      <section>
        <h1 className="mb-6 text-2xl font-semibold">{t("title")}</h1>
        <ProfileForm />
      </section>
    </AuthGuard>
  );
}
