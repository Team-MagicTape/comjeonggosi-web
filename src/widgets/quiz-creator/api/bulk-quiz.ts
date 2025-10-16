import { apiClient } from "@/shared/libs/custom-axios"
import { QuizType } from "../type/quiz-type";
import { QuizBulkResponseType } from "../type/quiz-bulk-response";

export const bulkQuizzes = async (quizzes : QuizType[]) => {
  try {
    const { data } = await apiClient.post<QuizBulkResponseType>(`/api/admin/quizzes/bulk`, quizzes);
    return data;
  } catch {
    return null;
  }
}