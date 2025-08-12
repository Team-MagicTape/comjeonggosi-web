"use client";

import { toast } from "@/shared/providers/ToastProvider";
import { editArticle } from "../api/edit-article";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useEditArticle = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleEdit = async (
    e: React.FormEvent<HTMLFormElement>,
    articleId: number
  ) => {
    e.preventDefault();
    try {
      await editArticle(articleId, { title, content });
      toast.success("아티클이 수정되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("Failed to edit article:", error);
      toast.error("아티클 수정에 실패했습니다.");
    }
  };

  return { handleEdit, title, setTitle, content, setContent };
};
