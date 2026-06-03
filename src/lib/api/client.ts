import { env } from "@/config/env";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = RequestInit & {
  params?: Record<string, string | number | undefined>;
};

function buildUrl(path: string, params?: RequestOptions["params"]) {
  const url = new URL(path, env.fakeStoreApiUrl);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

const DEFAULT_RETRIES = 3;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function apiClient<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, headers, ...init } = options;
  const url = buildUrl(path, params);
  let lastError: unknown;

  for (let attempt = 0; attempt < DEFAULT_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...headers,
        },
        next: { revalidate: 300, ...init.next },
      });

      if (!response.ok) {
        let body: unknown;
        try {
          body = await response.json();
        } catch {
          body = undefined;
        }
        throw new ApiError(
          `API request failed: ${response.status} ${response.statusText}`,
          response.status,
          body,
        );
      }

      return response.json() as Promise<T>;
    } catch (error) {
      lastError = error;
      if (attempt < DEFAULT_RETRIES - 1) {
        await sleep(250 * 2 ** attempt);
      }
    }
  }

  throw lastError;
}
