const fakeStoreApiUrl =
  process.env.NEXT_PUBLIC_FAKE_STORE_API_URL ?? "https://fakestoreapi.com";

export const env = {
  fakeStoreApiUrl,
  isDev: process.env.NODE_ENV === "development",
} as const;
