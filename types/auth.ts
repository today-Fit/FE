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