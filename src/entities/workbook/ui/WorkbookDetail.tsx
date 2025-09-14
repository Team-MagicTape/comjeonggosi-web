"use client";

import { Workbook } from "../types/workbook";
import CustomLink from "@/shared/ui/CustomLink";
import { useLoadQuizzes } from "../model/useLoadQuizzes";
import { ArrowLeftIcon, FileSpreadsheetIcon, TrophyIcon } from "lucide-react";
import { useAddQuiz } from "../model/useAddQuiz";

interface Props {
  workbook: Workbook;
}

const WorkbookDetail = ({ workbook }: Props) => {
  const { quizzes, isLoadingQuizzes } = useLoadQuizzes(workbook);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 헤더 섹션 */}
      <div className="bg-white border border-border rounded-2xl p-8 mb-8">
        <div className="flex flex-col gap-6">
          {/* 뒤로가기 버튼 */}
          <div className="flex items-center">
            <CustomLink
              href="/workbook"
              className="flex items-center text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeftIcon />
              문제집 목록으로 돌아가기
            </CustomLink>
          </div>

          {/* 문제집 정보 */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 bg-primary inline-flex items-center justify-center rounded-full px-4">
                <span className="text-white font-semibold text-sm">
                  {workbook.quizIds.length}문제
                </span>
              </div>
              <div className="h-8 bg-[#f1f3f4] inline-flex items-center justify-center rounded-full px-4">
                <span className="text-[#858586] font-semibold text-sm">
                  문제집
                </span>
              </div>
            </div>

            <h1 className="font-extrabold text-3xl xl:text-4xl text-gray-900">
              {workbook.name}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              {workbook.description}
            </p>
          </div>

          {/* 시작 버튼 */}
          <div className="flex gap-4 pt-4">
            <CustomLink
              href={`/workbook/${workbook.id}/solve`}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
            >
              <TrophyIcon />
              문제 풀기 시작
            </CustomLink>

            {/* <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              찜하기
            </button> */}
          </div>
        </div>
      </div>

      {/* 문제 목록 섹션 */}
      <div className="bg-white border border-border rounded-2xl p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                문제 목록
              </h2>
              <p className="text-gray-600">
                총 {workbook.quizIds.length}개의 문제가 있습니다
              </p>
            </div>
          </div>

        </div>

        {isLoadingQuizzes ? (
          <div className="grid gap-4">
            {Array.from({ length: workbook.quizIds.length }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        ) : workbook.quizIds.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileSpreadsheetIcon />
            </div>
            <p className="text-xl font-semibold text-gray-600 mb-2">
              아직 문제가 등록되지 않았습니다
            </p>
            <p className="text-gray-500">곧 새로운 문제가 추가될 예정입니다</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {quizzes.map((quiz, index) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                    <span className="text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          quiz.type === "MULTIPLE_CHOICE"
                            ? "bg-blue-100 text-blue-700"
                            : quiz.type === "OX"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {quiz.type === "MULTIPLE_CHOICE"
                          ? "객관식"
                          : quiz.type === "OX"
                          ? "OX"
                          : "단답형"}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">
                        {quiz.category.name}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-700 rounded-full">
                        난이도 {quiz.difficulty}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 line-clamp-2 mb-1">
                      {quiz.content}
                    </p>
                    <p className="text-sm text-gray-500">
                      ID: {quiz.id}
                      {quiz.tags.length > 0 && (
                        <span className="ml-2">
                          태그: {quiz.tags.join(", ")}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <CustomLink
                  href={`/workbook/${workbook.id}/quizzes`}
                  className="ml-4 text-primary hover:text-primary/80 font-medium text-sm transition-colors whitespace-nowrap"
                >
                  바로 풀기 →
                </CustomLink>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 학습 통계 (선택사항)
      <div className="bg-white border border-border rounded-2xl p-8 mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">학습 정보</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-primary">
              {workbook.quizIds.length}
            </p>
            <p className="text-sm text-gray-600 mt-1">총 문제 수</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600 mt-1">완료한 문제</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-600">0%</p>
            <p className="text-sm text-gray-600 mt-1">진행률</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default WorkbookDetail;
