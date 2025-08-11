import { deleteArticle } from "../api/delete-article";
import { toast } from "@/shared/providers/ToastProvider";
import Router from "next/router";

export const useDeleteArticle = () => {
    const router = Router;
  const handleDelete = async (articleId: number) => {
    try {
      await deleteArticle(articleId);
      router.push("/");
      toast.success("아티클이 삭제되었습니다.");
    } catch (error) {
      console.error("Failed to delete article:", error);
      toast.error("아티클 삭제에 실패했습니다.");
    }
  };

  return { handleDelete };
};
