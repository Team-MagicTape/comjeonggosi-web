import { Quiz } from "@/entities/quiz/types/quiz";
import { useState, useMemo } from "react";
import { Workbook } from "../types/workbook";

const ITEMS_PER_PAGE = 15;

/**
 * 워크북의 퀴즈를 페이지네이션하여 표시하는 훅
 * 워크북에 이미 포함된 퀴즈 데이터를 사용합니다.
 */
export const useLoadQuizzes = (workbook: Workbook) => {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // 워크북에서 퀴즈 가져오기 (이미 GraphQL로 조회됨)
  const allQuizzes = useMemo(() => {
    return workbook?.quizzes || [];
  }, [workbook?.quizzes]);

  const totalQuizzes = workbook?.quizCount || 0;

  // 현재 표시할 퀴즈들
  const displayedQuizzes = useMemo(() => {
    return allQuizzes.slice(0, displayCount);
  }, [allQuizzes, displayCount]);

  // 더 보기
  const loadMoreQuizzes = () => {
    setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, totalQuizzes));
  };

  const hasMore = displayCount < totalQuizzes;
  const remainingCount = totalQuizzes - displayCount;

  return {
    ITEMS_PER_PAGE,
    quizzes: displayedQuizzes,
    isLoadingQuizzes: false, // 이미 로드됨
    isLoadingMore: false,
    loadedCount: displayedQuizzes.length,
    loadMoreQuizzes,
    hasMore,
    remainingCount,
  };
};
