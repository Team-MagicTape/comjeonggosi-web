import { customFetch } from "@/shared/libs/custom-fetch";
import { Article } from "../types/article";

export const fetchInitialArticles = async (categoryId: string) => {
  try {
    const { data } = await customFetch.get<Article[]>(`/articles?categoryId=${categoryId}`);
    return data;
  } catch {
    return [];
  }
};
