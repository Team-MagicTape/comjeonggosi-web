import { customFetch } from "@/shared/libs/custom-fetch";
import { Category } from "../types/category";

export const fetchCategory = async (): Promise<Category[]> => {
  try {
    // 서버 호출 대신 더미 데이터 반환
    return [
      { id: 1, name: "프론트엔드", description: "프론트엔드 개발 관련 내용" },
      { id: 2, name: "React", description: "React 생태계 관련 글" },
      { id: 3, name: "TypeScript", description: "타입스크립트 사용법과 팁" },
      { id: 4, name: "백엔드", description: "백엔드 개발 관련 내용" },
      { id: 5, name: "Node.js", description: "Node.js 생태계 관련 글" },
      { id: 6, name: "데이터베이스", description: "데이터베이스 관련 내용" },
    ];
    // const data = await customFetch.get<Category[]>(`/admin/categories);
    // return data;
  } catch (error) {
    console.error("fetchCategory error", error);
    return [];
  }
};
