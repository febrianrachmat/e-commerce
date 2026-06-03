"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores/auth-store";

function AuthGuardSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const t = useTranslations("auth");
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const finishHydration = () => setHydrated(true);

    if (useAuthStore.persist.hasHydrated()) {
      finishHydration();
      return;
    }

    return useAuthStore.persist.onFinishHydration(finishHydration);
  }, []);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) {
    return <AuthGuardSkeleton />;
  }

  if (!isAuthenticated) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground" role="status">
        {t("redirecting")}
      </p>
    );
  }

  return <>{children}</>;
}
