import axios from "axios";
import { EditArticleData } from "../types/edit-article-data";

export const editArticle = async (articleId: number, data: EditArticleData) => {
  try {
    const res = await axios.patch(`/admin/articles/${articleId}`, data);
    return res;
  } catch (error) {
    console.error("editArticle error", error);
    throw error;
  }
};
