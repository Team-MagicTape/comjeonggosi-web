import { toast } from "@/shared/providers/ToastProvider";
import { useState } from "react";
import { createArticle } from "@/features/create-article/api/create-article";
import { useCustomRouter } from "@/shared/model/useCustomRouter";

export const useCreateArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const router = useCustomRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      createArticle({title, content, categoryId});
    } catch {
      toast.error("네트워크 에러");
    }
  };

  return {
    handleSignup,
    title,
    setTitle,
    content,
    setContent,
    categoryId,
    setCategoryId,
    router,
  };
};
