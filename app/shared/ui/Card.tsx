import styled from "@emotion/styled";
import { ReactNode } from "react";
import Link from "next/link";

type CardWeatherProps = {
  title: string;
  celsius: string;
  weather: string;
  feelsLike: string;
  humidity: string;
  rainChance: string;
};
export function WeatherCard({
  title,
  celsius,
  weather,
  feelsLike,
  humidity,
  rainChance,
}: CardWeatherProps) {
  return (
    <>
      <CardContainer className="flex flex-col gap-2 border border-gray-300 rounded-lg px-8 py-4 flex-3">
        <Title>{title}</Title>
        <h1 className="text-8xl font-bold">{celsius}°</h1>
        <h2 className="text-2xl font-semibold">{weather}</h2>
        <div className="flex gap-3 list-none text-sm">
          <li>
            체감 <span className="font-bold">{feelsLike}°</span>
          </li>
          <li>
            습도 <span className="font-bold">{humidity}%</span>
          </li>
          <li>
            강수확률 <span className="font-bold">{rainChance}%</span>
          </li>
        </div>
      </CardContainer>
    </>
  );
}

type PMCardProps = {
  title: string;
  PMNum: string;
  PMLevel: string;
};
export function PMCard({ title, PMNum, PMLevel }: PMCardProps) {
  let color = "";
  if (PMLevel === "좋음") {
    color = "bg-green-500";
  } else if (PMLevel === "보통") {
    color = "bg-yellow-500";
  } else if (PMLevel === "나쁨") {
    color = "bg-orange-500";
  } else if (PMLevel === "매우나쁨") {
    color = "bg-red-500";
  }
  return (
    <>
      <CardContainer className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 flex-1">
        <Title>{title}</Title>
        <h1 className="text-lg font-bold">{PMNum}𝜇g/m3</h1>

        <div className="relative w-full pt-5 pb-2">
          <div
            style={{ left: "50%" }}
            className="absolute top-[-20px] -translate-x-1/2 transition-all duration-300 ease-out items-center flex flex-col gap-1"
          >
            <h2 className={`border-none ${color} text-white px-2 rounded-2xl`}>
              {PMLevel}
            </h2>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] " />
          </div>
          <div
            className="absolute top-10 -translate-x-1/2 transition-all duration-300 ease-out"
            style={{ left: `${PMNum}%` }}
          >
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px]" />
          </div>
          <div className="w-full h-2.5 rounded-full bg-linear-to-r from-green-300 via-yellow-300 to-red-300 pointer-events-none" />
        </div>
      </CardContainer>
    </>
  );
}

type MenualCardProps = {
  title: string;
  body: string;
  buttonText: string;
};
export function MenualCard({
  title,
  body,
  buttonText,
}: MenualCardProps & { body: string; buttonText: string }) {
  return (
    <>
      <CardContainer className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 flex-1">
        <Title>{title}</Title>
        <p>{body}</p>
        <button className="bg-black text-white py-2 px-4 rounded-2xl hover:bg-blue-600">
          <Link href="/Setting">{buttonText}</Link>
        </button>
      </CardContainer>
    </>
  );
}

type SchoolTimeCardProps = {
  icon: ReactNode;
  title: string;
  time: string;
  body: string;
  iconBg: string;
  isSelected: boolean;
  onClick: () => void;
};
export function SchoolTimeCard({
  title,
  time,
  body,
  icon,
  iconBg,
  isSelected,
  onClick,
}: SchoolTimeCardProps) {
  return (
    <>
      <CardContainer
        onClick={onClick}
        className={`flex flex-col gap-1 rounded-2xl p-4 flex-1 justify-center items-center bg-gray-800 mb-8 cursor-pointer transition-all duration-200
    ${
      isSelected
        ? "border shadow-lg shadow-white-500/20 -translate-y-2"
        : "hover:bg-gray-500 hover:shadow-gray-200 hover:-translate-y-2 hover:shadow-lg"
    }`}
      >
        <span className={`p-2 rounded-2xl bg-${iconBg}-500`}>{icon}</span>
        <h1 className="text-xl font-bold">{title}</h1>
        <span className=" text-gray-400">{time}</span>
        <p className="text-sm text-gray-400">{body}</p>
      </CardContainer>
    </>
  );
}

const CardContainer = styled.div``;
const Title = styled.div``;
