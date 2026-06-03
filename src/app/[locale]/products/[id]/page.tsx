import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductDetailClient } from "@/components/features/products/product-detail-client";
import { getProductById } from "@/lib/api/products";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");
  const productId = Number(id);

  if (!Number.isFinite(productId)) {
    return <p>{t("notFound")}</p>;
  }

  try {
    const product = await getProductById(productId);
    return (
      <article className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square bg-muted">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-xl">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground">{product.description}</p>
          <ProductDetailClient product={product} />
        </div>
      </article>
    );
  } catch {
    return <p role="alert">{t("notFound")}</p>;
  }
}
