import { customFetch } from "@/shared/libs/custom-fetch";
import { Article } from "../types/article";

export const fetchInitialArticles = async () => {
  try {
    const { data } = await customFetch.get<Article[]>(`/articles`);
    return data;
  } catch {
    return [];
  }
};
