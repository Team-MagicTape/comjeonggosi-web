import React from "react";
import { getArticleDetail } from "@/entities/article/api/get-article-detail";
import { notFound } from "next/navigation";
import DeleteButton from "@/features/article/delete/ui/DeleteButton";
import EditButton from "@/features/article/edit/ui/EditButton";

interface Props {
  params: { id: number };
}

const ArticleDetailPage = async ({ params }: Props) => {
  const article = await getArticleDetail(Number(params.id));

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-4 xl:p-8 flex flex-col gap-6 items-start">
      <span className="flex items-center justify-between w-full">
        <h1 className="font-extrabold text-3xl">{article.title}</h1>
        <div className="flex items-center gap-2">
          <DeleteButton articleId={Number(params.id)} />
          <EditButton articleId={Number(params.id)} />
        </div>
      </span>
      <hr className="border border-gray-200 w-full" />
      <p className="font-medium">{article.content}</p>
    </div>
  );
};

export default ArticleDetailPage;
