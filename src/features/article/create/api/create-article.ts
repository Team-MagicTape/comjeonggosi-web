import axios from "axios";
import { CreateArticleData } from "../types/create-article-data";

export const createArticle = async (data: CreateArticleData) => {
  try {
    const res = await axios.post("/admin/articles", data);
    return res;
  } catch (error) {
    console.error("createArticle error", error);
    throw error;
  }
};