import { customFetch } from "@/shared/libs/custom-fetch";
import { GET_RECENT_ARTICLES } from "@/shared/libs/graphql-queries";
import { Article } from "../types/article";

interface RecentArticlesResponse {
  data: {
    category: {
      id: string;
      recentArticles: Article[];
    };
  };
}

export const fetchInitialArticles = async (categoryId: string) => {
  try {
    const { data } = await customFetch.post<RecentArticlesResponse>("/graphql", {
      query: GET_RECENT_ARTICLES,
      variables: {
        categoryId,
        limit: 10,
      },
    });
    
    return data?.data?.category?.recentArticles || [];
  } catch (error) {
    console.error("Failed to fetch initial articles:", error);
    return [];
  }
};
