import { useAuthStore } from "@/stores/auth-store";
import type { ApiError } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

class ApiClientError extends Error {
  status: number;
  detail: string;

  constructor(status: number, detail: string) {
    super(detail);
    this.name = "ApiClientError";
    this.status = status;
    this.detail = detail;
  }
}

function getAuthHeaders(): Record<string, string> {
  const token = useAuthStore.getState().accessToken;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
    ...getAuthHeaders(),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = headers["Content-Type"] ?? "application/json";
  }

  const response = await fetch("http://54.206.94.56:8000/api/v1/location", {
    method: "POST",
    ...options,
    headers,
  });

  if (!response.ok) {
    let detail = `Request failed with status ${response.status}`;

    try {
      const body = (await response.json()) as ApiError;
      detail = body.detail ?? detail;
    } catch {
      // use default detail
    }

    if (response.status === 401) {
      useAuthStore.getState().clearAuth();
    }

    throw new ApiClientError(response.status, detail);
  }

  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string): Promise<T> =>
    request<T>(path, { method: "GET" }),

  post: <T>(path: string, body: unknown): Promise<T> =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  postForm: <T>(path: string, formData: URLSearchParams): Promise<T> =>
    request<T>(path, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    }),

  delete: <T>(path: string, params?: Record<string, string>): Promise<T> => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<T>(path + qs, { method: "DELETE" });
  },
};

export { ApiClientError };
