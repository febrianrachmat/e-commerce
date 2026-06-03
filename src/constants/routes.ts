import type { Locale } from "@/i18n/routing";

type RouteKey =
  | "home"
  | "products"
  | "productDetail"
  | "cart"
  | "checkout"
  | "orderSuccess"
  | "login"
  | "profile"
  | "admin"
  | "adminProducts";

const paths: Record<RouteKey, string> = {
  home: "/",
  products: "/products",
  productDetail: "/products/[id]",
  cart: "/cart",
  checkout: "/checkout",
  orderSuccess: "/order/success",
  login: "/login",
  profile: "/profile",
  admin: "/admin",
  adminProducts: "/admin/products",
};

export function getRoute(locale: Locale, key: RouteKey, params?: { id?: number }) {
  const base = `/${locale}${paths[key] === "/" ? "" : paths[key]}`;
  if (key === "productDetail" && params?.id != null) {
    return `/${locale}/products/${params.id}`;
  }
  return base.replace("[id]", String(params?.id ?? ""));
}
