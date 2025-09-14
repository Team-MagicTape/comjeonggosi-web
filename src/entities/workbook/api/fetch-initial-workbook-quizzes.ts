import { Quiz } from "@/entities/quiz/types/quiz";
import { fetchInitialQuizById } from "./fetch-initial-quiz-by-id";

// 워크북의 모든 퀴즈들을 개별적으로 조회
export const fetchInitialWorkbookQuizzes = async (quizIds: string[]) => {
  try {
    const quizPromises = quizIds.map((quizId) => fetchInitialQuizById(quizId));
    const quizzes = await Promise.all(quizPromises);

    // null이 아닌 퀴즈들만 필터링
    return quizzes.filter((quiz): quiz is Quiz => quiz !== null);
  } catch (e) {
    console.log(e);
    return [];
  }
};
