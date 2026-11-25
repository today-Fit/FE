"use client";

import styled from "@emotion/styled";
import Header from "../../../shared/ui/Header";
import { WeatherCard, PMCard, MenualCard } from "../../../shared/ui/Card";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex gap-4 p-4">
        <WeatherCard
          title="오늘의 날씨"
          celsius="25"
          weather="맑음"
          feelsLike="28"
          humidity="60"
          rainChance="10"
        />
        <PMCard title="미세먼지" PMNum="30" PMLevel="좋음" />
        <MenualCard
          title="바로 설정하고 보기"
          body={"시간대와 체질을 설정하면 \n 맞춤형 착장을 추천해드려요!"}
          buttonText="설정하러 가기"
        />
      </div>
    </>
  );
}
