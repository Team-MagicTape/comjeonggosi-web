import { CreateArticleData } from "../types/create-article-data";
import { apiClient } from "@/shared/libs/custom-axios";

export const createArticle = async (createData: CreateArticleData) => {
  try {
    const { data } = await apiClient.post("/api/admin/articles", createData);
    return data;
  } catch (error) {
    console.error("createArticle error", error);
    throw error;
  }
};
