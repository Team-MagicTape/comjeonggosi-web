"use client";

import { Workbook } from "../types/workbook";
import CustomLink from "@/shared/ui/CustomLink";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { ArrowLeft, FileText, BookOpen } from "lucide-react";
import { useLoadQuizzes } from "../model/useLoadQuizzes";

interface Props {
  workbook: Workbook;
}

const WorkbookDetail = ({ workbook }: Props) => {
  const {
    quizzesBySection,
    isLoadingSection,
    isInitialLoading,
    loadedSections,
    totalSections,
    loadSection,
  } = useLoadQuizzes(workbook);

  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set()
  );
  const toggleSection = async (sectionIndex: number) => {
    const newExpandedSections = new Set(expandedSections);

    if (expandedSections.has(sectionIndex)) {
      newExpandedSections.delete(sectionIndex);
    } else {
      newExpandedSections.add(sectionIndex);
      if (!isInitialLoading && !loadedSections.has(sectionIndex)) {
        await loadSection(sectionIndex);
      }
    }

    setExpandedSections(newExpandedSections);
  };

  if (!workbook) {
    return (
      <div className="w-full py-4 lg:py-6">
        <div className="mb-6">
          <CustomLink
            href="/workbooks"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            문제집 목록으로
          </CustomLink>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg p-6 lg:p-8">
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-700">
              문제집을 찾을 수 없습니다
            </p>
            <p className="text-sm text-gray-500 mt-2">
              요청하신 문제집이 존재하지 않거나 삭제되었습니다
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 lg:py-6">
      <div className="mb-6">
        <CustomLink
          href="/workbooks"
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
            <p className="text-gray-600 mb-4">{workbook.description}</p>
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
              href={`/workbooks/${workbook.id}/quizzes`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              전체 문제 풀기 시작 →
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
          <h2 className="text-lg font-semibold text-gray-900">문제 목록</h2>
        </div>

        {workbook.quizIds.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">아직 등록된 문제가 없습니다</p>
          </div>
        ) : isInitialLoading ? (
          <div className="space-y-4">
            {Array.from({ length: Math.min(3, totalSections) }).map(
              (_, index) => (
                <div key={index} className="space-y-3">
                  <div className="p-4 bg-gray-200 rounded-lg animate-pulse">
                    <div className="flex justify-between items-center">
                      <div className="h-5 bg-gray-300 rounded w-16"></div>
                      <div className="h-5 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              )
            )}
            <div className="text-center py-4">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">
                문제를 불러오고 있습니다...
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {Array.from({ length: totalSections }).map((_, sectionIndex) => {
              const sectionQuizzes = quizzesBySection[sectionIndex] || [];
              const isExpanded = expandedSections.has(sectionIndex);
              const isLoading = isLoadingSection === sectionIndex;
              const startIndex = sectionIndex * 25 + 1;
              const endIndex = Math.min(
                (sectionIndex + 1) * 25,
                workbook.quizIds.length
              );
              const sectionQuizCount = endIndex - startIndex + 1;
              const sectionQuizIds = workbook.quizIds.slice(
                sectionIndex * 25,
                (sectionIndex + 1) * 25
              );

              return (
                <div key={sectionIndex} className="space-y-3">
                  <div className="bg-[#ff8656] rounded-lg">
                    <button className="w-full flex justify-between gap-3 py-3 p-4 transition-colors text-white text-[16px] font-bold ">
                      <span className="flex items-center">
                        {sectionIndex + 1}구간
                      </span>
                      <div className="flex gap-3 items-center">
                        <CustomLink
                          href={`/workbooks/${workbook.id}/quizzes?section=${sectionIndex}`}
                          className="flex items-center gap-3 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-bold"
                        >
                          이 구간 문제 풀기
                        </CustomLink>

                        <span>{sectionQuizCount}문제</span>

                        <Icon
                          icon="ep:arrow-down-bold"
                          className={`w-5 h-5 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          onClick={() => toggleSection(sectionIndex)}
                        />
                      </div>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="space-y-3 ml-4">
                      {isLoading ? (
                        <div className="space-y-3">
                          {Array.from({ length: 3 }).map((_, index) => (
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
                      ) : (
                        sectionQuizzes.map((quiz, index) => (
                          <div
                            key={quiz.id}
                            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-medium text-primary">
                                  {sectionIndex * 25 + index + 1}
                                </span>
                              </div>
                              <div className="flex-1">
                                <p className="text-gray-900 font-medium mb-2 line-clamp-2">
                                  {quiz.content}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                  <span
                                    className={`px-2 py-0.5 rounded-md ${
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
                                  <span className="text-gray-500">
                                    {quiz?.category?.name}
                                  </span>
                                  <span className="text-gray-500">
                                    난이도 {quiz.difficulty}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkbookDetail;
