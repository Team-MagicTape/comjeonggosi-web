import { Quiz } from "@/entities/quiz/types/quiz";
import { useState, useEffect } from "react";
import { fetchWorkbookQuizzes } from "../api/fetch-workbook-quiz";
import { Workbook } from "../types/workbook";

export const useLoadQuizzes = (workbook: Workbook) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(
    workbook.quizIds.length > 0
  );
  useEffect(() => {
    if (workbook.quizIds.length === 0) {
      return;
    }
    const loadQuizzes = async () => {
      const quizzesData = await fetchWorkbookQuizzes(workbook.quizIds);
      setQuizzes(quizzesData);
      setIsLoadingQuizzes(false);
    };

    loadQuizzes();
  }, [workbook.quizIds]);

  return {
    quizzes,
    isLoadingQuizzes,
  };
};
