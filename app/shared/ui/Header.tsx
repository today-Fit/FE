import styled from "@emotion/styled";
import { IoMdHome } from "react-icons/io";
import { BsBrightnessHigh } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import Link from "next/link";

export default function Header() {
  return (
    <HeaderContainer>
      <h1 className="text-2xl font-bold pl-4">오늘핏</h1>
      <div className="flex gap-3 list-none text-lg pr-4">
        <List href="/">
          <IoMdHome className="w-5 h-5" />
          메인
        </List>
        <List href="/Setting">시간대 & 체질 설정</List>
        <List href="/">체감 온도별 교복 조합 가이드</List>
        <List href="/">등교 패션 팁 & 꿀팁 안내</List>
      </div>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const List = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    border-bottom: 4px solid #93c5fd;
  }
  cursor: pointer;
  margin: 8px;
  padding: 8px;
`;
