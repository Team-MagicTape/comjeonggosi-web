import { apiClient } from "@/shared/libs/custom-axios"
import { QuizRequestType } from "../type/quiz-request";
import { QuizResponseType } from "../type/quiz-response";

export const createQuizzes = async (quizzes : QuizRequestType) => {
  try {
    const { data } = await apiClient.post<QuizResponseType>(`/api/admin/quizzes`, quizzes);
    return data;
  } catch {
    return null;
  }
}