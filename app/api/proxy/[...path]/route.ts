import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "https://candidexa-backend.up.railway.app/api/v1";
const RAILWAY_URL = "https://candidexa-backend.up.railway.app/api/v1";

function getTargetUrl(path: string[], search: string) {
  const backend = BACKEND_URL.includes("localhost") ? BACKEND_URL : RAILWAY_URL;
  const joined = path.join("/");
  return `${backend}/${joined}${search}`;
}

async function proxy(request: NextRequest, path: string[]) {
  const search = request.nextUrl.search;
  const targetUrl = getTargetUrl(path, search);

  try {
    const headers = new Headers();
    // Forward relevant headers
    const contentType = request.headers.get("content-type");
    if (contentType) headers.set("content-type", contentType);
    const csrf = request.headers.get("x-csrf-token");
    if (csrf) headers.set("x-csrf-token", csrf);
    const auth = request.headers.get("authorization");
    if (auth) headers.set("authorization", auth);

    const body = request.method !== "GET" && request.method !== "HEAD" ? await request.text() : undefined;

    const res = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      // @ts-ignore - Next.js fetch with credentials
      credentials: "include",
    });

    const contentTypeRes = res.headers.get("content-type") || "application/json";
    const data = await res.text();

    // If backend is down and returns HTML (Railway Not Found page), convert to JSON 503 instead of 500
    if (!contentTypeRes.includes("application/json") && res.status >= 400) {
      return NextResponse.json(
        { message: "Backend temporarily unavailable", detail: "Service is starting up, please try again in a moment." },
        { status: 503 }
      );
    }

    return new NextResponse(data, {
      status: res.status,
      headers: { "content-type": contentTypeRes },
    });
  } catch (error) {
    // Network error to Railway (backend sleeping) - return 503 instead of 500 to avoid Internal Server Error spam
    console.debug("[Proxy] Backend unavailable:", targetUrl, error);
    return NextResponse.json(
      { message: "Backend unavailable", detail: "Could not reach backend, please try again." },
      { status: 503 }
    );
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxy(request, path);
}
export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxy(request, path);
}
export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxy(request, path);
}
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxy(request, path);
}
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxy(request, path);
}
