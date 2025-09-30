import { Article } from "../types/article";
import axios from "axios";

export const fetchAfterArticles = async (
  articleId: number
): Promise<Article[]> => {
  try {
    const query = `
			query getArticle($id: ID!) {
        getArticle(id: $id) {
          id
          title
          content
          afterArticles {
            id
            title
          }
        }
      }
		`;

    const params = new URLSearchParams();
    params.set("query", query);
    params.set("variables", JSON.stringify({ id: articleId }));

    const { data } = await axios.get<{
      data: { getArticle: { afterArticles: Article[] } };
    }>(`/graphql?${params.toString()}`);

    return data.data.getArticle.afterArticles ?? [];
  } catch (error) {
    console.error("fetchAfterArticles error", error);
    return [];
  }
};
