import { apiClient } from "@/shared/libs/custom-axios";

export const deleteArticle = async (articleId: string) => {
  try {
    const { data } = await apiClient.delete(`/api/admin/articles/${articleId}`);
    return data;
  } catch (error) {
    console.error("deleteArticle error", error);
    throw error;
  }
};
