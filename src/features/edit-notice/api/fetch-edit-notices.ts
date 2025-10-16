import { apiClient } from "@/shared/libs/custom-axios";
import { NoticesType } from "@/entities/notices/types/notices";

export const FetchEditNotices = async (id: string, editData: NoticesType) => {
  try {
    const { data } = await apiClient.put(`/api/notices/${id}`, editData);
    return data;
  } catch (error) {
    console.error("공지사항 수정 오류", error);
    throw error;
  }
};
