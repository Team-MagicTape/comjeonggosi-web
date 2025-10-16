import { FetchEditNotices } from "../api/fetch-edit-notices";
import { useState } from "react";
import { toast } from "@/shared/providers/ToastProvider";

export const useEditNotices = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState("");

  const handleNotices = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await FetchEditNotices(id, { title, content });
      setTitle("");
      setContent("");
      toast.success("공지사항이 수정되었습니다.");
    } catch {
      toast.error("공지사항 수정에 실패했습니다.");
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
