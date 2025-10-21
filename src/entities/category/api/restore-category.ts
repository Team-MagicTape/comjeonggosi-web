import { apiClient } from "@/shared/libs/custom-axios";

export const restoreCategory = async (categoryId: string) => {
  try {
    const { data } = await apiClient.post(
      `/api/admin/categories/${categoryId}/restore`
    );

    return data;
  } catch (error) {
    console.error("restoreCategory error", error);
    throw error;
  }
};
