"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type QueryStateProps = {
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  onRetry?: () => void;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
};

export function QueryState({
  isLoading,
  isError,
  error,
  isEmpty,
  onRetry,
  children,
  skeleton,
}: QueryStateProps) {
  const t = useTranslations("common");

  if (isLoading) {
    return (
      skeleton ?? (
        <div className="space-y-3" aria-busy="true" aria-live="polite">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      )
    );
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-lg border border-destructive/30 p-4">
        <p className="font-medium">{t("error")}</p>
        {error?.message ? (
          <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
        ) : null}
        {onRetry ? (
          <Button className="mt-3" variant="outline" onClick={onRetry}>
            {t("retry")}
          </Button>
        ) : null}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <p className="text-muted-foreground" role="status">
        {t("empty")}
      </p>
    );
  }

  return <>{children}</>;
}
