import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { ProductList } from "@/components/features/products/product-list";
import { Skeleton } from "@/components/ui/skeleton";

type PageProps = {
  params: Promise<{ locale: string }>;
};

function ProductListFallback() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-32" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-12 lg:gap-5">
        <Skeleton className="col-span-2 aspect-[4/5] rounded-2xl lg:col-span-7 lg:row-span-2 lg:aspect-auto lg:min-h-[22rem]" />
        <Skeleton className="aspect-[4/5] rounded-2xl lg:col-span-5 lg:min-h-[14rem]" />
        <Skeleton className="aspect-[4/5] rounded-2xl lg:col-span-5 lg:min-h-[14rem]" />
        <Skeleton className="col-span-2 aspect-[3/4] rounded-2xl lg:col-span-4" />
        <Skeleton className="aspect-[4/5] rounded-2xl lg:col-span-4" />
        <Skeleton className="aspect-[4/5] rounded-2xl lg:col-span-4" />
      </div>
    </div>
  );
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<ProductListFallback />}>
      <ProductList />
    </Suspense>
  );
}
