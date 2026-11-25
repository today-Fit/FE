export const RANGES = [
  {
    key: "under5",
    label: "5°C 미만",
    start: -50,
    end: 5,
    weatherLable: "추운 겨울 날씨",
    badge: "< 5°C",
  },
  {
    key: "5to9",
    lable: "5 ~ 9°C",
    start: 5,
    end: 10,
    weatherLabel: "쌀쌀한 날씨",
    badge: "5 ~ 9°C",
  },
  {
    key: "10to14",
    lable: "10 ~ 14°C",
    start: 10,
    end: 15,
    weatherLable: "선선한 날씨",
    badge: "10 ~ 14°C",
  },
  {
    key: "15to19",
    label: "15 ~ 20°C",
    start: 15,
    end: 21,
    weatherLable: "포근한 날씨",
    badge: "15 ~ 20°C",
  },
  {
    key: "over20",
    lable: "20°C 이상",
    start: 20,
    end: undefined,
    weatherLable: "따뜻한 날씨",
    badge: "20°C 이상",
  },
] as const;

export type Range = (typeof RANGES)[number];
export type RangeKey = Range["key"];
