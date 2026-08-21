const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const getDefaultApiBaseUrl = () => {
  // Use proxy in development to avoid CORS when backend is on Railway
  if (process.env.NEXT_PUBLIC_USE_PROXY === "true") return "/api/proxy";
  // Local backend fallback for development
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    // Prefer local backend if available, fallback to Railway (handled gracefully in api-client)
    return process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://candidexa-backend.up.railway.app/api/v1";
  }
  return "https://candidexa-backend.up.railway.app/api/v1";
};

export const env = {
  apiBaseUrl: trimTrailingSlash(
    process.env.NEXT_PUBLIC_API_BASE_URL ?? getDefaultApiBaseUrl()
  ),
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Candidexa",
  appUrl: trimTrailingSlash(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://candidexa.app"
  ),
};

export function buildApiUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${env.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
