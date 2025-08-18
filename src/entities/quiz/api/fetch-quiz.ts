import { Quiz } from "../types/quiz";
import { apiClient } from "@/shared/libs/custom-axios";

export const fetchQuiz = async (categoryId: string) => {
  try {
    const { data } = await apiClient.get<Quiz>(`/quizzes?categoryId=${categoryId}`);
    console.log("quiz: ", data);
    return data;
  } catch {
    return null;
  }
};
