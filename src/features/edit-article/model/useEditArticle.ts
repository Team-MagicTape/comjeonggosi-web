"use client";

import { toast } from "@/shared/providers/ToastProvider";
import { editArticle } from "../api/edit-article";
import { useState, useEffect } from "react";
import { useCustomRouter } from "@/shared/model/useCustomRouter";

export const useEditArticle = (article: { title: string; content: string }) => {
  const router = useCustomRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setIsMounted(true);
    setTitle(article.title);
    setContent(article.content);
  }, [article]);

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

  return {
    handleEdit,
    isMounted,
    setIsMounted,
    title,
    setTitle,
    content,
    setContent,
  };
};
