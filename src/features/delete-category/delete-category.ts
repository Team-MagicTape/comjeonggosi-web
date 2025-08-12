import { apiClient } from "@/shared/libs/custom-axios";

export const deleteCategory = async (categoryId: number) => {
  try {
    const res = await apiClient.delete(`/admin/categories/${categoryId}`);
    return res;
  } catch (error) {
    console.error("deleteCategory error", error);
    throw error;
  }
};