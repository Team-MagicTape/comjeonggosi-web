import { FetchCreateNotices } from "../api/fetch-create-notices";
import { useState } from "react";
import { toast } from "@/shared/providers/ToastProvider";

export const useCreateNotices = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleNotices = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    try {
      await FetchCreateNotices({ title, content });
      setTitle("");
      setContent("");
      toast.success("공지사항이 생성되었습니다.");
    } catch {
      toast.error("공지사항 생성에 실패했습니다.");
    }
  };

  return {
    title,
    content,
    setTitle,
    setContent,
    handleNotices,
  };
};
