import axios from "axios";
import { WriteArticleData } from "../types/write-article-data";

export const writeArticle = async (data: WriteArticleData) => {
  try {
    const res = await axios.post("/admin/articles", data);
    return res;
  } catch (error) {
    console.error("writeArticle error", error);
    throw error;
  }
};