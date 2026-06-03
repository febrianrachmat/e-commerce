export const siteConfig = {
  name: "VELDT",
  description:
    "Premium fashion e-commerce — editorial style meets modern shopping experience.",
  /** Fake Store categories mapped for fashion-focused catalog */
  fashionCategories: ["men's clothing", "women's clothing", "jewelery"] as const,
  defaultLocale: "en" as const,
  locales: ["en", "id"] as const,
} as const;
