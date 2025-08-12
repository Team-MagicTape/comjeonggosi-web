import { customFetch } from "@/shared/libs/custom-fetch";
import { Article } from "../types/article";

export const ArticleDetail = async (
  id: number
): Promise<Article | undefined> => {
  try {
    const { data } = await customFetch.get<Article>(`/admin/articles/${id}`);
    return data;
  } catch (error) {
    console.error("fetchArticleDetail error", error);
  }
};
