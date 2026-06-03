import { Skeleton } from "@/components/ui/skeleton";

export function HomePageSkeleton() {
  return (
    <div className="space-y-16 pb-4 md:space-y-24 md:pb-8" aria-busy="true" aria-live="polite">
      <Skeleton className="aspect-[4/5] w-full rounded-2xl md:aspect-[16/9]" />
      <div className="space-y-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="aspect-[3/4] w-full rounded-lg" />
          <Skeleton className="aspect-[3/4] w-full rounded-lg" />
          <Skeleton className="aspect-[3/4] w-full rounded-lg" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="aspect-[4/5] w-full rounded-xl" />
        <Skeleton className="aspect-[4/5] w-full rounded-xl" />
      </div>
    </div>
  );
}
