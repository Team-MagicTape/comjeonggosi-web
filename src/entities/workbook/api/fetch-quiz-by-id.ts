import { Quiz } from "@/entities/quiz/types/quiz";
import { apiClient } from "@/shared/libs/custom-axios";

export const fetchQuizById = async (quizId: string) => {
  try {
    const { data } = await apiClient.get<Quiz>(`/api/quizzes/${quizId}`);
    return data;
  } catch (e) {
    return null;
  }
};
