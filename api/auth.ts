import { apiRequest } from "@/api/api";
import type { LoginRequest, SignRequest, TokenResponse } from "@/types/auth";

export function saveTokens({ access_token, refresh_token }: TokenResponse) {
  localStorage.setItem("accessToken", access_token);
  localStorage.setItem("refreshToken", refresh_token);
}

export async function signup(body: SignRequest): Promise<void> {
  // TODO: 명세서의 실제 경로로 수정 (/auth/signup 은 임시)
  const tokens = await apiRequest<TokenResponse>("/auth/signup", {
    method: "POST",
    body,
    auth: false,
    errors: {
      400: "입력값을 확인해주세요",
      409: "이미 사용 중인 이름이에요",
    },
  });
  saveTokens(tokens);
}

export async function login(body: LoginRequest): Promise<void> {
  // TODO: 명세서의 실제 경로로 수정 (/auth/login 은 임시)
  const tokens = await apiRequest<TokenResponse>("/auth/login", {
    method: "POST",
    body,
    auth: false,
    errors: {
      400: "입력값을 확인해주세요",
      401: "이름 또는 비밀번호가 올바르지 않아요",
    },
  });
  saveTokens(tokens);
}