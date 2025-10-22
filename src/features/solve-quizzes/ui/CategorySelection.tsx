"use client";

import { Category } from "@/entities/category/types/category";
import { useCustomRouter } from "@/shared/model/useCustomRouter";

interface CategorySelectionProps {
  categories: Category[];
}

export const CategorySelection = ({ categories }: CategorySelectionProps) => {
  const router = useCustomRouter();

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/quizzes/${categoryId}`);
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">아직 카테고리가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all text-left group"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {category.name}
          </h3>

          {category.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {category.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {category.quizCount || 0}개 문제
            </span>
            {(category.articleCount || 0) > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {category.articleCount}개 아티클
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};
