const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const env = {
  apiBaseUrl: trimTrailingSlash(
    process.env.NEXT_PUBLIC_USE_PROXY === "true"
      ? "/api/proxy"
      : (process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://candidexa-backend.onrender.com/api/v1")
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
