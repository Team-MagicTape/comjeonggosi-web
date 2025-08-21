import { customFetch } from "@/shared/libs/custom-fetch";
import { Article } from "../types/article";

export const getArticleDetail = async (
  id: number = 1
): Promise<Article | undefined> => {
  try {
    const { data } = await customFetch.get<Article>(`/admin/articles/${id}`);
    return data;
  } catch (error) {
    console.error("fetch getArticleDetail error", error);
  }
};

