import { apiClient } from "@/shared/libs/custom-axios"

export const solveQuizzes = async (quizId: string, answer: string) => {
  try {
    const { data } = await apiClient.post(`/quizzes/${quizId}/solve`, { answer });
    return data;
  } catch {
    return null;
  }
}