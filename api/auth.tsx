import { ApiError } from "@/api/GuideApi";
import type { SignRequest } from "@/types/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/** 회원가입 */
export async function signup(body: SignRequest): Promise<void> {
  let res: Response;

  try {
    // TODO: 명세서의 실제 경로로 수정 (/auth/signup 은 임시)
    res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // 서버가 꺼져 있거나 CORS 에 막힌 경우
    throw new ApiError(0, "서버에 연결할 수 없어요");
  }

  if (!res.ok) {
    // TODO: 명세서의 에러 코드에 맞게 수정
    if (res.status === 400) throw new ApiError(400, "입력값을 확인해주세요");
    if (res.status === 409) throw new ApiError(409, "이미 사용 중인 아이디예요");
    throw new ApiError(res.status, "회원가입에 실패했어요. 잠시 후 다시 시도해주세요");
  }
}
