import { apiClient } from "@/shared/libs/custom-axios";

export const restoreCategory = async (categoryId: number) => {
  try {
    const { data } = await apiClient.post(
      `/api/admin/articles/${categoryId}/restore`
    );

    return data;
  } catch (error) {
    console.error("restoreCategory error", error);
    throw error;
  }
};
