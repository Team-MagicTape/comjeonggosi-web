import { apiClient } from "@/shared/libs/custom-axios";
import { EditArticleData } from "../types/edit-article-data";

export const editArticle = async (
  articleId: number,
  editData: EditArticleData
) => {
  try {
    const { data } = await apiClient.patch(
      `/api/admin/articles/${articleId}`,
      editData
    );
    return data;
  } catch (error) {
    console.error("editArticle error", error);
    throw error;
  }
};
