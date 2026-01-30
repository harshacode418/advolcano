export class ApiError<T = unknown> extends Error {
  status?: number;
  payload?: T;

  constructor(message: string, status?: number, payload?: T) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

const normalizeBaseUrl = () => {
  const raw = import.meta.env.VITE_API_BASE_URL;
  if (!raw) return "/api";
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
};

const API_BASE_URL = normalizeBaseUrl();

const buildUrl = (endpoint: string) => {
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  return `${API_BASE_URL}${normalizedEndpoint}`;
};

export async function postJson<TResponse, TPayload>(
  endpoint: string,
  payload: TPayload,
  init?: RequestInit
): Promise<TResponse> {
  const response = await fetch(buildUrl(endpoint), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    body: JSON.stringify(payload),
    ...init,
  });

  const isJson =
    response.headers.get("content-type")?.includes("application/json");

  const body = isJson ? await response.json() : null;

  if (!response.ok) {
    const message =
      (body && typeof body === "object" && "message" in body
        ? (body as { message: string }).message
        : response.statusText) || "Request failed";
    throw new ApiError(message, response.status, body ?? undefined);
  }

  return (body ?? {}) as TResponse;
}

