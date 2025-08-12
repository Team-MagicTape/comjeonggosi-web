import { apiClient } from "@/shared/libs/custom-axios";
import { EditArticleData } from "./edit-article-data";

export const editArticle = async (articleId: number, data: EditArticleData) => {
  try {
    const res = await apiClient.patch(`/admin/articles/${articleId}`, data);
    return res;
  } catch (error) {
    console.error("editArticle error", error);
    throw error;
  }
};
