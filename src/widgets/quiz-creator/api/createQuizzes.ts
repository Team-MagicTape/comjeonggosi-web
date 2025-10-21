import { apiClient } from "@/shared/libs/custom-axios";
import { QuizRequestType } from "../type/quiz-request";
import { QuizResponseType } from "../type/quiz-response";

export const createQuizzes = async (quiz: QuizRequestType) => {
  try {
    const { data } = await apiClient.post<QuizResponseType>(
      `/admin/quizzes`,
      quiz
    );
    return data;
  } catch {
    return null;
  }
};
