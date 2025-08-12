import { CreateCategoryData } from "../types/create-category-data";
import axios from "axios";

export const createCategory = async (data: CreateCategoryData) => {
  try {
    const res = await axios.post("/admin/categories", data);
    return res;
  } catch (error) {
    console.error("createCategory error", error);
    throw error;
  }
};
