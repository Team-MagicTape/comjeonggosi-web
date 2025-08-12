import { apiClient } from "@/shared/libs/custom-axios";

export const deleteCategory = async (categoryId: number) => {
  try {
    const { data } = await apiClient.delete(`/admin/categories/${categoryId}`);
    return data;
  } catch (error) {
    console.error("deleteCategory error", error);
    throw error;
  }
};
