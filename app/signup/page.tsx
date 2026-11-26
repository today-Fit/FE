"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { useState } from "react";
import {useRouter} from "next/router";
import {signup} from "@/api/auth"

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    if(!name.trim()) return setError("아이디를 입력해주세요.");
    if(!password.trim()) return setError("비밀번호를 입력해주세요.");

    setLoading(true);
    setError(null);

    try {
      await signup({name: name.trim(), password});
      router.push("/login");
    } catch(e) {
      setError(e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Page>
      <Card>
        <Title>회원가입</Title>

        <Form onSubmit={handleSubmit}>
          <InputWrap>
            <IconBox>
              <UserIcon src="/assets/user.svg" alt="유저" />
            </IconBox>
            <Input type="text" placeholder="아이디를 입력하세요" autoComplete="username" value={name} onChange={e => setName(e.target.value)} />
          </InputWrap>

          <InputWrap>
            <IconBox>
              <LockIcon src="/assets/lock.svg" alt="비밀번호" />
            </IconBox>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              autoComplete="new-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <EyeButton
              type="button"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeIcon src="/assets/eye.svg" alt="" />
              ) : (
                <EyeOffIcon src="/assets/eye-off.svg" alt="" />
              )}
            </EyeButton>
          </InputWrap>

          {error && <EorrorText role="alert">{error}</EorrorText>}
          <SubmitButton type="submit" disabled={loading}>{loading? "가입 중" : "회원가입"}</SubmitButton>
        </Form>

        <Footer>
          <span>이미 계정이 있으신가요?</span>
          <TextLink href="/login">
            로그인하기
            <Chevron src="/assets/chevron-right.svg" alt="" />
          </TextLink>
        </Footer>
      </Card>
    </Page>
  );
}

const colors = {
  bg: "#0b0f1a",
  cardTop: "#141c2d",
  cardBottom: "#101624",
  cardBorder: "rgba(255, 255, 255, 0.08)",
  field: "#1a2233",
  fieldBorder: "rgba(255, 255, 255, 0.06)",
  text: "#ffffff",
  textMuted: "#9ca3af",
  placeholder: "#6b7280",
  primary: "#3b82f6",
  link: "#4f9cf9",
  error: "#f97171",
};

const EorrorText = styled.p`
    margin: 0;
    padding: 0 8px; 
    color: ${colors.error};
    font-size: 13px;
`

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: radial-gradient(circle at 50% 0%, #131a2b 0%, ${colors.bg} 60%);
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
`;

const Card = styled.section`
  width: 100%;
  max-width: 488px;
  padding: 48px 40px 36px;
  border-radius: 28px;
  background: linear-gradient(
    180deg,
    ${colors.cardTop} 0%,
    ${colors.cardBottom} 100%
  );
  border: 1px solid ${colors.cardBorder};
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  color: ${colors.text};
`;

const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  padding: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 20px;
  border-radius: 999px;
  background: ${colors.field};
  border: 1px solid ${colors.fieldBorder};
`;

const IconBox = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 12px;
`;

const Input = styled.input`
  flex: 1;
  width: 0;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: ${colors.text};
  font-size: 15px;

  &::placeholder {
    color: ${colors.placeholder};
  }
`;

const UserIcon = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

const LockIcon = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

const EyeIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

const EyeOffIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

const Chevron = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

const EyeButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  height: 60px;
  margin-top: 8px;
  border: none;
  border-radius: 999px;
  background: ${colors.primary};
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
  font-size: 14px;
  color: ${colors.textMuted};
`;

const TextLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: ${colors.link};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
`;
