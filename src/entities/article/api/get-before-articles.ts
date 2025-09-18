import { customFetch } from "@/shared/libs/custom-fetch";
import { Article } from "../types/article";

export const fetchBeforeArticles = async (
  articleId: number
): Promise<Article[]> => {
  try {
    const query = `
      query getArticle($id: ID!) {
        getArticle(id: $id) {
          id
          title
          content
          beforeArticles {
            id
            title
          }
        }
      }
    `;
    const params = new URLSearchParams();
    params.set("query", query);
    params.set("variables", JSON.stringify({ id: articleId }));

    const { data } = await customFetch.get<{
      data: { getArticle: { beforeArticles: Article[] } };
    }>(`/graphql?${params.toString()}`);

    return data.data.getArticle.beforeArticles ?? [];
  } catch (error) {
    console.error("fetchBeforeArticles error", error);
    return [];
  }
};
