// 착장 추천
export interface Recommendation {
  name: string;
  featuer: string;
  image_url: string;
}

//가이드 API의 data 부분
export interface GuideData {
  tip_message: string;
  recommendations: Recommendation[];
}

// 백엔드 공통 응답 형태
interface ApiResponse<T> {
  success: boolean;
  data: T;
}
