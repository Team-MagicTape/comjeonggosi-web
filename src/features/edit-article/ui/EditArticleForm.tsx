"use client";

import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import { useEditArticle } from "../model/useEditArticle";
import dynamic from "next/dynamic";
import { useEffect } from "react";

interface Props {
  articleId: number;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const EditArticleForm = ({ articleId }: Props) => {
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    title,
    setTitle,
    content,
    setContent,
    handleEdit,
    isMounted,
    setIsMounted,
  } = useEditArticle();

  return (
    <form
      onSubmit={(e) => handleEdit(e, articleId)}
      className="flex flex-col gap-4"
    >
      <Input
        value={title}
        placeholder="제목을 입력해주세요."
        onChange={(e) => setTitle(e.target.value)}
      />

      {isMounted && (
        <div data-color-mode="light">
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || "")}
            height={400}
          />
        </div>
      )}

      <Button type="submit">완료</Button>
    </form>
  );
};

export default EditArticleForm;
