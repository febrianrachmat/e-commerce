import { setRequestLocale } from "next-intl/server";
import { AuthGuard } from "@/components/features/auth/auth-guard";
import { ProfileForm } from "@/components/features/profile/profile-form";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProfilePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AuthGuard>
      <ProfileForm />
    </AuthGuard>
  );
}
