import { apiClient } from "@/shared/libs/custom-axios";

export const deleteCategory = async (categoryId: string) => {
  try {
    const { data } = await apiClient.delete(`/api/admin/categories/${categoryId}`);
    return data;
  } catch (error) {
    console.error("deleteCategory error", error);
    throw error;
  }
};
