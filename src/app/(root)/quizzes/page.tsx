import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { CategorySelection } from "@/features/solve-quizzes/ui/CategorySelection";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "퀴즈 | 컴정고시",
  description: "CS 공부는 컴정고시!",
  openGraph: {
    title: "퀴즈 | 컴정고시",
    description: "CS 공부는 컴정고시!",
    url: "https://comgo.dev/quizzes",
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

const Quizzes = async () => {
  const categories = await fetchCategories();

  if (categories.length === 0) {
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
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">퀴즈</h1>
        <p className="text-sm lg:text-base text-gray-600">
          카테고리별 퀴즈를 풀고 실력을 향상시켜보세요
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        }
      >
        <CategorySelection categories={categories} />
      </Suspense>
    </div>
  );
};

export default Quizzes;

