"use client";

import styled from "@emotion/styled";
import { SchoolTimeCard } from "@/app/shared/ui/Card";
import { Button } from "@/app/shared/ui/Button";
import { GoSun, GoMoon } from "react-icons/go";
import { IoSnow } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";
import { useState } from "react";

export default function SettingPage() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  return (
    <>
      <main className="flex flex-col px-6 py-8 gap-8">
        <nav>
          <div className="flex bg-gray-900 rounded-4xl w-full gap-4 flex-col">
            <TitleContainer className="flex px-8 pt-16 gap-4">
              <Id className="font-bold text-xl bg-gray-700 rounded-full p-2 w-10 h-10">
                01
              </Id>
              <nav>
                <Title className="font-bold text-2xl">
                  등교 시간대를 설정해주세요
                </Title>
                <Description className="text-gray-400 text-sm">
                  등교/하교 시간에 따라 체감 온도와 날씨 변화가 달라질 수
                  있어요.
                </Description>
              </nav>
            </TitleContainer>
            <SelectContainer className="flex gap-4 px-8">
              <SchoolTimeCard
                icon={<GoSun size={32} />}
                iconBg="yellow"
                title="등교 시간"
                time="(07:00 ~ 08:00)"
                body="아침에는 기온이 낮아 따뜻한 착장이 필요해요."
                isSelected={selectedTime === "등교"}
                onClick={() => setSelectedTime("등교")}
              />
              <SchoolTimeCard
                icon={<GoMoon size={32} />}
                iconBg="blue"
                title="하교 시간"
                time="(16:00 ~ 17:00)"
                body="오후에는 기온이 올라가 가벼운 옷차림이 좋아요."
                isSelected={selectedTime === "하교"}
                onClick={() => setSelectedTime("하교")}
              />
            </SelectContainer>
          </div>
        </nav>
        <nav>
          <div className="flex bg-gray-900 rounded-4xl w-full gap-4 flex-col">
            <TitleContainer className="flex px-8 pt-16 gap-4">
              <Id className="font-bold text-xl bg-gray-700 rounded-full p-2 w-10 h-10">
                02
              </Id>
              <nav>
                <Title className="font-bold text-2xl">
                  체질을 선택해주세요
                </Title>
                <Description className="text-gray-400 text-sm">
                  추위를 많이 타는지, 더위를 많이 타는지에 따라 추천되는
                  옷차림이 달라집니다.
                </Description>
              </nav>
            </TitleContainer>
            <SelectContainer className="flex gap-4 px-8">
              <SchoolTimeCard
                icon={<IoSnow size={32} />}
                iconBg="red"
                title="추위타요"
                time=""
                body="평소에 추위를 많이 느껴요. 따뜻하게 입는 걸 선호해요."
                isSelected={selectedBodyType === "추위"}
                onClick={() => setSelectedBodyType("추위")}
              />
              <SchoolTimeCard
                icon={<CiFaceSmile size={32} />}
                iconBg="green"
                title="보통"
                time=""
                body="체온이 안정적인 편이에요. 적당한 두께가 좋아요."
                isSelected={selectedBodyType === "보통"}
                onClick={() => setSelectedBodyType("보통")}
              />
              <SchoolTimeCard
                icon={<GoSun size={32} color="" />}
                iconBg="yellow"
                title="더위 타요"
                time=""
                body="평소에 더위를 많이 느껴요. 가벼운 옷차림을 선호해요."
                isSelected={selectedBodyType === "더위"}
                onClick={() => setSelectedBodyType("더위")}
              />
            </SelectContainer>
          </div>
        </nav>
        <Button name="설정 완료하고 추천받기"></Button>
      </main>
    </>
  );
}

const SelectContainer = styled.div``;
const TitleContainer = styled.div``;
const Id = styled.span``;
const Title = styled.h1``;
const Description = styled.p``;
