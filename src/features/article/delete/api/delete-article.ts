import { apiClient } from "@/shared/libs/custom-axios";

export const deleteArticle = async (articleId: number) => {
  try {
    const res = await apiClient.delete(`/admin/articles/${articleId}`);
    return res;
  } catch (error) {
    console.error("deleteArticle error", error);
    throw error;
  }
};