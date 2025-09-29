import { apiClient } from "@/shared/libs/custom-axios";
import { Article } from "../types/article";

export const fetchArticle = async (categoryId: string) => {
  try {
    const { data } = await apiClient.get<Article[]>(
      `/api/articles?categoryId=${categoryId}`
    );
    return data;
  } catch {
    return [];
  }
};