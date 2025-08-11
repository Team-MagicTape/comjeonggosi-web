import { customFetch } from "@/shared/libs/custom-fetch";
import { Article } from "../types/article";

export const fetchArticles = async (categoryId: number): Promise<Article[] | undefined> => {
   try {
    return [
      {
        id: 1,
        title: "프론트엔드 개발의 기초",
        content: "프론트엔드 개발에 대한 기초 지식과 기술을 소개합니다.",
        category: {
          id: 1,
          name: "프론트엔드",
          description: "프론트엔드 개발 관련 내용"
        }
      },
      {
        id: 2,
        title: "React로 웹 앱 만들기",
        content: "React를 사용하여 웹 애플리케이션을 만드는 방법을 설명합니다.",
        category: {
          id: 2,
          name: "React",
          description: "React 생태계 관련 글"
        }
      }
    ];
    // const data = await customFetch.get<Article[]>(`/admin/articles?categoryId=${categoryId}`);
    // return data;
  } catch (error) {
    console.error("fetchArticles error", error);
  }
};
