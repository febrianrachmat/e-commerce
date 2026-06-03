"use client";

import { AlertCircle, Inbox } from "lucide-react";
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
  emptyMessage?: string;
};

export function QueryState({
  isLoading,
  isError,
  error,
  isEmpty,
  onRetry,
  children,
  skeleton,
  emptyMessage,
}: QueryStateProps) {
  const t = useTranslations("common");

  if (isLoading) {
    return (
      skeleton ?? (
        <div className="space-y-3" aria-busy="true" aria-live="polite">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      )
    );
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="surface-panel flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
          <div>
            <p className="font-medium">{t("error")}</p>
            {error?.message ? (
              <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
            ) : null}
          </div>
        </div>
        {onRetry ? (
          <Button variant="outline" onClick={onRetry}>
            {t("retry")}
          </Button>
        ) : null}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div
        className="surface-panel flex flex-col items-center gap-3 px-6 py-12 text-center"
        role="status"
      >
        <Inbox className="size-10 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">
          {emptyMessage ?? t("empty")}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
