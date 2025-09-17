"use client";

import { Workbook } from "../types/workbook";
import CustomLink from "@/shared/ui/CustomLink";
import {
  ArrowLeft,
  FileText,
  Plus,
  BookOpen,
} from "lucide-react";
import { useLoadQuizzes } from "../model/useLoadQuizzes";

interface Props {
  workbook: Workbook;
}


const WorkbookDetail = ({ workbook }: Props) => {
  const {
    ITEMS_PER_PAGE,
    quizzes,
    isLoadingQuizzes,
    isLoadingMore,
    loadedCount,
    loadMoreQuizzes,
  } = useLoadQuizzes(workbook);
  if (!workbook) {
    return (
      <div className="w-full py-4 lg:py-6">
        <div className="mb-6">
          <CustomLink
            href="/workbook"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            문제집 목록으로
          </CustomLink>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-lg p-6 lg:p-8">
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-700">문제집을 찾을 수 없습니다</p>
            <p className="text-sm text-gray-500 mt-2">요청하신 문제집이 존재하지 않거나 삭제되었습니다</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 lg:py-6">
      <div className="mb-6">
        <CustomLink
          href="/workbook"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          문제집 목록으로
        </CustomLink>
      </div>

      <div className="bg-white border border-gray-100 rounded-lg p-6 lg:p-8 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {workbook.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {workbook.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {workbook.quizIds.length}개 문제
              </span>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          {workbook.quizIds.length > 0 ? (
            <CustomLink
              href={`/workbook/${workbook.id}/quizzes`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              문제 풀기 시작 →
            </CustomLink>
          ) : (
            <button
              disabled
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed font-medium"
            >
              문제가 없습니다
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-lg p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            문제 목록
          </h2>
        </div>

        {isLoadingQuizzes ? (
          <div className="space-y-3">
            {Array.from({ length: Math.min(3, workbook.quizIds.length) }).map((_, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg animate-pulse"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : workbook.quizIds.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">아직 등록된 문제가 없습니다</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {quizzes.map((quiz, index) => (
                <div
                  key={quiz.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium mb-2 line-clamp-2">
                        {quiz.content}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className={`px-2 py-0.5 rounded-md ${
                          quiz.type === "MULTIPLE_CHOICE"
                            ? "bg-blue-100 text-blue-700"
                            : quiz.type === "OX"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }`}>
                          {quiz.type === "MULTIPLE_CHOICE"
                            ? "객관식"
                            : quiz.type === "OX"
                            ? "OX"
                            : "단답형"}
                        </span>
                        <span className="text-gray-500">
                          {quiz.category.name}
                        </span>
                        <span className="text-gray-500">
                          난이도 {quiz.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {loadedCount < workbook.quizIds.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={loadMoreQuizzes}
                  disabled={isLoadingMore}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm ${
                    isLoadingMore
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {isLoadingMore ? (
                    <>
                      <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      로딩 중...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      더보기 ({Math.min(
                        ITEMS_PER_PAGE,
                        workbook.quizIds.length - loadedCount
                      )}개)
                    </>
                  )}
                </button>
              </div>
            )}

            {quizzes.length > 0 && (
              <div className="text-center text-xs text-gray-500 mt-4">
                {quizzes.length} / {workbook.quizIds.length} 문제 표시됨
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WorkbookDetail;
