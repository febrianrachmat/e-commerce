import { env } from "@/config/env";
import { ApiError } from "@/lib/api/client";
import type { AuthToken } from "@/types/auth";
import type { LoginCredentials } from "@/types/auth";

export async function login(credentials: LoginCredentials) {
  const response = await fetch(`${env.fakeStoreApiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new ApiError("Invalid credentials", response.status);
  }

  const token = (await response.json()) as AuthToken;
  return token;
}
