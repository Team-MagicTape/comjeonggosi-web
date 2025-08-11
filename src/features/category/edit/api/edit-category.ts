import axios from "axios";
import { EditCategoryData } from "../types/edit-category-data";

export const editCategory = async (id: string, data: EditCategoryData) => {
  try {
    const res = await axios.put(`/admin/categories/${id}`, data);
    return res;
  } catch (error) {
    console.error("editCategory error", error);
    throw error;
  }
};