import { apiClient } from "@/shared/libs/custom-axios";
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

export const fetchArticles = async (categoryId: string) => {
  try {
    const { data } = await apiClient.post<RecentArticlesResponse>(
      "/api/graphql",
      {
        query: GET_RECENT_ARTICLES,
        variables: {
          categoryId,
          limit: 10,
        },
      }
    );
    
    return data.data?.category?.recentArticles || [];
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
};