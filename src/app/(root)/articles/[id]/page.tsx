import React from "react";
import { getArticleDetail } from "@/entities/article/api/get-article-detail";
import { notFound } from "next/navigation";
import DeleteButton from "@/features/delete-article/ui/DeleteButton";
import EditButton from "@/features/edit-article/ui/EditButton";
import { PathParams } from "@/shared/types/path-params";

const ArticleDetailPage = async ({ params }: PathParams) => {
  const article = await getArticleDetail(Number(params));

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-4 xl:p-8 flex flex-col gap-6 items-start">
      <span className="flex items-center justify-between w-full">
        <h1 className="font-extrabold text-3xl">{article.title}</h1>
        <div className="flex items-center gap-2">
          <DeleteButton articleId={Number(params)} />
          <EditButton articleId={Number(params)} />
        </div>
      </span>
      <hr className="border border-gray-200 w-full" />
      <p className="font-medium">{article.content}</p>
    </div>
  );
};

export default ArticleDetailPage;
