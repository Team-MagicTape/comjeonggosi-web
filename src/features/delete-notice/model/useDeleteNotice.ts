import { fetchDeleteNotice } from "../api/fetch-delete-notice";
import { toast } from "@/shared/providers/ToastProvider";

export const useDeleteNotice = () => {
  const deleteNotice = async (id: string) => {
    try {
      await fetchDeleteNotice(id);
      toast.success("공지사항이 성공적으로 삭제되었습니다.");
    } catch (error) {
      toast.error("공지사항 삭제에 실패했습니다.");
    }
  };

  return { deleteNotice };
};