import { customFetch } from "@/shared/libs/custom-fetch";
import { Article } from "../types/article";

export const fetchArticles = async (categoryId: number): Promise<Article[] | undefined> => {
   try {
    const data = await customFetch.get<Article[]>(`/admin/articles?categoryId=${categoryId}`);
    return data;
  } catch (error) {
    console.error("fetchArticles error", error);
  }
};
