import { Quiz } from "../types/quiz";
import { apiClient } from "@/shared/libs/custom-axios";

export const fetchQuiz = async (categoryId: string, hidden?: string) => {
  try {
    const { data } = await apiClient.get<Quiz>(`/api/quizzes?categoryId=${categoryId}${hidden ? `&hidden=${hidden}` : ""}`);
    console.log("quiz: ", data);
    return data;
  } catch {
    return null;
  }
};
