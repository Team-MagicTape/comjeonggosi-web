import { toast } from "@/shared/providers/ToastProvider";
import { useEffect, useState } from "react";
import { createArticle } from "@/features/create-article/api/create-article";
import { useCustomRouter } from "@/shared/model/useCustomRouter";

export const useCreateArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const router = useCustomRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      createArticle({ title, content, categoryId });
      toast.success("글이 생성되었습니다.");
      router.push("/admin/articles");
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
    isMounted
  };
};
