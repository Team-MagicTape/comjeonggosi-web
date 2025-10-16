import { apiClient } from "@/shared/libs/custom-axios";
import { NoticesType } from "@/entities/notices/types/notices";

export const FetchCreateNotices = async (notice: NoticesType) => {
  try {
    const { data } = await apiClient.post("/api/admin/notices", notice);
    return data;
  } catch (error) {
    console.error("공지사항 생성 오류", error);
    throw error;
  }
};
