"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { RANGES, type Range } from "@/constants/guide";
import { ApiError, fetchGuide } from "@/api/guide";
import type { GuideData } from "@/types/guide";

export default function Guide() {
  const router = useRouter();
  const [range, setRange] = useState<Range>(RANGES[0]);
  const [data, setData] = useState<GuideData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchGuide(range, controller.signal)
      .then(setData)
      .catch((e) => {
        if (e.name === "AbortError") return;
        if (e instanceof ApiError && e.status === 401)
          return router.push("/login");
        // 409: 유저 설정 전 → 설정 페이지로 (경로는 임시)
        if (e instanceof ApiError && e.status === 409)
          return router.push("/setting");
        setError(e.message);
      })
      .finally(() => setLoading(false));

    // 탭을 빠르게 바꿀 때 이전 요청이 덮어쓰지 않도록 취소
    return () => controller.abort();
  }, [range, router]);

  const ready = data && !loading;

  return (
    <Page>
      <Main>
        <PageTitle>체감 온도별 교복 착장 가이드</PageTitle>

        {/* 온도 탭 */}
        <TabWrap>
          <Tabs>
            {RANGES.map((r) => (
              <Tab
                key={r.key}
                type="button"
                active={r.key === range.key}
                onClick={() => setRange(r)}
              >
                {r.label}
              </Tab>
            ))}
          </Tabs>
        </TabWrap>

        {/* 패널 */}
        <Panel>
          <PanelTop>
            <PanelLeft>
              <SnowBox>
                <SnowIcon />
              </SnowBox>
              <div>
                <Meta>
                  <span>{range.weatherLabel}</span>
                  <Dot>•</Dot>
                  <Badge>{range.badge}</Badge>
                </Meta>
                <PanelTitle>{range.title}</PanelTitle>
              </div>
            </PanelLeft>

            {ready && (
              <TipBox>
                <BulbIcon />
                <p>{data.tip_message}</p>
              </TipBox>
            )}
          </PanelTop>

          <Divider />

          <ListTitle>
            <ShirtIcon />
            추천 교복 아이템 {ready && `(${data.recommendations.length}종)`}
          </ListTitle>

          {loading && <Message>불러오는 중...</Message>}
          {error && <Message>{error}</Message>}

          {ready && (
            <Grid>
              {data.recommendations.map((item, i) => (
                <ItemCard key={item.name}>
                  <No>{String(i + 1).padStart(2, "0")}</No>
                  <ImageBox>
                    <ItemImage src={item.image_url} alt={item.name} />
                  </ImageBox>
                  <ItemTitle>{item.name}</ItemTitle>
                  <ItemDesc>{item.feature}</ItemDesc>
                </ItemCard>
              ))}
            </Grid>
          )}

          <PanelFooter>
            <FooterInfo>
              <InfoIcon />
              실시간 서울 14°C 기준 맞춤 팁 적용 중
            </FooterInfo>
            <FooterLink type="button">
              체질 맞춤 변경 <span>›</span>
            </FooterLink>
          </PanelFooter>
        </Panel>
      </Main>
    </Page>
  );
}

/* ------------------------------ 스타일 ------------------------------ */

const colors = {
  bg: "#0b1020",
  panel: "#121a2c",
  card: "#16203a",
  cardInner: "#0e1526",
  border: "rgba(255, 255, 255, 0.07)",
  text: "#ffffff",
  textMuted: "#9ca3af",
  textDim: "#6b7685",
  primary: "#2563eb",
  link: "#4f9cf9",
  badgeBg: "rgba(59, 130, 246, 0.18)",
};

const Page = styled.div`
  min-height: 100vh;
  background: ${colors.bg};
  color: ${colors.text};
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
`;

const Main = styled.main`
  padding-top: 40px;
`;

const PageTitle = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const TabWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 28px 0 36px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  padding: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${colors.border};
`;

const Tab = styled.button<{ active?: boolean }>`
  height: 38px;
  padding: 0 22px;
  border-radius: 999px;
  border: 1px solid ${({ active }) => (active ? "transparent" : colors.border)};
  background: ${({ active }) => (active ? colors.primary : "transparent")};
  color: ${({ active }) => (active ? "#fff" : colors.textMuted)};
  font-size: 14px;
  font-weight: ${({ active }) => (active ? 700 : 500)};
  cursor: pointer;
`;

const Panel = styled.section`
  padding: 40px 30px 24px;
  border-radius: 32px 32px 0 0;
  background: ${colors.panel};
  border: 1px solid ${colors.border};
  border-bottom: none;
`;

const PanelTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

const PanelLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const SnowBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  color: ${colors.link};
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${colors.textMuted};
`;

const Dot = styled.span`
  font-size: 8px;
  color: ${colors.textDim};
`;

const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 6px;
  background: ${colors.badgeBg};
  color: ${colors.link};
  font-size: 13px;
  font-weight: 600;
`;

const PanelTitle = styled.h2`
  margin: 6px 0 0;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const TipBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 640px;
  padding: 18px 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${colors.border};
  color: ${colors.textMuted};

  svg {
    flex-shrink: 0;
    color: #facc15;
  }
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #e5e7eb;
  }
`;

const Divider = styled.hr`
  margin: 32px 0 24px;
  border: none;
  border-top: 1px solid ${colors.border};
`;

const ListTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 20px;
  font-size: 15px;
  font-weight: 600;
  color: #d1d5db;

  svg {
    color: ${colors.link};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;

const ItemCard = styled.article`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 24px;
  border-radius: 24px;
  background: ${colors.card};
  border: 1px solid ${colors.border};
`;

const No = styled.span`
  align-self: flex-start;
  margin-bottom: 14px;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  color: ${colors.textMuted};
  font-size: 12px;
  font-weight: 600;
`;

const ImageBox = styled.div`
  padding: 8px;
  border-radius: 18px;
  background: ${colors.cardInner};
`;

const ItemImage = styled.img`
  display: block;
  width: 100%;
  height: 176px;
  border-radius: 12px;
  object-fit: cover;
`;

const ItemTitle = styled.h4`
  margin: 22px 0 6px;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
`;

const ItemDesc = styled.p`
  margin: 0;
  text-align: center;
  font-size: 13px;
  color: ${colors.link};
`;

const Message = styled.p`
  margin: 40px 0;
  text-align: center;
  font-size: 14px;
  color: ${colors.textMuted};
`;

const PanelFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid ${colors.border};
  font-size: 13px;
`;

const FooterInfo = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${colors.textDim};
`;

const FooterLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: none;
  background: transparent;
  color: #e5e7eb;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

/* ------------------------------ 아이콘 ------------------------------ */

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SnowIcon = () => (
  <svg {...base} width={26} height={26}>
    <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7" />
    <path d="m9 3.5 3 2 3-2M9 20.5l3-2 3 2" />
  </svg>
);

const BulbIcon = () => (
  <svg {...base}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
  </svg>
);

const ShirtIcon = () => (
  <svg {...base} width={18} height={18}>
    <path d="M8 3 3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z" />
  </svg>
);

const InfoIcon = () => (
  <svg {...base} width={16} height={16}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);
