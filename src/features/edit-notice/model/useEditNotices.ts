import { FetchEditNotices } from "../api/fetch-edit-notices";
import { useState } from "react";
import { toast } from "@/shared/providers/ToastProvider";

export const useEditNotices = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState("");

  const handleNotices = async (onSuccess?: () => void) => {
    try {
      await FetchEditNotices(id, { title, content });
      setTitle("");
      setContent("");
      toast.success("공지사항이 수정되었습니다.");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("공지사항 수정에 실패했습니다.");
      console.error("Edit notice error:", error);
    }
  };

  return {
    setId,
    title,
    content,
    setTitle,
    setContent,
    handleNotices,
  };
};
