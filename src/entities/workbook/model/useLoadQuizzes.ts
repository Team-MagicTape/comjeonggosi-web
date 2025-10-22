import { Quiz } from "@/entities/quiz/types/quiz";
import { useState, useEffect } from "react";
import { Workbook } from "../types/workbook";
import { apiClient } from "@/shared/libs/custom-axios";

const ITEMS_PER_PAGE = 15;

export const useLoadQuizzes = (workbook: Workbook) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(
    workbook ? (workbook._count?.workbookQuizzes || 0) > 0 : false
  );
  const [currentPage, setCurrentPage] = useState(1);
  const totalQuizzes = workbook._count?.workbookQuizzes || 0;

  const loadInitialQuizzes = async () => {
    if (totalQuizzes === 0) {
      setIsLoadingQuizzes(false);
      return;
    }

    setIsLoadingQuizzes(true);
    try {
      const { data } = await apiClient.get<{ quizzes: Array<{ quiz: Quiz }> }>(
        `/api/workbooks/${workbook.id}/quizzes?page=1&limit=${ITEMS_PER_PAGE}`
      );
      const quizList = data.quizzes.map((wq) => wq.quiz);
      setQuizzes(quizList);
      setLoadedCount(quizList.length);
      setCurrentPage(1);
    } catch (error) {
      console.error("초기 퀴즈 로드 실패:", error);
    } finally {
      setIsLoadingQuizzes(false);
    }
  };

  // 더 많은 퀴즈 로드
  const loadMoreQuizzes = async () => {
    if (loadedCount >= totalQuizzes) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const { data } = await apiClient.get<{ quizzes: Array<{ quiz: Quiz }> }>(
        `/api/workbooks/${workbook.id}/quizzes?page=${nextPage}&limit=${ITEMS_PER_PAGE}`
      );
      const quizList = data.quizzes.map((wq) => wq.quiz);
      setQuizzes((prev) => [...prev, ...quizList]);
      setLoadedCount((prev) => prev + quizList.length);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("추가 퀴즈 로드 실패:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    loadInitialQuizzes();
  }, [workbook.id]);

  return {
    ITEMS_PER_PAGE,
    quizzes,
    isLoadingQuizzes,
    isLoadingMore,
    loadedCount,
    loadMoreQuizzes,
  };
};
