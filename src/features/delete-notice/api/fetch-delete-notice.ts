import { apiClient } from "@/shared/libs/custom-axios";

export const fetchDeleteNotice = async (id: string) => {
  try {
    const { data } = await apiClient.delete(`/notices/${id}`);
    return data;
  } catch (error) {
    console.error("notice delete api", error);
    throw error;
  }
};
