import { CreateArticleData } from "./create-article-data";
import { apiClient } from "@/shared/libs/custom-axios";

export const createArticle = async (data: CreateArticleData) => {
  try {
    const res = await apiClient.post("/admin/articles", data);
    return res;
  } catch (error) {
    console.error("createArticle error", error);
    throw error;
  }
};