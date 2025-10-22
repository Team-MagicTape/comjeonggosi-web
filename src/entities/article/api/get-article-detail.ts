import { customFetch } from "@/shared/libs/custom-fetch";
import { Article } from "../types/article";

// NOTE: GraphQL 스키마에 개별 Article 쿼리가 없음
// 필요시 category.recentArticles를 통해 가져오거나
// GraphQL 스키마에 article(id: ID!) 쿼리 추가 필요
export const getArticleDetail = async (
  id: string
): Promise<Article | undefined> => {
  try {
    const { data } = await customFetch.get<Article>(`/articles/${id}`);
    return data;
  } catch (error) {
    console.error("fetch getArticleDetail error", error);
  }
};

