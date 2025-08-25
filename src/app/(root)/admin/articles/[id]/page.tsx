import React from "react";
import { getArticleDetail } from "@/entities/article/api/get-article-detail";
import { notFound } from "next/navigation";
import DeleteButton from "@/features/delete-article/ui/DeleteButton";
import EditButton from "@/features/edit-article/ui/EditButton";
import { PathParams } from "@/shared/types/path-params";
import ArticleSidebar from "@/entities/article/ui/ArticleSidebar";
import Markdown from "@/shared/ui/Markdown";
import { extractHeadings } from "@/shared/utils/extract-headings";

const ArticleDetail = async ({ params }: PathParams) => {
  const article = await getArticleDetail(Number(params));
  if (!article) {
    notFound();
  }
  const headings = extractHeadings(article.content);

  return (
    <div className="flex xl:flex-row gap-9 pr-[264px]">
      <ArticleSidebar headings={headings} />
      <div className="w-full bg-white border border-border rounded-2xl xl:p-8 flex flex-col gap-6">
        <span className="flex items-center justify-between w-full">
          <h1 className="font-extrabold text-3xl">{article.title}</h1>
          <div className="flex items-center gap-2">
            <DeleteButton articleId={Number(params)} />
            <EditButton articleId={Number(params)} />
          </div>
        </span>
        <hr className="border border-gray-200 w-full" />
        <div className="font-medium">
          <Markdown content={article.content} />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
