import { apiClient } from "@/shared/libs/custom-axios";
import { Article } from "../types/article";

export const fetchArticles = async (categoryId: string) => {
  try {
    const { data } = await apiClient.get<Article[]>(
      `/articles?categoryId=${categoryId}`
    );
    return data;
  } catch {
    return [];
  }
};