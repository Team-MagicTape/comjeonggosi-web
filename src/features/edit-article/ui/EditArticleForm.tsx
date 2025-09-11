"use client";

import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import { useEditArticle } from "../model/useEditArticle";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Article } from "@/entities/article/types/article";
import Markdown from "@/shared/ui/Markdown";

interface Props {
  articleId: number;
  article: Article;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const EditArticleForm = ({ articleId, article }: Props) => {
  const {
    title,
    setTitle,
    content,
    setContent,
    handleEdit,
    isMounted,
    setIsMounted,
  } = useEditArticle();

  useEffect(() => {
    setIsMounted(true);
    setTitle(article.title);
    setContent(article.content);
  }, [article]);

  return (
    <form
      onSubmit={(e) => handleEdit(e, articleId)}
      className="flex flex-col gap-4"
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {isMounted && (
        <div
          className="grid grid-cols-1 xl:grid-cols-2 gap-4"
          data-color-mode="light"
        >
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || "")}
            height={840}
            preview="edit"
          />

          <div className="flex flex-col gap-2">
            <div className="p-4 border border-gray-300 rounded bg-white overflow-y-auto max-h-[800px] flex-1">
              <Markdown content={content} />
            </div>
            <Button type="submit" className="w-full h-12">
              완료
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default EditArticleForm;
