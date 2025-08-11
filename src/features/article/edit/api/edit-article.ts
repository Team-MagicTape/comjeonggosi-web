import axios from "axios";
import { EditArticleData } from "../types/edit-article-data";

export const editArticle = async (id: string, data: EditArticleData) => {
  try {
    const res = await axios.put(`/admin/articles/${id}`, data);
    return res;
  } catch (error) {
    console.error("editArticle error", error);
    throw error;
  }
};
