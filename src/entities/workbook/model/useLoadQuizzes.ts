import { Quiz } from "@/entities/quiz/types/quiz";
import { useState, useEffect } from "react";
import { Workbook } from "../types/workbook";
import { fetchWorkbookQuizzes } from "../api/fetch-workbook-quizzes";
import { fetchQuizById } from "../api/fetch-quiz-by-id";

const ITEMS_PER_PAGE = 30;

export const useLoadQuizzes = (workbook: Workbook) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(
    workbook ? workbook.quizIds.length > 0 : false
  );

  const loadInitialQuizzes = async () => {
    if (workbook.quizIds.length === 0) return;

    setIsLoadingQuizzes(true);
    try {
      const initialQuizIds = workbook.quizIds[0];
      const initialQuizzes = await fetchQuizById(initialQuizIds);
      setQuizzes([initialQuizzes!]);
      setLoadedCount(ITEMS_PER_PAGE);
    } catch (error) {
      console.error("초기 퀴즈 로드 실패:", error);
    } finally {
      setIsLoadingQuizzes(false);
    }
  };
  // 더 많은 퀴즈 로드
  const loadMoreQuizzes = async () => {
    if (loadedCount >= workbook.quizIds.length) return;

    setIsLoadingMore(true);
    try {
      const nextQuizIds = workbook.quizIds.slice(
        loadedCount,
        loadedCount + ITEMS_PER_PAGE
      );
      const moreQuizzes = await fetchWorkbookQuizzes(nextQuizIds);
      setQuizzes((prev) => [...prev, ...moreQuizzes]);
      setLoadedCount((prev) => prev + ITEMS_PER_PAGE);
    } catch (error) {
      console.error("추가 퀴즈 로드 실패:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    loadInitialQuizzes();
  }, [workbook.quizIds]);

  return {
    ITEMS_PER_PAGE,
    quizzes,
    isLoadingQuizzes,
    isLoadingMore,
    loadedCount,
    loadMoreQuizzes,
  };
};
