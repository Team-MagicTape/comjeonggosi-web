import { getArticleDetail } from "@/entities/article/api/get-article-detail";
import { notFound } from "next/navigation";
import { PathParams } from "@/shared/types/path-params";
import ArticleSidebar from "@/entities/article/ui/ArticleSidebar";
import Markdown from "@/shared/ui/Markdown";
import {fetchArticles} from "@/entities/article/api/fetch-articles";

const ArticleDetail = async ({ params }: PathParams) => {
  const { id } = await params;
  const article = await getArticleDetail(Number(id));
  const articles = await fetchArticles(String(id));
  if (!article || !articles) {
    notFound();
  }

  return (
    <div className="xl:gap-8 xl:flex xl:pr-[264px]">
      <div className="hidden xl:block">
        <ArticleSidebar data={articles} />
      </div>
      <div className="w-full bg-white border border-border rounded-2xl p-8 flex flex-col gap-6">
        <span className="flex items-center justify-between w-full">
          <h1 className="font-extrabold xl:text-3xl text-2xl">{article.title}</h1>
        </span>
        <hr className="border border-gray-200 w-full" />
        <div className="font-medium">
          <Markdown content={article.content} />
        </div>
      </div>
      <div className="block mt-4 xl:hidden">
        <ArticleSidebar data={articles} />
      </div>
    </div>
  );
};

export default ArticleDetail;
