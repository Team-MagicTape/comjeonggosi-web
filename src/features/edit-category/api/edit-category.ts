import { apiClient } from "@/shared/libs/custom-axios";
import { EditCategoryData } from "../types/edit-category-data";

export const editCategory = async (id: string, editData: EditCategoryData) => {
  try {
    const { data } = await apiClient.put(`/api/admin/categories/${id}`, editData);
    return data;
  } catch (error) {
    console.error("editCategory error", error);
    throw error;
  }
};
