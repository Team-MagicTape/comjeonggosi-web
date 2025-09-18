import { customFetch } from "@/shared/libs/custom-fetch";
import { fetchAfterArticles } from "./get-after-articles";
import { fetchBeforeArticles } from "./get-before-articles";
import { RelatedArticles } from "../types/related-articles";
import { Article } from "../types/article";

export const linkArticles = async (
  articleId: number,
  body: RelatedArticles
): Promise<Article[]> => {
  try {
    await customFetch.post<RelatedArticles>(
      `/admin/articles/${articleId}/link`,
      body
    );
    if (body.isBefore) {
      return await fetchBeforeArticles(articleId);
    } else {
      return await fetchAfterArticles(articleId);
    }
  } catch {
    console.error("linkArticles error");
    return [];
  }
};
