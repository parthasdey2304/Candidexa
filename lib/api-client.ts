"use client";

import { buildApiUrl, env } from "@/lib/env";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type JsonRecord = Record<string, unknown>;

type ApiClientEventMap = {
  "candidexa:auth-expired": undefined;
  "candidexa:rate-limited": { retryAfter: number };
  "candidexa:service-unavailable": undefined;
};

export class ApiError<T = unknown> extends Error {
  status: number;
  data?: T;
  code?: string;

  constructor(message: string, status: number, data?: T, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.code = code;
  }
}

export interface ApiRequestOptions
  extends Omit<RequestInit, "body" | "credentials"> {
  body?: BodyInit | JsonRecord | null;
  retryOnAuthFailure?: boolean;
  skipCsrf?: boolean;
}

const MUTATING_METHODS = new Set<HttpMethod>(["POST", "PUT", "PATCH", "DELETE"]);
const AUTH_BYPASS_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/check-email",
  "/auth/2fa/verify",
];

let csrfToken: string | null = null;
let refreshPromise: Promise<boolean> | null = null;

function dispatchApiEvent<K extends keyof ApiClientEventMap>(
  type: K,
  detail: ApiClientEventMap[K]
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(type, { detail }));
}

function isJsonResponse(response: Response) {
  return response.headers.get("content-type")?.includes("application/json");
}

function readCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[$()*+./?[\\\]^{|}-]/g, "\\$&")}=([^;]*)`)
  );

  return match ? decodeURIComponent(match[1]) : null;
}

async function parseResponseBody<T>(response: Response): Promise<T | undefined> {
  if (response.status === 204) {
    return undefined;
  }

  if (isJsonResponse(response)) {
    return (await response.json()) as T;
  }

  const text = await response.text();
  return (text || undefined) as T | undefined;
}

function extractRetryAfterSeconds(response: Response, data: unknown) {
  const headerValue = response.headers.get("Retry-After");
  const headerSeconds = headerValue ? Number(headerValue) : NaN;

  if (!Number.isNaN(headerSeconds) && headerSeconds > 0) {
    return headerSeconds;
  }

  if (typeof data === "object" && data !== null) {
    const retryAfter =
      (data as { retryAfter?: number }).retryAfter ??
      (data as { retry_after?: number }).retry_after;

    if (typeof retryAfter === "number" && retryAfter > 0) {
      return retryAfter;
    }
  }

  return 60;
}

function extractErrorMessage(status: number, data: unknown) {
  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (typeof data === "object" && data !== null) {
    const possibleMessage =
      (data as { message?: string }).message ??
      (data as { detail?: string }).detail ??
      (data as { error?: string }).error;

    if (possibleMessage) {
      return possibleMessage;
    }
  }

  return `Request failed with status ${status}`;
}

function extractErrorCode(data: unknown) {
  if (typeof data === "object" && data !== null) {
    return (
      (data as { code?: string }).code ??
      (data as { error_code?: string }).error_code
    );
  }

  return undefined;
}

async function ensureCsrfToken() {
  if (csrfToken) {
    return csrfToken;
  }

  csrfToken = readCookie("csrf_token") ?? readCookie("XSRF-TOKEN");
  if (csrfToken) {
    return csrfToken;
  }

  try {
    const response = await fetch(buildApiUrl("/auth/csrf"), {
      method: "GET",
      credentials: "include",
    });

    const headerToken = response.headers.get("X-CSRF-Token");
    const body = await parseResponseBody<{ csrfToken?: string; token?: string }>(
      response
    );

    csrfToken =
      headerToken ??
      body?.csrfToken ??
      body?.token ??
      readCookie("csrf_token") ??
      readCookie("XSRF-TOKEN");
  } catch {
    csrfToken = readCookie("csrf_token") ?? readCookie("XSRF-TOKEN");
  }

  return csrfToken;
}

async function refreshSession() {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const token = await ensureCsrfToken();
      const response = await fetch(buildApiUrl("/auth/refresh"), {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRF-Token": token ?? "",
        },
      });

      if (!response.ok) {
        return false;
      }

      const refreshedBody = await parseResponseBody<{
        csrfToken?: string;
        token?: string;
      }>(response);

      csrfToken =
        response.headers.get("X-CSRF-Token") ??
        refreshedBody?.csrfToken ??
        refreshedBody?.token ??
        csrfToken;

      return true;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function shouldBypassRefresh(path: string) {
  return AUTH_BYPASS_PATHS.some((segment) => path.startsWith(segment));
}

async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const method = (options.method?.toUpperCase() ?? "GET") as HttpMethod;
  const headers = new Headers(options.headers);
  const isMutating = MUTATING_METHODS.has(method);
  const retryOnAuthFailure = options.retryOnAuthFailure ?? true;
  const url = buildApiUrl(path);

  let body = options.body as BodyInit | null | undefined;
  if (
    body &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    typeof body === "object"
  ) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(body);
  }

  if (headers.has("Accept") === false) {
    headers.set("Accept", "application/json");
  }

  if (isMutating && !options.skipCsrf) {
    const token = await ensureCsrfToken();
    headers.set("X-CSRF-Token", token ?? "");
  }

  const response = await fetch(url, {
    ...options,
    method,
    body,
    headers,
    credentials: "include",
  });

  const data = await parseResponseBody<T | JsonRecord>(response);

  if (response.ok) {
    if (
      isMutating &&
      typeof data === "object" &&
      data !== null &&
      ("csrfToken" in data || "token" in data)
    ) {
      const tokenData = data as { csrfToken?: string; token?: string };
      csrfToken = tokenData.csrfToken ?? tokenData.token ?? csrfToken;
    }

    return data as T;
  }

  if (
    response.status === 401 &&
    retryOnAuthFailure &&
    !shouldBypassRefresh(path)
  ) {
    const refreshed = await refreshSession();

    if (refreshed) {
      return apiRequest<T>(path, {
        ...options,
        retryOnAuthFailure: false,
      });
    }

    dispatchApiEvent("candidexa:auth-expired", undefined);
  }

  if (response.status === 429) {
    dispatchApiEvent("candidexa:rate-limited", {
      retryAfter: extractRetryAfterSeconds(response, data),
    });
  }

  if (response.status === 503) {
    dispatchApiEvent("candidexa:service-unavailable", undefined);
  }

  throw new ApiError(
    extractErrorMessage(response.status, data),
    response.status,
    data,
    extractErrorCode(data)
  );
}

export const apiClient = {
  request: apiRequest,
  get<T>(path: string, options?: Omit<ApiRequestOptions, "method">) {
    return apiRequest<T>(path, { ...options, method: "GET" });
  },
  post<T>(path: string, body?: ApiRequestOptions["body"], options?: Omit<ApiRequestOptions, "body" | "method">) {
    return apiRequest<T>(path, { ...options, body, method: "POST" });
  },
  put<T>(path: string, body?: ApiRequestOptions["body"], options?: Omit<ApiRequestOptions, "body" | "method">) {
    return apiRequest<T>(path, { ...options, body, method: "PUT" });
  },
  patch<T>(path: string, body?: ApiRequestOptions["body"], options?: Omit<ApiRequestOptions, "body" | "method">) {
    return apiRequest<T>(path, { ...options, body, method: "PATCH" });
  },
  delete<T>(path: string, body?: ApiRequestOptions["body"], options?: Omit<ApiRequestOptions, "body" | "method">) {
    return apiRequest<T>(path, { ...options, body, method: "DELETE" });
  },
};

export function getOAuthRedirectUrl(provider: "google" | "github") {
  return `${env.apiBaseUrl}/auth/oauth/${provider}`;
}
