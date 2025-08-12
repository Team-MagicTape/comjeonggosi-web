import { Tab } from "@/widgets/tabs/types/tab";

export const ARTICLE_CATEGORY: Tab[] = [
  { name: "전체", value: "ALL" },
  { name: "컴퓨터 구조", value: "COMPUTER_ARCHITECTURE" },
  { name: "데이터베이스", value: "DATABASE" },
  { name: "자료구조&알고리즘", value: "DATA_STRUCTURE_AND_ALGORITHM" },
  { name: "운영체제", value: "OPERATING_SYSTEM" },
  { name: "네트워크", value: "NETWORK" },
  { name: "기타", value: "OTHERS" },
] as const;
