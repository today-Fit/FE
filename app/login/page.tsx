"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Page>
      <Card>
        <Title>로그인</Title>

        <Form onSubmit={(e) => e.preventDefault()}>
          <InputWrap>
            <IconBox>
              <UserIcon src="/assets/user.svg" alt="유저" />
            </IconBox>
            <Input type="text" placeholder="아이디를 입력하세요" />
          </InputWrap>
          <InputWrap>
            <IconBox>
              <LockIcon src="/assets/lock.svg" alt="비밀번호" />
            </IconBox>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
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

          <OptionRow>
            <CheckLabel>
              <Checkbox type="checkbox" />
              <div>로그인 상태 유지</div>
            </CheckLabel>
          </OptionRow>

          <SubmitButton type="submit">로그인</SubmitButton>
        </Form>

        <Footer>
          <div>아직 회원이 아니신가요?</div>

          <TextLink href="/signup">
            회원가입하기
            <Chevron src="/assets/chevron-right.svg" alt="오른쪽 화살표" />
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
};

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
  padding: 56px 40px 40px;
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
  padding: 30px;
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

const OptionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 4px 8px;
  font-size: 14px;
`;

const CheckLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #d1d5db;
  cursor: pointer;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  margin: 0;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;

  &:checked {
    background: ${colors.primary};
    box-shadow: inset 0 0 0 2px #fff;
  }
`;

const SubmitButton = styled.button`
  height: 60px;
  border: none;
  border-radius: 999px;
  background: ${colors.primary};
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
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

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
  font-size: 14px;
  color: ${colors.textMuted};
`;
