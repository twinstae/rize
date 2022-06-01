export const MEMBER_LIST = [
  "권은비",
  "미야와키 사쿠라",
  "강혜원",
  "최예나",
  "이채연",
  "김채원",
  "김민주",
  "야부키 나코",
  "혼다 히토미",
  "조유리",
  "안유진",
  "장원영",
] as const;

export type IZONE = typeof MEMBER_LIST[number]

export const nameToNumberDict: Record<string, number> = {
  장원영: 0,
  "チャン・ウォニョン": 0,
  "미야와키 사쿠라": 1,
  "宮脇咲 良": 1,
  宮脇咲良: 1,
  조유리: 2,
  "チョ・ユリ": 2,
  최예나: 3,
  "チェ・イェナ": 3,
  안유진: 4,
  "アン・ユジン": 4,
  "야부키 나코": 5,
  矢吹奈子: 5,
  권은비: 6,
  "クォン・ウンビ": 6,
  강혜원: 7,
  "カン・へウォン": 7,
  "혼다 히토미": 8,
  本田仁美: 8,
  김채원: 9,
  "キム・チェウォン": 9,
  김민주: 10,
  "キム・ミンジュ": 10,
  이채연: 11,
  "イ・チェヨン": 11,
  운영팀: 12,
};

export const memberNameDict: Record<number, IZONE | "운영팀"> = {
  0: "장원영",
  1: "미야와키 사쿠라",
  2: "조유리",
  3: "최예나",
  4: "안유진",
  5: "야부키 나코",
  6: "권은비",
  7: "강혜원",
  8: "혼다 히토미",
  9: "김채원",
  10: "김민주",
  11: "이채연",
  12: "운영팀",
};

export const toOriginalName = (raw: string) =>
  memberNameDict[nameToNumberDict[raw]];


export const modes = ["all", "unread", "favorite"] as const
export type TabMode = typeof modes[number]