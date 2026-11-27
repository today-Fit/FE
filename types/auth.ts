export interface SignRequest{
  name: string;
  password: string;
}

export interface LoginRequest{
  name: string;
  password: string;
}

export interface ReissueRequest{
  refresh_token: string;
}

export interface TokenResponse{
  access_token: string;
  refresh_token: string;
}