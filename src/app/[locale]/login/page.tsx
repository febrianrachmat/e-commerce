import { setRequestLocale } from "next-intl/server";
import { LoginForm } from "@/components/features/auth/login-form";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-1 items-center py-8 md:py-12">
      <LoginForm />
    </div>
  );
}
