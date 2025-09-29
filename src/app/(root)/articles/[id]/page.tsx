import { getArticleDetail } from "@/entities/article/api/get-article-detail";
import { notFound } from "next/navigation";
import { PathParams } from "@/shared/types/path-params";
import ArticleSidebar from "@/entities/article/ui/ArticleSidebar";
import Markdown from "@/shared/ui/Markdown";
import { fetchInitialArticle } from "@/entities/article/api/fetch-initial-article";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: PathParams): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleDetail(Number(id));

  return {
    title: `${article?.title || ""} | 컴정고시`,
    description: `${article?.category.name || "자료구조"}도 역시 컴정고시!`,
    openGraph: {
      title: `${article?.title || ""} | 컴정고시`,
      description: `${article?.category.name || "자료구조"}도 역시 컴정고시!`,
      url: `https://comgo.dev/articles/${id}`,
      siteName: "컴정고시",
      images: [
        {
          url: "https://comgo.dev/assets/og.png",
          width: 1200,
          height: 630,
          alt: "컴정고시",
        },
      ],
      locale: "ko_KR",
      type: "website",
    },
  };
}

const ArticleDetail = async ({ params }: PathParams) => {
  const { id } = await params;
  const article = await getArticleDetail(Number(id));
  const articles = await fetchInitialArticle(String(article?.category.id));
  if (!article) {
    notFound();
  }

  return (
    <div className="py-4 lg:py-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <aside className="hidden lg:block lg:w-64 xl:w-80">
          <ArticleSidebar data={articles} title="관련글" />
        </aside>
        <main className="flex-1 bg-white border border-gray-100 rounded-lg p-4 lg:p-6 xl:p-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">
            {article.title}
          </h1>
          <hr className="border-gray-100 mb-6" />
          <div className="prose prose-gray max-w-none">
            <Markdown content={article.content} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArticleDetail;
