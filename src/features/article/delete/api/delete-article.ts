import axios from "axios";

export const deleteArticle = async (articleId: number) => {
  try {
    const res = await axios.delete(`/admin/categories/${articleId}`);
    return res;
  } catch (error) {
    console.error("deleteArticle error", error);
    throw error;
  }
};