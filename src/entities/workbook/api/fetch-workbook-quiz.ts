import { apiClient } from "@/shared/libs/custom-axios";
import { Quiz } from "@/entities/quiz/types/quiz";

// 단일 퀴즈 조회 (클라이언트용)
export const fetchQuizById = async (quizId: string) => {
  try {
    const { data } = await apiClient.get<Quiz>(`/api/quizzes/${quizId}`);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
