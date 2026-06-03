export const siteConfig = {
  name: "LuxeThread",
  description:
    "Fashion e-commerce portfolio — frontend showcase with API integration.",
  /** Fake Store categories mapped for fashion-focused catalog */
  fashionCategories: ["men's clothing", "women's clothing", "jewelery"] as const,
  defaultLocale: "en" as const,
  locales: ["en", "id"] as const,
} as const;
