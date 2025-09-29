import { Suspense } from "react";
import ArticleList from "@/entities/article/ui/ArticleList";
import { fetchInitialArticles } from "@/entities/article/api/fetch-initial-articles";
import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "아티클 | 컴정고시",
  description: "CS 공부는 컴정고시!",
  openGraph: {
    title: "아티클 | 컴정고시",
    description: "CS 공부는 컴정고시!",
    url: "https://comgo.dev/articles",
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

interface Props {
  searchParams: {
    categoryId?: string;
  };
}

const ArticlesPage = async ({ searchParams }: Props) => {
  const categoryId = searchParams.categoryId || "1";

  const [articles, categories] = await Promise.all([
    fetchInitialArticles(),
    fetchCategories(),
  ]);

  if (!categories || categories.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-600 mb-2">
            카테고리가 없습니다
          </p>
          <p className="text-gray-500">잠시 후 다시 시도해주세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 lg:py-6">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">아티클</h1>
        <p className="text-sm lg:text-base text-gray-600">
          컴퓨터 정보처리 관련 아티클을 읽어보세요
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-600 mb-2">
              아직 작성된 아티클이 없습니다
            </p>
            <p className="text-gray-500">
              곧 새로운 아티클이 업데이트될 예정입니다
            </p>
          </div>
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-6 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          }
        >
          <ArticleList
            articles={articles}
            categories={categories}
            selectedCategoryId={parseInt(categoryId)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default ArticlesPage;