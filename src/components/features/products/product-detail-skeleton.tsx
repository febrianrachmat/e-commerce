import { Skeleton } from "@/components/ui/skeleton";
import { ProductBreadcrumbSkeleton } from "@/components/features/products/product-breadcrumb";

export function ProductDetailSkeleton() {
  return (
    <article className="space-y-8" aria-busy="true" aria-live="polite">
      <ProductBreadcrumbSkeleton />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Skeleton className="aspect-[3/4] w-full rounded-lg" />
        <div className="space-y-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full max-w-md" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </article>
  );
}
