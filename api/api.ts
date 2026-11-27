import type {ApiResponse} from "@/types/api";

const BASE_URL = ;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | undefined>;
  auth?: boolean;
  signal?: AbortSignal;
  errors?: Partial<Record<number, string>>;
}

export async function apiRequest<T>(
  path: string,
  { method = "GET", body, query, auth = true, signal, errors }: RequestOptions = {},
): Promise<T> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) params.set(key, String(value));
  }
  const qs = params.size > 0 ? `?${params}` : "";

  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) headers["Authorization"] = `Bearer ${getToken()}`;

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}${qs}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") throw e;
    throw new ApiError(0, "서버에 연결할 수 없어요");
  }

  if (!res.ok) {
    throw new ApiError(
      res.status,
      errors?.[res.status] ?? "요청에 실패했어요. 잠시 후 다시 시도해주세요",
    );
  }

  const json: ApiResponse<T> = await res.json();
  return json.data;
}