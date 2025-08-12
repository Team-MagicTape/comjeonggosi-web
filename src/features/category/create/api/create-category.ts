import { CreateCategoryData } from "../types/create-category-data";
import axios from "axios";

export const writeCategory = async (data: CreateCategoryData) => {
  try {
    const res = await axios.post("/admin/categories", data);
    return res;
  } catch (error) {
    console.error("writeCategory error", error);
    throw error;
  }
};
