import { Quiz } from "@/entities/quiz/types/quiz";
import { customFetch } from "@/shared/libs/custom-fetch";

// 단일 퀴즈 조회 (클라이언트용)
export const fetchQuizById = async (quizId: string) => {
  try {
    const { data } = await customFetch.get<Quiz>(`/quizzes/${quizId}`);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
